import React, { use, useEffect, useState } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [isloggeedIn, setIsLoggedIn] = useState("");
	
	useEffect(() => {
		const user = localStorage.getItem("login");
		if (user) {
			setIsLoggedIn(user);
		}
	}, []);

	return (
		<nav className="navbar">
			<span className="nav-logo">To Do</span>
			{isloggeedIn && (
				<ul className="nav-links">
					<li className="nav-link">
						<Link to="/">List</Link>
					</li>
					<li className="nav-link">
						<Link to="/add-task">Add Task</Link>
					</li>
					<li className="nav-link">
						<Link to="/add-task">Logout</Link>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Navbar;
