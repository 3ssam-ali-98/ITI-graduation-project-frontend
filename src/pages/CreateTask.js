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

    const [task, setTask] = useState({
        name: "",
        description: "",
        priority: "Low",
        assignedTo: "",
        deadline: "",
        businessid: businessId,
        completed: false
    });
    
    const [employees, setEmployees] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState(false);

    useEffect(() => {
        if (!businessId) {
            setErrorMsg("No user logged in. Please log in first.");
        } else {
            axios.get("http://127.0.0.1:8000/users/")
                .then(response => {
                    const employeeList = response.data.filter(user => user.user_type === "Employee" && user.business === businessId);
                    setEmployees(employeeList);
                })
                .catch(error => console.error("Error fetching employees:", error));
        }
    }, [businessId]);

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

        return isValid;
    };

    const submitTask = () => {
        if (!businessId) {
            setErrorMsg("No user logged in. Please log in first.");
            return;
        }

        axios.post("http://127.0.0.1:8000/tasks/", task)
            .then(() => {
                setSuccessMsg(true);
                setTimeout(() => {
                    history.push(`/${businessId}/tasks`);
                }, 1000);
            })
            .catch(error => {
                console.error("Error creating task:", error);
                setErrorMsg("Failed to create task. Please try again.");
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

                <Input idn="name" inlabl="Task Name" intype="text" valmsg="Looking good" invalmsg={errorMsg} blurfun={validateInput} />

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
                        {employees.length > 0 ? (
                            employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.username}
                                </option>
                            ))
                        ) : (
                            <option>No employees available</option>
                        )}
                    </select>
                </div>

                <Input idn="deadline" inlabl="Deadline" intype="date" valmsg="Looking good" invalmsg={errorMsg} blurfun={validateInput} />

                <div className="d-flex justify-content-center mt-3">
                    <Button bclr="success" title1="Create Task" clck={submitTask} />
                </div>
            </form>
        </div>
    );
}

export default CreateTask;