import React, { useState } from "react";
import Button from "../components/button";
import Modal from "../components/modal";
// import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import axios from "axios";

function TaskCard({ task, deletetaskHandler }) {
    // const user = useSelector((state) => state.user.user);
    // const businessId = user?.business?.id;
    const history = useHistory();
    // const token = sessionStorage.getItem("token");
    // const [showAlert, setShowAlert] = useState(false);
    const userRole = sessionStorage.getItem("role");
    const isOwner = userRole === "Business Owner";
    const [TaskId, setTaskId] = useState(null);

    const gettaskid = (e) => {
        setTaskId(e)
    }

    const delettask = (e) => {
        deletetaskHandler(e)
    }

    // useEffect(() => {
    //     if (window.bootstrap) {
    //         window.bootstrap.Modal.getOrCreateInstance(document.getElementById(`deleteTaskModal-${task.id}`));
    //     }
    // }, [task.id]);

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


    //     try {
    //          axios.delete(`http://127.0.0.1:8000/tasks/${e}/`, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         }).then((response) => {
    //             console.log('Product deleted:', response.data)
    //             setShowAlert(true);
    //             setTimeout(() => {
    //             setShowAlert(false);
    //         }, 1000);
    //           }) 
    //     } catch (error) {
    //         console.error("Error deleting task:", error);
    //         alert("Error deleting task. Please try again.");
    //     }
    // };

    // const handleDeleteClick = () => {
    //     const modal = new window.bootstrap.Modal(document.getElementById(`deleteTaskModal-${task.id}`));
    //     modal.show();
    // };

    return (
        <>
        {task.map((task ,index) => (
            <div key={task.id} className="col-lg-4 col-md-6">
        <div className="card shadow-lg border-0 rounded-4 p-4">
            {/* {showAlert && (
                <div className="alert alert-success text-center fw-bold" role="alert">
                    ✅ Task deleted successfully
                </div>
            )} */}

            <h4 className="card-title fw-bold text-center text-primary">{task.name}</h4>
            <hr />

            <div className="mb-2">
                <strong>Priority:</strong> 
                <span className={`badge ms-2 bg-${task.priority === "High" ? "danger" : task.priority === "Medium" ? "warning" : "success"}`}>
                    {task.priority}
                </span>
            </div>

            <div className="mb-2">
                <strong>Deadline:</strong> 
                <span className="text-muted ms-2">{formatDate(task.deadline)}</span>
            </div>

            <div className="mb-2">
                <strong>Assigned To:</strong> 
                <span className="ms-2">{task.assigned_employee || "Not assigned"}</span>
            </div>

            <div className={`fw-bold mt-2 ${task.completed ? "text-success" : "text-danger"}`}>
                {task.completed ? "✅ Completed" : "⏳ Pending"}
            </div>

            <div className="d-flex justify-content-between mt-3">
                <Button 
                    bclr="info" 
                    title1="View Details" 
                    mar="10px" 
                    clck={() => history.push(`/tasks/${task.id}`)} 
                />
                {isOwner && (
                    <>
                        <Button 
                            bclr="primary" 
                            title1="Edit Task" 
                            mar="10px" 
                            clck={() => history.push(`/edit-task/${task.id}`)} 
                        />
                        {/* <Button 
                            bclr="danger" 
                            title1="Delete Task" 
                            mar="10px" 
                            clck={handleDeleteClick} 
                        /> */}
                        <Modal 
                        modal_id={`deleteTaskModal-${TaskId}`} 
                        target="delete-modal"
                        modal_button_text="Delete Task"
                        modal_title="Confirm Deletion" 
                        modal_message={`Are you sure you want to delete this task?`} 
                        modal_reject_text="Cancel" 
                        modal_accept_text="Delete" 
                        modal_button={() => gettaskid(task.id)}
                        modal_accept={() => delettask(TaskId)} 
                        />
                    </>
                )}
            </div>

        </div>
        </div>
       
        ))}
        </>
    );
}

export default TaskCard;
