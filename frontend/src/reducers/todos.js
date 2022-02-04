import { createSlice } from "@reduxjs/toolkit";

import { ui } from "./ui";
import { API_URL } from "../utils/constants";

export const todos = createSlice({
	name: "todos",
	initialState: {
		items: [],
	},
	reducers: {
		setItems: (store, action) => {
			store.items = action.payload;
		},
		setError: (store, action) => {
			store.error = action.payload;
		},
		deleteTask: (store, action) => {
			store.items = store.items.filter((item) => item._id !== action.payload);
		},
		toggleTask: (store, action) => {
			const task = store.items.find((item) => item._id === action.payload);
			task.isCompleted = !task.isCompleted;
		},
	},
});

export const showTasks = (accessToken, userId) => {
	return (dispatch) => {
		dispatch(ui.actions.setLoading(true));
		const options = {
			method: "GET",
			headers: {
				Authorization: accessToken,
			},
		};
		fetch(API_URL(`tasks/${userId}`), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(todos.actions.setItems(data.response));
					dispatch(todos.actions.setError(null));
				} else {
					dispatch(todos.actions.setError(data.response));
				}
			})
			.finally(setTimeout(() => dispatch(ui.actions.setLoading(false)), 400));
	};
};

const showTasksStopLoading = (accessToken, userId) => {
	return (dispatch) => {
		const options = {
			method: "GET",
			headers: {
				Authorization: accessToken,
			},
		};
		fetch(API_URL(`tasks/${userId}`), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(todos.actions.setItems(data.response));
					dispatch(todos.actions.setError(null));
				} else {
					dispatch(todos.actions.setError(data.response));
				}
			})
			.finally(setTimeout(() => dispatch(ui.actions.setLoading(false)), 400));
	};
};

export const onDeleteTask = (accessToken, taskId) => {
	return (dispatch) => {
		const options = {
			method: "DELETE",
			headers: {
				Authorization: accessToken,
			},
		};
		fetch(API_URL(`tasks/${taskId}`), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(todos.actions.deleteTask(taskId));
					dispatch(todos.actions.setError(null));
				} else {
					dispatch(todos.actions.setItems([]));
					dispatch(todos.actions.setError(data.response));
				}
			});
	};
};

export const onToggleTask = (accessToken, taskId, isCompleted) => {
	return (dispatch) => {
		const options = {
			method: "PATCH",
			body: JSON.stringify({ isCompleted: !isCompleted ? true : false }),
			headers: {
				Authorization: accessToken,
				"Content-Type": "application/json",
			},
		};
		fetch(API_URL(`tasks/${taskId}/isCompleted`), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(todos.actions.toggleTask(taskId));
					dispatch(todos.actions.setError(null));
				} else {
					dispatch(todos.actions.setError(data.response));
				}
			});
	};
};

export const onAddTask = (
	accessToken,
	taskInput,
	/*setTaskInput,*/ deadline,
	categoryInput,
	userId
) => {
	return (dispatch) => {
		dispatch(ui.actions.setLoading(true));
		const options = {
			method: "POST",
			body: JSON.stringify({
				taskName: taskInput,
				deadline: deadline,
				categoryId: categoryInput,
				userId: userId,
			}),
			headers: {
				Authorization: accessToken,
				"Content-Type": "application/json",
			},
		};
		fetch(API_URL("tasks"), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(todos.actions.setError(null));
				} else {
					dispatch(todos.actions.setError(data.response));
				}
			})
			.finally(() => dispatch(showTasksStopLoading(accessToken, userId)));
		// setTaskInput("");
	};
};
