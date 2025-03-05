import { useState, useEffect } from "react";
import axios from "axios";

export const TaskManagement = ({ employees }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [categories, setCategories] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleTaskSuggestion = async (e) => {
    const inputValue = e.target.value;
    setTaskTitle(inputValue);
  };

  const handleGenerateSuggestions = async () => {
    if (taskTitle.length > 0) {
      try {
        const response = await axios.post(
          "http://localhost:5500/api/task/suggest",
          { input: taskTitle }
        );

        if (response.data && response.data.suggestions) {
          
          const suggestions = Array.isArray(response.data.suggestions) 
            ? response.data.suggestions 
            : Object.values(response.data.suggestions).flat();
          
          
          const processedSuggestions = suggestions
            .filter(suggestion => 
              typeof suggestion === 'string' && 
              suggestion.trim() !== '' &&
              !suggestion.includes('Here are some suggestions') &&
              !suggestion.includes('task name') &&
              !suggestion.includes('categorized')
            )
            .slice(0, 6);
          
          setSuggestions(processedSuggestions);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setTaskDescription(suggestion);
    setSuggestions([]); 
  };


  const processSuggestions = (suggestions) => {
    const categories = {};
    let currentCategory = "General";

    suggestions.forEach((suggestion) => {
      if (typeof suggestion !== "string") return; 
      if (suggestion.startsWith("**") && suggestion.endsWith("**")) {
        
        currentCategory = suggestion.replace(/\*\*/g, "").trim();
      } else {

        if (!categories[currentCategory]) {
          categories[currentCategory] = [];
        }
        categories[currentCategory].push(suggestion);
      }
    });

    return categories;
  };

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
          placeholder="Enter Task description"
          className="border w-full p-2"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </div>

      
      {suggestions.length > 0 && (
        <div className="mb-4 p-3 border rounded">
          <h3 className="font-semibold mb-2">Suggested Descriptions:</h3>
          <ul className="list-disc pl-5">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer hover:text-indigo-600 mb-1"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="input-group mb-4">
        <label className="block mb-2">Select Employee</label>
        <select className="border w-full p-2">
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.empId} value={emp.empName}>
              {emp.empName}
            </option>
          ))}
        </select>
      </div>

      
      <div className="btn-group text-center">
        <button className="w-1/2 bg-indigo-500 text-white py-3 rounded">
          Assign Task
        </button>
        <button 
          onClick={handleGenerateSuggestions} 
          className="w-1/3 rounded bg-indigo-500 text-white py-3 ml-2"
        >
          Generate AI Task Suggestions
        </button>
      </div>
    </div>
  );
};
