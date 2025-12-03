import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	useEffect(() => {
		if (localStorage.getItem("login")) {
			navigate("/");
		}
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setUserData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleLogin = async () => {
		const response = await fetch("http://localhost:3100/login", {
			method: "POST",
			body: JSON.stringify(userData),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const result = await response.json();

		if (result.success) {
			console.log(result);
			document.cookie = `token=${result.token}`;
			localStorage.setItem("login", userData.email);
			window.dispatchEvent(new Event("localStorage-change"))
			navigate("/");
		} else {
			alert("Try after sometime");
		}
	};

	return (
		<div className="container">
			<h1>Login</h1>
			<div>
				<label htmlFor="email">Email</label>
				<input
					type="text"
					name="email"
					placeholder="Enter email"
					value={userData.email}
					onChange={handleChange}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="text"
					name="password"
					placeholder="Enter password"
					value={userData.password}
					onChange={handleChange}
				/>

				<button
					onClick={handleLogin}
					className="submit"
					style={{
						width: "100%",
						padding: "15px 20px",
						backgroundColor: "blue",
						borderRadius: "6px",
						color: "#fff",
						border: "none",
						marginTop: "10px",
						cursor: "pointer",
					}}
				>
					Login
				</button>
				<Link
					className="link"
					to="/signup"
				>
					Sign Up
				</Link>
			</div>
		</div>
	);
};

export default Login;
