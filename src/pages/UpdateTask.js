import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Button from "../components/button";
import Input from "../components/inputs";

function EditTask() {
    const { bussiness_id, task_id } = useParams(); 
    const history = useHistory();
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    const userTasks = storedTasks[bussiness_id] || [];

    const taskToEdit = userTasks.find(task => task.id === Number(task_id));
    const employees = JSON.parse(localStorage.getItem("usersdata"))?.filter(user => user.type === "Employee") || [];

    const [task, setTask] = useState(taskToEdit || null);

    useEffect(() => {
        if (!taskToEdit) {
            alert("Task not found!");
            history.push(`/${bussiness_id}/dashboard`);
        }
    }, [taskToEdit, history, bussiness_id]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.id]: e.target.value });
    };

    const handleUpdate = () => {
        if (!task) return;
        const updatedTasks = userTasks.map(t => (t.id === task.id ? task : t));
        const updatedStorage = { ...storedTasks, [bussiness_id]: updatedTasks };
        localStorage.setItem("tasks", JSON.stringify(updatedStorage));

        alert("Task updated successfully!");
        history.push(`/${bussiness_id}/dashboard`);
    };

    if (!task) return <h2 className="text-center">Loading task...</h2>;

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form className="w-50 p-4 border rounded bg-light">
                <h1 className="text-center mb-4">Edit Task</h1>

                <Input idn="name" inlabl="Task Name" intype="text" valmsg="Looking good" value={task.name} changefun={handleChange} />
                <Input idn="description" inlabl="Description" intype="text" valmsg="Looking good" value={task.description} changefun={handleChange} />

                <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select id="priority" value={task.priority} onChange={handleChange} className="form-control">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Assigned To</label>
                    <select id="assignedTo" value={task.assignedTo} onChange={handleChange} className="form-control">
                        {employees.length > 0 ? (
                            employees.map((employee) => (
                                <option key={employee.id} value={employee.name}>
                                    {employee.name}
                                </option>
                            ))
                        ) : (
                            <option>No employees available</option>
                        )}
                    </select>
                </div>

                <Input idn="deadline" inlabl="Deadline" intype="date" valmsg="Looking good" value={task.deadline} changefun={handleChange} />

                <div className="d-flex justify-content-center mt-3">
                    <Button bclr="success" title1="Update Task" clck={handleUpdate} />
                </div>
            </form>
        </div>
    );
}

export default EditTask;
