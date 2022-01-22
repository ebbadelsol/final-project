import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { todos } from "../reducers/todos";
import { TASK_URL } from "../utils/urls";

const AddTodoSection = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	position: fixed;
	bottom: 0px;
	right: 0px;
	left: 0px;
	background-color: #fcfcff;
	padding: 20px 20px 30px 20px;

	@media (min-width: 700px) {
		padding: 20px 15vw 30px 15vw;
	}

	@media (min-width: 1025px) {
		padding: 20px 20vw 30px 20vw;
	}
`;

const TextInput = styled.input`
	height: 60px;
	grid-column: span 4;
	padding: 15px;
	font-size: 16px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border: 1px solid #e0e0e0;
	border-right: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
		"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
		sans-serif;
	::placeholder {
		color: #b0b0b0;
	}
`;

const AddTaskButton = styled.button`
	height: 60px;
	background-color: #60c57f;
	border: none;
	font-weight: 600;
	font-size: 16px;
	color: #ffffff;
	border-top-right-radius: 6px;
	border-bottom-right-radius: 6px;
	grid-column: span 1;
`;

export const AddTodo = () => {
	const [input, setInput] = useState("");

	const dispatch = useDispatch();

	const onAddTodo = () => {
		const options = {
			method: "POST",
			body: JSON.stringify({ taskname: input }),
			headers: {
				"Content-Type": "application/json",
			},
		};

		fetch(TASK_URL, options)
			.then((res) => res.json())
			.then((data) => {
				console.log("My data:", data);
				console.log("My input:", input);
				if (data.success) {
					dispatch(todos.actions.setItems(data.response));
					dispatch(todos.actions.setError(null));
				} else {
					dispatch(todos.actions.setError(data.response));
				}
			});
	};

	const onEnter = (event) => {
		if (event.key === "Enter") {
			onAddTodo();
		}
	};

	return (
		<AddTodoSection>
			<TextInput
				type="text"
				value={input.taskname}
				placeholder="Add a new task"
				onKeyDown={onEnter}
				onChange={(event) => setInput(event.target.value)}
			/>
			<AddTaskButton onClick={onAddTodo}>Add</AddTaskButton>
		</AddTodoSection>
	);
};
