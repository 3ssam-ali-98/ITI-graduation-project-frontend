import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Button from "../components/button";
import Modal from '../components/modal';


function TaskDetails() {
    const { task_id} = useParams();
    const history = useHistory();
    const [task, setTask] = useState(null);
    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("id");
    
        useEffect(() => {
                if(!id)
                    history.push('/')
            }, [id, history])

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/tasks/${task_id}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setTask(response.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 401) 
                {
                    document.getElementById("modal").click();
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("id");
                    sessionStorage.removeItem("role");
                    sessionStorage.removeItem("name");
                } 
        });
    }, [task_id, token]);

    const markAsCompleted = () => {
        axios.patch(`http://127.0.0.1:8000/tasks/${task_id}/`, { completed: true }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            setTask(response.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 401) 
                {
                    document.getElementById("modal").click();
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("id");
                    sessionStorage.removeItem("role");
                    sessionStorage.removeItem("name");
                } 
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return "No deadline";

        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true
        }).format(date);
    };

    if (!task) return <p className="text-center mt-4 fw-bold">Loading...</p>;

    return (
        <div className="container mt-5 p-4 shadow-lg rounded-4 bg-light">
            {/* Title */}
            <h2 className="fw-bold text-center text-primary">{task.name}</h2>
            <hr />
            <Modal
                id="modal"
                target="session-modal"
                hidden={true} 
                modal_title={"Session expired!"} 
                modal_message={"Your login Session has expired, please login again"} 
                modal_accept_text={"Go To Login"} 
                modal_accept={() => history.push('/login')} 
                modal_close={() => history.push('/login')} 
            />

            {/* Task Details */}
            <div className="mb-3">
                <p><strong>Description:</strong> {task.description || "No description provided"}</p>
                <p><strong>Priority:</strong> 
                    <span className={`badge ms-2 bg-${task.priority === "High" ? "danger" : task.priority === "Medium" ? "warning" : "success"}`}>
                        {task.priority}
                    </span>
                </p>
                <p><strong>Deadline:</strong> <span className="text-muted">{formatDate(task.deadline)}</span></p>
                <p><strong>Assigned To:</strong> {task.assigned_employee || "Not assigned"}</p>
                <p className={`fw-bold ${task.completed ? "text-success" : "text-danger"}`}>
                    {task.completed ? "✅ Completed" : "⏳ Pending"}
                </p>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-center gap-3">
                {!task.completed && (
                    <Button 
                        bclr="success" 
                        title1="Mark as Completed" 
                        clck={markAsCompleted} 
                    />
                )}
                <Button 
                    bclr="secondary" 
                    title1="Back to Tasks" 
                    clck={() => history.push(`/tasks`)} 
                />
            </div>
        </div>
    );
}

export default TaskDetails;
