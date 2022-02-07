import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { user } from "../reducers/user";

export const Logout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(user.actions.setLogOut());
		navigate("/login");
	};

	return <button onClick={onLogout}>Logout</button>;
};
