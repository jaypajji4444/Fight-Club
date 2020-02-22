const express = require('express');
const router = express.Router();

const {getQuestion,postQuestion,deleteQuestion} =require("../controllers/question")


router.get("/question",getQuestion)
router.post("/question",postQuestion)
router.delete("/question/:id",deleteQuestion)

module.exports=router