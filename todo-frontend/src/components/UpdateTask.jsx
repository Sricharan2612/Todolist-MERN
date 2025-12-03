import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateTask = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id } = location.state;
	const [taskData, setTaskData] = useState({
		title: "",
		description: "",
	});

	useEffect(() => {
		handleGetTaskData();
	}, []);

	const handleGetTaskData = async () => {
		const response = await fetch(`http://localhost:3100/task/${id}`, {
			credentials: "include",
		});
		const result = await response.json();

		if (result.success) {
			setTaskData(result.result);
		} else {
			console.log("error in getting task data");
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setTaskData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleUpdateTask = async () => {
		const response = await fetch(`http://localhost:3100/update-task`, {
			method: "PATCH",
			credentials: "include",
			body: JSON.stringify(taskData),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const result = await response.json();

		if (result.success) {
			navigate("/");
		} else {
			alert("error in updating task");
		}
	};

	return (
		<div className="container">
			<h1>Update Task</h1>
			<div>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					placeholder="Enter task title"
					value={taskData.title}
					onChange={handleChange}
				/>
				<label htmlFor="description">Description</label>
				<textarea
					rows={10}
					name="description"
					placeholder="Enter task description"
					value={taskData.description}
					onChange={handleChange}
				></textarea>
				<button
					onClick={handleUpdateTask}
					className="add-btn"
				>
					Update Task
				</button>
			</div>
		</div>
	);
};

export default UpdateTask;
