import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Button from "../components/button";
import Input from "../components/inputs";

function EditTask() {
    const formRef = useRef();
    const history = useHistory();
    const { taskId } = useParams();
    const businessId = useSelector((state) => state.user.user.id);
    
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const employees = JSON.parse(localStorage.getItem("usersdata"))?.filter(user => user.type === "Employee" && user.id === businessId) || [];
    
    const [task, setTask] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState(false);

    useEffect(() => {
        const existingTask = storedTasks.find(t => t.id === parseInt(taskId) && t.businessid === businessId);
        if (existingTask) {
            setTask(existingTask);
        } else {
            setErrorMsg("Task not found.");
        }
    }, [taskId, businessId, storedTasks]);

    if (!task) {
        return <div className="text-center text-danger">{errorMsg || "Loading task..."}</div>;
    }

    const validateInput = (e) => {
        const { value, id } = e.target;
        let isValid = true;
        let message = "";

        if (id === "name" && !/^[A-Za-z0-9]+(\s+[A-Za-z0-9]+)*$/.test(value)) {
            isValid = false;
            message = "Task name must contain only letters and numbers.";
        } else if (id === "description" && value.length < 10) {
            isValid = false;
            message = "Description must be at least 10 characters long.";
        } else if (id === "deadline" && !value) {
            isValid = false;
            message = "Deadline is required.";
        }

        e.target.className = `form-control ${isValid ? "is-valid" : "is-invalid"}`;
        setErrorMsg(isValid ? "" : message);
        if (isValid) setTask({ ...task, [id]: value });
    };

    const submitTask = () => {
        const updatedTasks = storedTasks.map(t => (t.id === task.id ? task : t));
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setSuccessMsg(true);
        setTimeout(() => history.push(`/${businessId}/dashboard`), 2000);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form className="needs-validation w-50 p-4 border rounded bg-light" noValidate onSubmit={(e) => e.preventDefault()} ref={formRef}>
                <h1 className="text-center mb-4">Edit Task</h1>
                {successMsg && <div className="alert alert-success text-center">Task updated successfully! Redirecting...</div>}
                <Input idn="name" inlabl="Task Name" intype="text" valmsg="Looking good" invalmsg={errorMsg} blurfun={validateInput} value={task.name} />
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea id="description" className="form-control" rows="4" value={task.description} onChange={validateInput}></textarea>
                    {errorMsg && <div className="invalid-feedback">{errorMsg}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select id="priority" value={task.priority} onChange={(e) => setTask({ ...task, priority: e.target.value })} className="form-control">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Assigned To</label>
                    <select id="assignedTo" value={task.assignedTo} onChange={(e) => setTask({ ...task, assignedTo: e.target.value })} className="form-control">
                        <option selected>No one assigned yet</option>
                        {employees.map((employee) => (
                            <option key={employee.id} value={employee.name}>{employee.name}</option>
                        ))}
                    </select>
                </div>
                <Input idn="deadline" inlabl="Deadline" intype="date" valmsg="Looking good" invalmsg={errorMsg} blurfun={validateInput} value={task.deadline} />
                <div className="d-flex justify-content-center mt-3">
                    <Button bclr="success" title1="Update Task" clck={submitTask} />
                </div>
            </form>
        </div>
    );
}

export default EditTask;



