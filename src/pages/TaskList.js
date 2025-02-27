import React, { useState } from "react";
import TaskCard from "../components/TaskCard";

function TaskList() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            name: "",
            description: "",
            priority: "",
            assignedTo: "",
            deadline: "",
            completed: false,
        },
    ]);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Task List</h2>
            <div className="row g-4">
                {tasks.map((task) => (
                    <div key={task.id} className="col-lg-4 col-md-6">
                        <TaskCard task={task} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
