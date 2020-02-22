const Question=require("../models/question")

exports.getQuestion=async(req,res)=>{
    try{
        const data=await Question.find({})
       
        res.json(data)
    }
    catch(err){
        console.log(err)
        res.json(err)
    }
}


exports.postQuestion=async(req,res)=>{
    try{
        const newQuestions=await Question.create(req.body)
        const data=await newQuestions.save()
        res.json(data)
    }
    catch(err){
        console.log(err)
        res.json(err)
    }
}

exports.deleteQuestion=async(req,res)=>{
    try{
        const id=req.params.id
        const data=await Question.deleteMany({_id:id})
        res.json({success:true,msg:"deleted successfull"})
    }
    catch(err){
        res.json({sucsess:false,msg:err})
    }
}

