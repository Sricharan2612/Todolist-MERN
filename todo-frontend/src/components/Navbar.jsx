import React, { use, useEffect, useState } from "react";
import "../styles/navbar.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();
	const [isloggedIn, setIsLoggedIn] = useState(localStorage.getItem("login"));

	useEffect(() => {
		const handleStorage = () => {
			setIsLoggedIn(localStorage.getItem("login"));
		};

		window.addEventListener("localStorage-change", handleStorage);

		return () => {
			window.removeEventListener("localStorage-change", handleStorage);
		};
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("login");
		setIsLoggedIn(null);

		setTimeout(() => {
			navigate("/login");
		}, 0);
	};

	return (
		<nav className="navbar">
			<span className="nav-logo">To Do</span>
			{isloggedIn && (
				<ul className="nav-links">
					<li className="nav-link">
						<Link to="/">List</Link>
					</li>
					<li className="nav-link">
						<Link to="/add-task">Add Task</Link>
					</li>
					<li className="nav-link">
						<Link onClick={handleLogout}>Logout</Link>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Navbar;
