const Task = require("../model/Task");
const {getTaskSuggestion}=require("../services/aiService");

//GET AUTO SUGGESSION
exports.suggestTask = async (req, res)=> {
    const {input}=req.body;
    const suggestions = await getTaskSuggestion(input);
    res.json({suggestions});
}