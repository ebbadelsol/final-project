import React from "react";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import {
	combineReducers,
	/*configureStore,*/ createStore,
	compose,
	applyMiddleware,
} from "@reduxjs/toolkit";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { todos } from "./reducers/todos";
import { ui } from "./reducers/ui";
import { categories } from "./reducers/categories";

import { Account } from "./pages/Account";
import { Calendar } from "./pages/Calendar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Tasks } from "./pages/Tasks";
import { NotFound } from "./pages/NotFound";

const reducer = combineReducers({
	todos: todos.reducer,
	ui: ui.reducer,
	categories: categories.reducer,
});

// const store = configureStore({ reducer });

const persistedStateJSON = localStorage.getItem("todos");
const persistedState = persistedStateJSON ? JSON.parse(persistedStateJSON) : {};

const composedEnhancers =
	(process.env.NODE_ENV !== "production" &&
		typeof window !== "undefined" &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const store = createStore(
	reducer,
	persistedState,
	composedEnhancers(applyMiddleware(thunkMiddleware))
);

store.subscribe(() => {
	localStorage.setItem("todos", JSON.stringify(store.getState()));
});

export const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route index path="/" element={<Home />} />
					<Route index path="/log-in" element={<Login />} />
					<Route index path="/register" element={<Register />} />
					<Route index path="/account" element={<Account />} />
					<Route index path="/tasks" element={<Tasks />} />
					<Route index path="/calendar" element={<Calendar />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};
