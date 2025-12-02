import { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import AddTask from "./components/AddTask";
import List from "./components/List";
import UpdateTask from "./components/UpdateTask";
import SignUp from "./components/SignUp";

function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route
					path="/signup"
					element={<SignUp />}
				/>
				<Route
					path="/add-task"
					element={<AddTask />}
				/>
				<Route
					path="/update-task"
					element={<UpdateTask />}
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
