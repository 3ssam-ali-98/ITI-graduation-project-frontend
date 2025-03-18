import React from "react";
import Button from '../components/button';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

function TaskCard({ task }) {
    const businessId = useSelector((state) => state.user.user.id);
    const history = useHistory();

    const deleteTask = () => {
        axios.delete(`http://127.0.0.1:8000/tasks/${task.id}/`)
            .then(() => {
                alert("Task deleted successfully");
                window.location.reload();
            })
            .catch(() => alert("Error deleting task"));
    };

    return (
        <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body">
                <h5 className="card-title fw-bold">Task name: {task.name}</h5>
                <p className="card-text text-muted">Task description: {task.description}</p>
                <div className="d-flex justify-content-between">
                    <div>
                        <strong>Priority: </strong>
                        <span className={`badge bg-${task.priority === "High" ? "danger" : task.priority === "Medium" ? "warning" : "success"}`}>
                            {task.priority}
                        </span>
                    </div>
                    <div>
                        <strong>Deadline: </strong>
                        <span className="text-muted">{task.deadline}</span>
                    </div>
                </div>
                <p className="card-text mt-2">
                    <strong>Assigned To:</strong> {task.assignedTo}
                </p>
                <p className={`card-text fw-bold ${task.completed ? "text-success" : "text-danger"}`}>
                    {task.completed ? "✅ Completed" : "⏳ Pending"}
                </p>
                <div className="d-flex justify-content-between">
                    <Button bclr="primary" title1="Edit Task" mar="15px" clck={() => history.push(`/${businessId}/edit-task/${task.id}`)} />
                    <Button bclr="danger" title1="Delete Task" mar="15px" clck={deleteTask} />
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
