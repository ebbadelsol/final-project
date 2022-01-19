import React from "react";
import { Provider } from "react-redux";
import {
	combineReducers,
	configureStore /*createStore*/,
} from "@reduxjs/toolkit";

import { todos } from "./reducers/todos";
import { Main } from "./pages/Main";

const reducer = combineReducers({
	todos: todos.reducer,
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
			<Main />
		</Provider>
	);
};

export default App;
