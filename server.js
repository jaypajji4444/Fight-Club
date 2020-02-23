// swami hari
const express=require("express");
const app= express();
 const bodyParser=require('body-parser');
 const cors=require("cors")
const User=require("./models/user")
 //require("dotenv").config()
app.use(cors())
const mongoose=require("mongoose");

 const path=require("path");
 const config=require("./config/key");


// // Database
 const db=async()=>{
     await mongoose.connect(config.connectionKey,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology:true})
     console.log("Connection Success!")
  }
  db().catch(err=>console.log("err"))

// app middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


// import routes
const authRoutes = require('./routes/auth');
const questionRoutes=require("./routes/question")
const resultRoutes=require("./routes/result")

// middleware added
 app.use("/",express.static("Knight"))
 app.use("/distribution",express.static("distribution"))


app.use('/api', authRoutes);
app.use("/qapi",questionRoutes)
app.use("/resultapi",resultRoutes)



app.post("/player",(req,res)=>{
    User.findOne({_id:req.body.id})
    .then(user=>{
        console.log(req.body)
        user.isFlagged=req.body.flag
        user.dopValue=req.body.value
        user.save()
        res.status(200).json(user)
    })
   console.log("hi")
   
})

app.get("/player",async(req,res)=>{
    try{
        const users=await User.find({isFlagged:true})
    
        res.status(200).json(users)
    }
    catch(err){
        res.status(401).json(err)
    }
})
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*'); //// Website you wish to allow to connect   
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');  // methods to allowed  
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');// Request headers you wish to allow     
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });
// @@@@@@@@@@@@ API ENDPOINTS @@@@@@@@@@@@



// @@@@@@@@ server Runnig @@@@@@@@@@@@
const port=process.env.NODE_ENV || 8000
app.listen(port,()=>{
    console.log("Server Running Successfully on port:",port);
})

