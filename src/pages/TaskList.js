import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { useHistory } from "react-router-dom";
import Button from '../components/button';
import axios from "axios";

function TaskList() {
    const history = useHistory();
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    const userId = Number(localStorage.getItem("id")); // Ensure userId is a number
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/tasks/", {
            headers: { Authorization: `Token ${token}` }
        })
        .then(response => {
            const filteredTasks = response.data.filter(task => 
                userRole === "Business Owner" || !task.assigned_employee || Number(task.assigned_employee) === userId
            );
            setTasks(filteredTasks);
        })
        .catch(error => console.error("Error fetching tasks:", error));
    }, [token, userRole, userId]);

    const handleDeleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Task List</h2>
            <div className="row g-4">
                {tasks.map((task) => (
                    <div key={task.id} className="col-lg-4 col-md-6">
                        <TaskCard task={task} onDelete={handleDeleteTask} />
                    </div>
                ))}
            </div>
            {userRole === "Business Owner" && (
                <div className="d-flex justify-content-center mt-5">
                    <Button bclr="success" title1="Add Task" mar="15px" clck={() => history.push(`/1/create-task`)} />
                </div>
            )}
        </div>
    );
}

export default TaskList;
