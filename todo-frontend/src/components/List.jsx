import React, { useEffect, useState } from "react";
import "../styles/list.css";
import { useNavigate } from "react-router-dom";

const List = () => {
	const navigate = useNavigate();
	const [taskData, setTaskData] = useState([]);
	const [selectedTasks, setSelectedTasks] = useState([]);

	useEffect(() => {
		getList();
	}, []);

	const getList = async () => {
		const response = await fetch("http://localhost:3100/tasks", {
			credentials: "include",
		});
		const data = await response.json();
		if (data.success) {
			setTaskData(data.result);
		}
	};

	const handleDeleteTask = async (id) => {
		const response = await fetch(`http://localhost:3100/delete-task/${id}`, {
			method: "DELETE",
			credentials: "include",
		});

		const result = await response.json();
		if (result.success) {
			console.log("Task deleted successfully");
			getList();
		} else {
			alert("Error in deleting task");
		}
	};

	const handleUpdateTask = async (id) => {
		console.log("id", id);
		navigate("/update-task", {
			state: {
				id: id,
			},
		});
	};

	const handleSelectAll = (e) => {
		if (e.target.checked) {
			const selectedTaskIds = taskData.map((task) => task._id);
			setSelectedTasks(selectedTaskIds);
		} else {
			setSelectedTasks([]);
		}
	};

	const handleSingleSelect = (id) => {
		if (selectedTasks.includes(id)) {
			const modifiedTasks = selectedTasks.filter((task) => task !== id);
			setSelectedTasks(modifiedTasks);
		} else {
			setSelectedTasks((prev) => [...prev, id]);
		}
	};

	const handleDeleteMultiple = async () => {
		const response = await fetch(`http://localhost:3100/delete-multiple`, {
			method: "DELETE",
			credentials: "include",
			body: JSON.stringify(selectedTasks),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const result = await response.json();
		if (result.success) {
			console.log("Tasks deleted successfully");
			setSelectedTasks([]);
			getList();
		} else {
			alert("tasks not deleted");
		}
	};

	return (
		<div className="task-container">
			<h1>To Do List</h1>
			{selectedTasks.length > 0 && (
				<div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
					<button
						onClick={handleDeleteMultiple}
						className="multiple-delete"
					>
						Delete All
					</button>
				</div>
			)}
			<ul className="task-list">
				<li className="list-header">
					<input
						type="checkbox"
						name="delete_checkboxs"
						id="delete_checkbox"
						checked={selectedTasks?.length === taskData?.length}
						onChange={handleSelectAll}
					/>
				</li>
				<li className="list-header">S.No</li>
				<li className="list-header">Title</li>
				<li className="list-header">Description</li>
				<li className="list-header">Actions</li>
				{taskData &&
					taskData.map((task, index) => (
						<React.Fragment key={index}>
							<li className="list-item">
								<input
									type="checkbox"
									name="delete_checkbox"
									id="delete_checkbox"
									checked={selectedTasks.includes(task._id)}
									onChange={() => handleSingleSelect(task._id)}
								/>
							</li>
							<li className="list-item">{index + 1}</li>
							<li className="list-item">{task.title}</li>
							<li className="list-item">{task.description}</li>
							<li className="list-item">
								<button
									onClick={() => handleDeleteTask(task._id)}
									className="delete-btn"
								>
									Delete
								</button>
								<button
									onClick={() => handleUpdateTask(task._id)}
									className="update-btn"
								>
									Update
								</button>
							</li>
						</React.Fragment>
					))}
			</ul>
		</div>
	);
};

export default List;
