import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
	const accessToken = useSelector((store) => store.user.accessToken);
	const navigate = useNavigate();

	useEffect(() => {
		if (accessToken) {
			navigate("/tasks");
		}
	}, [accessToken, navigate]);

	return (
		<>
			<h1>Register page</h1>
		</>
	);
};
