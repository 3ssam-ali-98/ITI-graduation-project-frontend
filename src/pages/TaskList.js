import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
// import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from '../components/button';
import axios from "axios";
import Modal from '../components/modal';
// import Modal3 from "../components/modal3";


function TaskList() {
	// const businessId = useSelector((state) => state.user.user.id);
	const history = useHistory();
	const token = sessionStorage.getItem("token");
	const [tasks, setTasks] = useState([]);
	const id = sessionStorage.getItem("id");
	const role = sessionStorage.getItem("role");

	useEffect(() => {
		if (!id)
			history.push('/')
	}, [id, history])

	const fetchtasks = () => {
		axios.get("http://127.0.0.1:8000/tasks/", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).then(response => { setTasks(response.data); })
		.catch(error => {
			if (error.response && error.response.status === 401) {
				document.getElementById("modal").click();
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("id");
				sessionStorage.removeItem("role");
				sessionStorage.removeItem("name");
			}
		});
	}

	useEffect(() => {
		fetchtasks();
	}, []);

	const deleteTaskHandler = (e) => {

		axios.delete(`http://127.0.0.1:8000/tasks/${e}/`, {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then((response) => {
				console.log('Task deleted:', response.data);
				fetchtasks();
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					document.getElementById("modal").click();
					sessionStorage.removeItem("token");
					sessionStorage.removeItem("id");
					sessionStorage.removeItem("role");
					sessionStorage.removeItem("name");
				}
			});
	};
	return (
		<div className="container mt-4">
			<h2 className="text-center mb-4">Task List</h2>
			<div className="row g-4">
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

				<TaskCard task={tasks} deletetaskHandler={deleteTaskHandler} />

			</div>
			{role === "Business Owner" && (<div className="d-flex justify-content-center mt-5">
				<Button bclr="success" title1="Add Task" mar="15px" clck={() => history.push(`/create-task`)} />
			</div>)}
		</div>
	);
};

export default TaskList;
