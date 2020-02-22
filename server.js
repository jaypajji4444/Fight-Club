// swami hari
const express=require("express");
const app= express();
 const bodyParser=require('body-parser');
 const cors=require("cors")

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

// middleware
 app.use("/",express.static("Knight"))
 app.use("/distribution",express.static("distribution"))


app.use('/api', authRoutes);
app.use("/qapi",questionRoutes)
app.use("/resultapi",resultRoutes)
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

