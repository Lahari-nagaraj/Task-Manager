import { useState } from "react";
import axios from "axios";


export const TaskManagement = ({employees}) => {

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [assignedEmp, setAssignedEmp] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [predictingTime,setPredictingTime] = useState(null);
  
  //Auto-complete suggession api
  const handleTaskSuggestion = async(e)=> {
    setTaskTitle(e.target.value);
    if(taskTitle.length > 3){
      try{
        const response = await axios.post("http://localhost:5500/api/task/suggest",{input: taskTitle});
        setSuggestions(response.data.suggestions.split("/n"));
        console.log("Suggestions :",suggestions);
      }catch(error){
        console.log("Error while fetching Suggestions:",error);
      }
    }
  }

  return (
    <div className="task-wrapper bg-white shadow-md rounded p-5 w-7/12">
      <h2 className="text-3xl text-center font-semibold mb-5">Assign Task</h2>

      <div className="input-group mb-4">
        <label className="block mb-2">Enter Task Title</label>
        <input
          type="text"
          placeholder="Enter Task Title"
          className="border w-full p-2"
          value={taskTitle}
          onChange={handleTaskSuggestion}
        />
      </div>

      <div className="input-group mb-4">
        <label className="block mb-2">Enter Task Description</label>
        <textarea
          type="text"
          placeholder="Enter Task description"
          className="border w-full p-2"
        />
      </div>

      <div className="input-group mb-4">
        <label className="block mb-2">Select Emp</label>
        <select className="border w-full p-2">
            <option value="">Select Employee</option>

            {
              employees.map((emp)=>(
                <option key={emp.empId} value={emp.empName}>
                  {emp.empName}
                </option>
              ))
            }

        </select>
      </div>
      <div className="btn-group text-center">
        <button className="w-1/2 bg-indigo-500 text-white py-3 rounded">
          Assign Task
        </button>
      </div>
    </div>
  );
};
