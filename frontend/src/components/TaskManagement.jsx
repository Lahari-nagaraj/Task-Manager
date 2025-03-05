import { useState } from "react";
import axios from "axios";

export const TaskManagement = ({ employees }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleTaskSuggestion = async (e) => {
    const inputValue = e.target.value;
    setTaskTitle(inputValue);

    if (inputValue.length > 2) {
      try {
        const response = await axios.post(
          "http://localhost:5500/api/task/suggest",
          { input: inputValue }
        );

        console.log("API Response:", response.data);

        if (
          Array.isArray(response.data.suggestions) &&
          response.data.suggestions.length > 0
        ) {
          setSuggestions(response.data.suggestions);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="task-wrapper bg-white shadow-md rounded p-5 w-7/12">
      <h2 className="text-3xl text-center font-semibold mb-5">Assign Task</h2>

      {/* Task Title Input */}
      <div className="input-group mb-4 relative">
        <label className="block mb-2">Enter Task Title</label>
        <input
          type="text"
          placeholder="Enter Task Title"
          className="border w-full p-2"
          value={taskTitle}
          onChange={handleTaskSuggestion}
        />

        {/* Suggestions List */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute w-full border bg-white rounded shadow-lg z-10 mt-1">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setTaskTitle(s);
                  setShowSuggestions(false);
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Task Description Input */}
      <div className="input-group mb-4">
        <label className="block mb-2">Enter Task Description</label>
        <textarea
          placeholder="Enter Task description"
          className="border w-full p-2"
        />
      </div>

      {/* Employee Selection */}
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

      {/* Assign Task Button */}
      <div className="btn-group text-center">
        <button className="w-1/2 bg-indigo-500 text-white py-3 rounded">
          Assign Task
        </button>
      </div>
    </div>
  );
};
