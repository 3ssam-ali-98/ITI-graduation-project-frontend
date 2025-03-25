import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "../components/button";
import Input from "../components/inputs";

function CreateTask() {
    const formRef = useRef();
    const history = useHistory();
    const businessId = useSelector((state) => state.user.user.id);
    const token = localStorage.getItem("token");

    const [task, setTask] = useState({
        name: "",
        description: "",
        priority: "Medium",
        assignedTo: "",
        deadline: "",
        completed: false
    });

    const [employees, setEmployees] = useState([]);
    const [errorMsgs, setErrorMsgs] = useState({});
    const [successMsg, setSuccessMsg] = useState(false);

    // Fetch employees
    useEffect(() => {
        if (!businessId) {
            setErrorMsgs((prev) => ({ ...prev, general: "No user logged in. Please log in first." }));
        } else {
            axios.get("http://127.0.0.1:8000/employees/", {
                headers: { Authorization: `Token ${token}` }
            })
                .then(response => {
                    setEmployees(response.data);
                })
                .catch(error => {
                    console.error("Error fetching employees:", error);
                    setErrorMsgs((prev) => ({ ...prev, general: "Failed to load employees." }));
                });
        }
    }, [businessId, token]);

    // Validate input fields
    const validateInput = (e) => {
        const { value, id } = e.target;
        let message = "";

        if (id === "name" && !/^[A-Za-z0-9]+(\s+[A-Za-z0-9]+)*$/.test(value)) {
            message = "Task name must contain only letters and numbers.";
        } else if (id === "description" && value.length < 10) {
            message = "Description must be at least 10 characters long.";
        } else if (id === "deadline" && !value) {
            message = "Deadline is required.";
        }

        setErrorMsgs((prev) => ({ ...prev, [id]: message }));

        e.target.className = `form-control ${message ? "is-invalid" : "is-valid"}`;

        if (!message) {
            setTask((prevTask) => ({ ...prevTask, [id]: value }));
        }
    };

    // Handle task submission
    const submitTask = () => {
        if (!businessId) {
            setErrorMsgs((prev) => ({ ...prev, general: "No user logged in. Please log in first." }));
            return;
        }

        // Convert deadline to ISO format for Django DateTimeField
        const formattedDeadline = task.deadline ? new Date(task.deadline).toISOString() : null;
        const newTask = { ...task, deadline: formattedDeadline, business: businessId };

        axios.post("http://127.0.0.1:8000/tasks/", newTask, {
            headers: { Authorization: `Token ${token}` }
        })
            .then(() => {
                setSuccessMsg(true);
                setTimeout(() => {
                    history.push(`/${businessId}/tasks`);
                }, 1000);
            })
            .catch(error => {
                console.error("Error creating task:", error);
                setErrorMsgs((prev) => ({ ...prev, general: "Failed to create task. Please try again." }));
            });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form className="needs-validation w-50 p-4 border rounded bg-light" noValidate onSubmit={(e) => e.preventDefault()} ref={formRef}>
                <h1 className="text-center mb-4">Create Task</h1>

                {successMsg && (
                    <div className="alert alert-success text-center" role="alert">
                        Task created successfully! Redirecting...
                    </div>
                )}

                <Input 
                    idn="name" 
                    inlabl="Task Name" 
                    intype="text" 
                    valmsg="Looking good" 
                    invalmsg={errorMsgs.name} 
                    blurfun={validateInput} 
                />

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        id="description"
                        className="form-control"
                        rows="4"
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                        onBlur={validateInput}
                    ></textarea>
                    {errorMsgs.description && <div className="invalid-feedback">{errorMsgs.description}</div>}
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
                        <option value="">No one assigned yet</option>
                        {employees.length > 0 ? (
                            employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.username}
                                </option>
                            ))
                        ) : (
                            <option disabled>No employees available</option>
                        )}
                    </select>
                </div>

                {/* Deadline input updated to datetime-local */}
                <Input 
                    idn="deadline" 
                    inlabl="Deadline" 
                    intype="datetime-local" 
                    valmsg="Looking good" 
                    invalmsg={errorMsgs.deadline} 
                    blurfun={validateInput} 
                />

                <div className="d-flex justify-content-center mt-3">
                    <Button bclr="success" title1="Create Task" clck={submitTask} />
                </div>
            </form>
        </div>
    );
}

export default CreateTask;
