import React, { useState } from "react";
import "../styles/addtask.css";

const AddTask = () => {
	const [taskData, setTaskData] = useState({
		title: "",
		description: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTaskData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleAddNewTask = async () => {
		console.log(taskData);

		const response = await fetch("http://localhost:3100/add-task", {
			method: "POST",
			body: JSON.stringify(taskData),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = response.json();
		if (result) {
			console.log("New task added");
		}
	};

	return (
		<div className="container">
			<h1>Add New Task</h1>
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
					onChange={handleChange}
				>
					{taskData.description}
				</textarea>
				<button
					onClick={handleAddNewTask}
					className="add-btn"
				>
					Add New Task
				</button>
			</div>
		</div>
	);
};

export default AddTask;
