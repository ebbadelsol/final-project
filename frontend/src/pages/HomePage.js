import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
	const accessToken = useSelector((store) => store.user.accessToken);
	const navigate = useNavigate();

	useEffect(() => {
		if (!accessToken) {
			navigate("/login");
		}
	}, [accessToken, navigate]);

	return (
		<>
			<h1>Home page</h1>
		</>
	);
};
