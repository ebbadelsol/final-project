import { createSlice } from "@reduxjs/toolkit";

import { ui } from "./ui";
import { TASK_URL, TASK_ID_URL, TASK_ID_COMPLETE_URL } from "../utils/urls";

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

export const showTasks = () => {
	return (dispatch) => {
		dispatch(ui.actions.setLoading(true));
		const options = {
			method: "GET",
		};
		fetch(TASK_URL, options)
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

const showTasksStopLoading = (time) => {
	return (dispatch) => {
		const options = {
			method: "GET",
		};
		fetch(TASK_URL, options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(todos.actions.setItems(data.response));
					dispatch(todos.actions.setError(null));
				} else {
					dispatch(todos.actions.setError(data.response));
				}
			})
			.finally(setTimeout(() => dispatch(ui.actions.setLoading(false)), time));
	};
};

export const onDeleteTask = (id) => {
	return (dispatch) => {
		const options = {
			method: "DELETE",
		};
		fetch(TASK_ID_URL(id), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(todos.actions.deleteTask(id));
					dispatch(todos.actions.setError(null));
				} else {
					dispatch(todos.actions.setItems([]));
					dispatch(todos.actions.setError(data.response));
				}
			});
	};
};

export const onToggleTask = (id, isCompleted) => {
	return (dispatch) => {
		const options = {
			method: "PATCH",
			body: JSON.stringify({ isCompleted: !isCompleted ? true : false }),
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetch(TASK_ID_COMPLETE_URL(id), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(todos.actions.toggleTask(id));
					dispatch(todos.actions.setError(null));
				} else {
					dispatch(todos.actions.setError(data.response));
				}
			});
	};
};

export const onAddTask = (input, setInput) => {
	return (dispatch) => {
		dispatch(ui.actions.setLoading(true));
		const options = {
			method: "POST",
			body: JSON.stringify({ taskName: input }),
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetch(TASK_URL, options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(todos.actions.setError(null));
				} else {
					dispatch(todos.actions.setError(data.response));
				}
			})
			.finally(() => dispatch(showTasksStopLoading(400)));
		setInput("");
	};
};
