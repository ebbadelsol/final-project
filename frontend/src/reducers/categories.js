import { createSlice } from "@reduxjs/toolkit";

import { ui } from "./ui";
import { CATEGORY_URL } from "../utils/urls";

export const categories = createSlice({
	name: "categories",
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

export const showCategories = () => {
	return (dispatch) => {
		dispatch(ui.actions.setLoading(true));
		const options = {
			method: "GET",
		};
		fetch(CATEGORY_URL, options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(categories.actions.setItems(data.response));
					dispatch(categories.actions.setError(null));
				} else {
					dispatch(categories.actions.setError(data.response));
				}
			})
			.finally(setTimeout(() => dispatch(ui.actions.setLoading(false)), 400));
	};
};
