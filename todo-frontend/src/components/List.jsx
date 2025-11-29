import React, { useEffect, useState } from "react";
import "../styles/list.css";

const List = () => {
	const [taskData, setTaskData] = useState();

	useEffect(() => {
		getList();
	}, []);

	const getList = async () => {
		const response = await fetch("http://localhost:3100/tasks");
		const data = await response.json();
		if (data.success) {
			setTaskData(data.result);
		}
	};

	const handleDeleteTask = async (id) => {
		const response = await fetch(`http://localhost:3100/delete-task/${id}`, {
			method: "DELETE",
		});

		const result = await response.json();
		if (result.success) {
			console.log("Task deleted successfully");
			getList();
		}
	};

	return (
		<div>
			<h1>To Do List</h1>
			<ul className="task-list">
				<li className="list-header">S.No</li>
				<li className="list-header">Title</li>
				<li className="list-header">Description</li>
				<li className="list-header">Actions</li>
				{taskData &&
					taskData.map((task, index) => (
						<React.Fragment key={index}>
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
							</li>
						</React.Fragment>
					))}
			</ul>
		</div>
	);
};

export default List;
