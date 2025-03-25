import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Button from "../components/button";

function TaskDetails() {
    const { task_id, bussiness_id } = useParams();
    const history = useHistory();
    const [task, setTask] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/tasks/${task_id}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(response => {
            setTask(response.data);
        })
        .catch(error => {
            console.error("Error fetching task details:", error);
        });
    }, [task_id, token]);

    const markAsCompleted = () => {
        axios.patch(`http://127.0.0.1:8000/tasks/${task_id}/`, { completed: true }, {
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            setTask(response.data);
        })
        .catch(error => {
            console.error("Error updating task status:", error);
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
                    clck={() => history.push(`/${bussiness_id}/tasks`)} 
                />
            </div>
        </div>
    );
}

export default TaskDetails;
