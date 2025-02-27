import React, { use, useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from '../components/button';



function TaskList() {

    const businessId = useSelector((state) => state.user.user.id);
    const history = useHistory();
    const userTasks = JSON.parse(localStorage.getItem("tasks"))?.filter(task => task.businessid === businessId) || [];



    // const [tasks, setTasks] = useState([
    //     {
    //         id: 1,
    //         name: "",
    //         description: "",
    //         priority: "",
    //         assignedTo: "",
    //         deadline: "",
    //         completed: false,
    //     },
    // ]);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Task List</h2>
            <div className="row g-4">
                {userTasks.map((task) => (
                    <div key={task.id} className="col-lg-4 col-md-6">
                        <TaskCard task={task} />
                    </div>
                ))}
                {/* <Button bclr="success" title1="Add Task" mar="15px" clck={()=>history.push(`/${businessId}/create-task`)} /> */}
            </div>
            <div className="d-flex justify-content-center mt-5">
                <Button bclr="success" title1="Add Task" mar="15px" clck={()=>history.push(`/${businessId}/create-task`)} />
            </div>
        </div>
    );
};

export default TaskList;
