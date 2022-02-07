import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { onLoginOrRegister } from "../reducers/user";

export const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [mode, setMode] = useState("signup");
	const accessToken = useSelector((store) => store.user.accessToken);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (accessToken) {
			navigate("/tasks");
		}
	}, [accessToken, navigate]);

	const onFormSubmit = (event) => {
		event.preventDefault();
		dispatch(onLoginOrRegister(username, password, mode, batch));
	};

	return (
		<>
			<div>
				<Link to="/">To '/' !</Link>
			</div>
			<label htmlFor="signup">Signup</label>
			<input
				id="signup"
				type="radio"
				checked={mode === "signup"}
				onChange={() => setMode("signup")}
			/>
			<label htmlFor="signin">Signin</label>
			<input
				id="signin"
				type="radio"
				checked={mode === "signin"}
				onChange={() => setMode("signin")}
			/>
			<form onSubmit={onFormSubmit}>
				<label htmlFor="username">Username</label>
				<input
					id="username"
					type="text"
					value={username}
					onChange={(event) => setUsername(event.target.value)}
				/>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
		</>
	);
};
