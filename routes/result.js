const express = require('express');
const router = express.Router();
const {resultString,fieldSuggested,getResultString}=require("../controllers/result")

router.post("/result",resultString)
router.post("/fields",fieldSuggested)


router.get("/result/:id",getResultString)

//router.get("/fields/:id",getFieldSuggested)


module.exports=router