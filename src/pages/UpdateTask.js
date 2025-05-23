import React, { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Button from "../components/button";
import Input from "../components/inputs";
import axios from "axios";
import Modal from '../components/modal';


function EditTask() {
    const formRef = useRef();
    const history = useHistory();
    const { task_id } = useParams();
    // const businessId = useSelector((state) => state.user.user.id);
    const token = sessionStorage.getItem("token");

    const [task, setTask] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [errorMsg2, setErrorMsg2] = useState("");
    const [successMsg, setSuccessMsg] = useState(false);
    const id = sessionStorage.getItem("id");
    
        useEffect(() => {
                if(!id)
                    history.push('/')
            }, [id, history])

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/tasks/${task_id}/`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                const fetchedTask = response.data;
                setTask({
                    ...fetchedTask,
                    deadline: fetchedTask.deadline ? fetchedTask.deadline.slice(0, 16) : "" // Format for datetime-local input
                });
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) 
					{
						document.getElementById("modal").click();
						sessionStorage.removeItem("token");
						sessionStorage.removeItem("id");
						sessionStorage.removeItem("role");
						sessionStorage.removeItem("name");
					}setErrorMsg("Error fetching task.")});
    }, [task_id, token]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/employees/", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => setEmployees(response.data))
            .catch((error) => {
                if (error.response && error.response.status === 401) 
					{
						document.getElementById("modal").click();
						sessionStorage.removeItem("token");
						sessionStorage.removeItem("id");
						sessionStorage.removeItem("role");
						sessionStorage.removeItem("name");
					}setErrorMsg("Error fetching employees.")});
    },);

    if (!task) {
        return <div className="text-center text-danger">{errorMsg || "Loading task..."}</div>;
    }

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

        setErrorMsg(message);
        e.target.className = `form-control ${message ? "is-invalid" : "is-valid"}`;

        if (!message) {
            setTask({ ...task, [id]: value });
        }
    };

    const submitTask = () => {
        const updatedTask = { 
            ...task, 
            deadline: task.deadline ? new Date(task.deadline).toISOString() : null // Convert to ISO format
        };

        axios.put(`http://127.0.0.1:8000/tasks/${task_id}/`, updatedTask, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setSuccessMsg(true);
                setErrorMsg2('');
                setTimeout(() => history.push(`/tasks`), 1000);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) 
					{
						document.getElementById("modal").click();
						sessionStorage.removeItem("token");
						sessionStorage.removeItem("id");
						sessionStorage.removeItem("role");
						sessionStorage.removeItem("name");
					} 
					else if (error.response?.data)
					{
						const errors = error.response.data;
						let errorMessages = ["Client creation failed due to the following:"];
				
	
						Object.keys(errors).forEach((key) => {
							errorMessages.push(`- ${key}: ${errors[key].join(", ")}`);
						});
				
						setErrorMsg2(errorMessages.join("\n"));
					}
            });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form className="needs-validation w-50 p-4 border rounded bg-light" noValidate onSubmit={(e) => e.preventDefault()} ref={formRef}>
                <h1 className="text-center mb-4">Edit Task</h1>

                {successMsg && (
                    <div className="alert alert-success text-center">Task updated successfully! Redirecting...</div>
                )}
                {errorMsg2 && (
                <div className="alert alert-danger text-center" role="alert">
                    {errorMsg2.split("\n").map((line, index) => (
                        <div key={index}>{line}</div>
                    ))}
                </div>
                )}
                <Modal
                    id="modal"
                    hidden={true} 
                    target="session-modal"
                    modal_title={"Session expired!"} 
                    modal_message={"Your login Session has expired, please login again"} 
                    modal_accept_text={"Go To Login"} 
                    modal_accept={() => history.push('/login')} 
                    modal_close={() => history.push('/login')} 
                />

                <Input 
                    idn="name" 
                    inlabl="Task Name" 
                    intype="text" 
                    valmsg="Looking good" 
                    invalmsg={errorMsg} 
                    chgfun={validateInput} 
                    initval={task.name} 
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
                    <select id="assignedTo" value={task.assigned_to} onChange={(e) => setTask({ ...task, assigned_to: e.target.value })} className="form-control">
                        <option value="">No one assigned yet</option>
                        {employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                                {employee.first_name} {employee.last_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Updated deadline input */}
                <Input 
                    idn="deadline" 
                    inlabl="Deadline" 
                    intype="datetime-local" 
                    valmsg="Looking good" 
                    invalmsg={errorMsg} 
                    chgfun={validateInput} 
                    initval={task.deadline} 
                />

                <div className="d-flex justify-content-center mt-3">
                    <Button bclr="success" title1="Update Task" clck={submitTask} />
                </div>
            </form>
        </div>
    );
}

export default EditTask;
