import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
	const [userData, setUserData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setUserData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSignup = async () => {
		const response = await fetch("http://localhost:3100/signup", {
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
		}
	};

	return (
		<div className="container">
			<h1>Sign Up</h1>
			<div>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="name"
					placeholder="Enter name"
					value={userData.name}
					onChange={handleChange}
				/>
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
					onClick={handleSignup}
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
					Sign Up
				</button>
				<Link
					className="link"
					to="/login"
				>
					Login
				</Link>
			</div>
		</div>
	);
};

export default SignUp;
