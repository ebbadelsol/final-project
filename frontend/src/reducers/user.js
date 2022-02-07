import { createSlice } from "@reduxjs/toolkit";

import { API_URL } from "../utils/constants";
import { ui } from "./ui";

export const user = createSlice({
	name: "user",
	initialState: {
		userId: null,
		username: null,
		accessToken: null,
		error: null,
	},
	reducers: {
		setUserId: (store, action) => {
			store.userId = action.payload;
		},
		setUsername: (store, action) => {
			store.username = action.payload;
		},
		setAccessToken: (store, action) => {
			store.accessToken = action.payload;
		},
		setError: (store, action) => {
			store.error = action.payload;
		},
		setLogOut: (store) => {
			store.userId = null;
			store.username = null;
			store.accessToken = null;
		},
	},
});

export const onLoginOrRegister = (username, password, mode, batch) => {
	// batch might be unnecessary
	return (dispatch) => {
		dispatch(ui.actions.setLoading(true));

		const options = {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: {
				"Content-Type": "application/json",
			},
		};

		fetch(API_URL(mode), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					batch(() => {
						dispatch(user.actions.setUserId(data.response.userId));
						dispatch(user.actions.setUsername(data.response.username));
						dispatch(user.actions.setAccessToken(data.response.accessToken));
						dispatch(user.actions.setError(null));
					});
				} else {
					batch(() => {
						dispatch(user.actions.setUserId(null));
						dispatch(user.actions.setUsername(null));
						dispatch(user.actions.setAccessToken(null));
						dispatch(user.actions.setError(data.response));
					});
				}
			})
			.finally(setTimeout(() => dispatch(ui.actions.setLoading(false)), 400));
	};
};
