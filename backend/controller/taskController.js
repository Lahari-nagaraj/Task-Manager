const Task = require("../model/Task");
const {getTaskSuggession}=require("../services/aiService");

//GET AUTO SUGGESSION
exports.suggestTask = async (req, res)=> {
    const {input}=req.body;
    const suggesions = await getTaskSuggession(input);
    res.json({suggesions});
}