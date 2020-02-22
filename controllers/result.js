const User=require("../models/user")

exports.resultString=async(req,res)=>{
  
    try{
        const {id,result}=req.body
    const user=await User.findOne({_id:id})
    user.result.push(result)
    user.save()
    res.status(200).json({success:true,data:user})
    }
    catch(err){
        res.status(401).json({success:false,msg:err})
    }
    
}


exports.fieldSuggested=async(req,res)=>{

    try{
    const {id,fields}=req.body
    const user=await User.findOne({_id:id})
    user.fieldSuggested.push(fields)
    user.save()
    res.status(200).json({success:true,data:user})
    }
    catch(err){
        res.status(401).json({success:false,msg:err})
    }
    
}





exports.getResultString=async(req,res)=>{
    try{
        console.log("gdfgdojns")
        const email=req.params.email
        const user=await User.find({email:email})
        const resultString=user.result[user.result.length-1]
        res.json(resultString)
    }
    catch(err){
        res.status(401).json({success:false,msg:err})
    }
}


