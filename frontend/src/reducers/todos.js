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

		// toggleTodo: (store, action) => {
		// 	const updatedItems = store.items.map((item) => {
		// 		if (item.id === action.payload) {
		// 			const updatedTodo = {
		// 				...item,
		// 				isComplete: !item.isComplete,
		// 			};
		// 			return updatedTodo;
		// 		} else {
		// 			return item;
		// 		}
		// 	});
		// 	store.items = updatedItems;
		// },

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
