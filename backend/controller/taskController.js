const Task = require("../model/Task");
const {getTaskSuggestion, getTaskPrediction}=require("../services/aiService");

//GET AUTO SUGGESSION
exports.suggestTask = async (req, res)=> {
    const {input}=req.body;
    const suggestions = await getTaskSuggestion(input);
    res.json({suggestions});
}

exports.createTask = async(res,res) => {
    const {taskTitle,taskDesc, empName} = req.body;
    const estimatedTime = await getTaskPrediction(desc);
    const task = new Task({taskTitle,taskDesc, empName, estimatedTime});
    await task.save();
    res.json(task);
}

exports.getAllTask = async(req,res)=>{
    try{
        const tasks = await Task.find();
        res.json(tasks);
    } catch(error){
        res.status(500).json({error : "Internal Server Error"})
    }
}