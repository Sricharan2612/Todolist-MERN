import { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route
					path="/add-task"
					element={<AddTask />}
				/>
				<Route
					path="/add-task"
					element={<TaskList />}
				/>
			</Routes>
		</div>
	);
}

export default App;
