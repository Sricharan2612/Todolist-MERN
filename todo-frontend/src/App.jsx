import { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import AddTask from "./components/AddTask";
import List from "./components/List";

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
					path="/"
					element={<List />}
				/>
			</Routes>
		</div>
	);
}

export default App;
