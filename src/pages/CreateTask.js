import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "../components/button";
import Input from "../components/inputs";

function CreateTask() {
    const formRef = useRef();
    const history = useHistory();
    const businessId = useSelector((state) => state.user.user.id);

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const userTasks = JSON.parse(localStorage.getItem("tasks"))?.filter(task => task.businessid === businessId) || [];
    const employees = JSON.parse(localStorage.getItem("usersdata"))?.filter(user => user.type === "Employee" && user.id === businessId) || [];

    const [task, setTask] = useState({
        id: userTasks.length + 1,
        name: "",
        description: "",
        priority: "Low",
        assignedTo: employees.length > 0 ? employees[0].name : "",
        deadline: "",
        businessid: businessId,
        completed: false
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState(false);

    useEffect(() => {
        if (!businessId) {
            setErrorMsg("No user logged in. Please log in first.");
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

        const formElements = formRef.current.elements;
        let hasError = false;

        for (let element of formElements) {
            if (element.tagName === "INPUT" || element.tagName === "SELECT" || element.tagName === "TEXTAREA") {
                const isValid = validateInput({ target: element });
                if (!isValid) {
                    hasError = true;
                }
            }
        }

        if (!hasError) {
            const updatedTasks = [...storedTasks, task];
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            setSuccessMsg(true);

            setTimeout(() => {
                history.push(`/${businessId}/tasks`);
            }, 1000);
        } else {
            setSuccessMsg(false);
        }
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
                                <option key={employee.id} value={employee.name}>
                                    {employee.name}
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
