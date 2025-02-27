import React from "react";

function TaskCard({ task }) {
    return (
        <div className="card shadow-sm border-0 rounded-3">
            <button className="btn btn-sm btn-success">Add Task</button>
            <div className="card-body">
                <h5 className="card-title fw-bold">{task.name}</h5>
                <p className="card-text text-muted">{task.description}</p>

                <div className="d-flex justify-content-between">
                    <span className={`badge bg-${task.priority === "High" ? "danger" : task.priority === "Medium" ? "warning" : "success"}`}>
                        {task.priority}
                    </span>
                    <span className="text-muted">{task.deadline}</span>
                </div>

                <p className="card-text mt-2">
                    <strong>Assigned To:</strong> {task.assignedTo}
                </p>

                <p className={`card-text fw-bold ${task.completed ? "text-success" : "text-danger"}`}>
                    {task.completed ? "✅ Completed" : "⏳ Pending"}
                </p>

                <div className="d-flex justify-content-between">
                    <button className="btn btn-sm btn-primary">Update</button>
                    <button className="btn btn-sm btn-danger">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
