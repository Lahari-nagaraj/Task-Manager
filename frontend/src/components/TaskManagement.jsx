export const TaskManagement = () => {
  return (
    <div className="task-wrapper bg-white shadow-md rounded p-5 w-7/12">
      <h2 className="text-3xl text-center font-semibold mb-5">Assign Task</h2>

      <div className="input-group mb-4">
        <label className="block mb-2">Enter Task Title</label>
        <input
          type="text"
          placeholder="Enter Task Title"
          className="border w-full p-2"
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
