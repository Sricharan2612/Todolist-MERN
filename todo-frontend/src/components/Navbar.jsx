import React from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="navbar">
			<span className="nav-logo">To Do</span>
			<ul className="nav-links">
				<li className="nav-link">
					<Link to="/">List</Link>
				</li>
				<li className="nav-link">
					<Link to="/add-task">Add Task</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
