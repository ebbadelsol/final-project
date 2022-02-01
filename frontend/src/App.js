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

import { AccountPage } from "./pages/AccountPage";
import { CalendarPage } from "./pages/CalendarPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { TasksPage } from "./pages/TasksPage";
import { NotFoundPage } from "./pages/NotFoundPage";

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
					<Route index path="/" element={<HomePage />} />
					<Route index path="/log-in" element={<LoginPage />} />
					<Route index path="/register" element={<RegisterPage />} />
					<Route index path="/account" element={<AccountPage />} />
					<Route index path="/tasks" element={<TasksPage />} />
					<Route index path="/calendar" element={<CalendarPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};
