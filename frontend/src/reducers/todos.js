import { createSlice } from "@reduxjs/toolkit";
// import uniqid from "uniqid";

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

		// completeAllTodos: (store) => {
		// 	const completeAll = store.items.map((item) => {
		// 		return {
		// 			...item,
		// 			isComplete: true,
		// 		};
		// 	});
		// 	store.items = completeAll;
		// },
	},
});
