import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setUserData((prev) => ({
			[name]: value,
		}));
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
