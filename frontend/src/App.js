import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
	combineReducers,
	configureStore /*createStore*/,
} from "@reduxjs/toolkit";

import { todos } from "./reducers/todos";
import { Account } from "./pages/Account";
import { Calendar } from "./pages/Calendar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Tasks } from "./pages/Tasks";
import { ui } from "./reducers/ui";

const reducer = combineReducers({
	todos: todos.reducer,
	ui: ui.reducer,
});

const store = configureStore({ reducer });

// const persistedStateJSON = localStorage.getItem("todos");

// let persistedState = {};
// if (persistedStateJSON) {
// 	persistedState = JSON.parse(persistedStateJSON);
// }

// const store = createStore(
// 	reducer,
// 	persistedState,
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// store.subscribe(() => {
// 	localStorage.setItem("todos", JSON.stringify(store.getState()));
// });

export const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route index path="/" element={<Home />} />
					<Route index path="/log-in" element={<Login />} />
					<Route index path="/register" element={<Register />} />
					<Route index path="/account" element={<Account />} />
					<Route index path="/tasks" element={<Tasks />} />
					<Route index path="/calendar" element={<Calendar />} />
				</Routes>
			</Router>
		</Provider>
	);
};
