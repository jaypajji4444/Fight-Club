const mongoose=require("mongoose")
const Schema=mongoose.Schema
const QustionSchema=new Schema({
    questionType:{
        type:String,
        required:true
    },
    questions:[String]
        
    
})

module.exports=mongoose.model("questions",QustionSchema)