import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
// import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from '../components/button';
import axios from "axios";

function TaskList() {
    // const businessId = useSelector((state) => state.user.user.id);
    const history = useHistory();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/tasks/")
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => console.error("Error fetching tasks:", error));
    }, []);

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
            <div className="d-flex justify-content-center mt-5">
                <Button bclr="success" title1="Add Task" mar="15px" clck={() => history.push(`/1/create-task`)} />
            </div>
        </div>
    );
};

export default TaskList;
