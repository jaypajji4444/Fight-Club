const User = require("../models/user");
const jwt = require("jsonwebtoken")





exports.signup = (req, res) => {
    console.log("hi")
    const { name, email, password, education, age } = req.body
    console.log(req.body)
   
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user) {
                return res.json({ msg: "Email already taken" })
            }
            else {
                const newUser = new User({ name, email, password, education, age })
                newUser.save()
                    .then(user => {
                        res.json({ success: true, msg: "SignUP Successfull", data: user })
                    })
                    .catch(err => {
                        res.json({ success: false, msg: "Fali to register new user", error: err })
                    })
            }
        })



};


// exports.signup = (req, res) => {
//     const {name,email,password}=req.body
//     User.find({email})
//     .exec()
//     .then(user=>{
//         if(user){
//             return res.status(401).json({msg:"Email already taken"})
//         }   
//     })
//     .catch(err=>{
//         console.log(err)
//     })


//     const token=jwt.sign({name,email,password},process.env.JWT_SECRET_KEY,{expiresIn:"10m"})

//     const emailData={
//         from:process.env.FROM_EMAIL,
//         to:email,
//         subject: `Account activation link`,
//             html: `
//                 <h1>Please use the following link to activate your account</h1>
//                 <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
//                 <hr />
//                 <p>This email may contain sensetive information</p>
//                 <p>${process.env.CLIENT_URL}</p>
//             `
//         };

//         sgEmail.send(emailData)
//         .then(sent=>{

//             return res.json(`Email sent successfully to ${email}.Follow the instructions to verify your account`)
//         })
//         .catch(err=>{

//             return res.json({success:false,msg:err})
//         })
// }


exports.signin = (req, res) => {
    const { email, password } = req.body;
    // check if user exist
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }
        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match'
            });
        }
        // generate a token and send to client
        const token = jwt.sign({ _id: user._id }, "mysecret", { expiresIn: '7d' });
        const { _id, name, email, role } = user;

        return res.json({
            token,
            user: { _id, name, email, role },
            msg: "Login Successful"
        });
    });

}