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
			.finally(setTimeout(() => dispatch(ui.actions.setLoading(false)), 2000));
	};
};

export const onDeleteTask = (id) => {
	return (dispatch) => {
		dispatch(ui.actions.setLoading(true));
		const options = {
			method: "DELETE",
		};
		fetch(TASK_ID_URL(id), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(todos.actions.setItems(data.response));
					dispatch(todos.actions.setError(null));
				} else {
					dispatch(todos.actions.setItems([]));
					dispatch(todos.actions.setError(data.response));
				}
			})
			.finally(setTimeout(() => dispatch(ui.actions.setLoading(false)), 2000));
	};
};

export const onToggleTask = (id, isCompleted) => {
	return (dispatch) => {
		dispatch(ui.actions.setLoading(true));
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
					dispatch(todos.actions.setItems(data.response));
					dispatch(todos.actions.setError(null));
				} else {
					dispatch(todos.actions.setError(data.response));
				}
			})
			.finally(setTimeout(() => dispatch(ui.actions.setLoading(false)), 2000));
	};
};

// A thunk is a function which returns another function.

// In that innerfunction, redux will pass it the dispatch. This will allow us to dispatch more actions to our state.

// It also passes another function called getState which we can use to get the current state of our redux store if we need to.
