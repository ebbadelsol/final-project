import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
// import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

import { onAddTask } from "../reducers/todos";

// const AddTaskSection = styled.div`
// 	display: grid;
// 	grid-template-columns: repeat(5, 1fr);
// 	position: fixed;
// 	bottom: 0px;
// 	right: 0px;
// 	left: 0px;
// 	background-color: var(--greyLightest);
// 	padding: 20px 20px 30px 20px;

// 	@media (min-width: 700px) {
// 		padding: 20px 15vw 30px 15vw;
// 	}

// 	@media (min-width: 1025px) {
// 		padding: 20px 20vw 30px 20vw;
// 	}
// `;

// const TextInput = styled.input`
// 	height: 60px;
// 	grid-column: span 4;
// 	padding: 15px;
// 	font-size: 16px;
// 	border-top-left-radius: 5px;
// 	border-bottom-left-radius: 5px;
// 	border: 1px solid var(--greyLight);
// 	border-right: none;
// 	-webkit-appearance: none;
// 	-moz-appearance: none;
// 	appearance: none;
// 	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
// 		"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
// 		sans-serif;
// 	::placeholder {
// 		color: var(--grey);
// 	}
// `;

// const AddTaskButton = styled.button`
// 	height: 60px;
// 	background-color: var(--primaryColor);
// 	border: none;
// 	font-weight: 600;
// 	font-size: 16px;
// 	color: var(--white);
// 	border-top-right-radius: 6px;
// 	border-bottom-right-radius: 6px;
// 	grid-column: span 1;
// `;

export const AddTask = () => {
	const [taskInput, setTaskInput] = useState("");
	const [deadline, setDeadline] = useState(new Date());
	const [categoryInput, setCategoryInput] = useState("");

	const categories = useSelector((state) => state.categories);
	const dispatch = useDispatch();

	const onEnter = (event) => {
		if (event.key === "Enter") {
			dispatch(onAddTask(taskInput, deadline, categoryInput));
			// setTaskInput("");
		}
	};

	// const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
	//   <button className="example-custom-input" onClick={onClick} ref={ref}>
	//     {value}
	//   </button>
	// ));

	return (
		<div>
			<input
				type="text"
				value={taskInput}
				placeholder="Add a new task"
				onKeyDown={onEnter}
				onChange={(event) => setTaskInput(event.target.value)}
			/>
			<select
				value={categoryInput}
				onChange={(event) => setCategoryInput(event.target.value)}
			>
				<option value="">Category</option>
				{categories.items.map((item) => (
					<option key={item._id} value={item._id}>
						{item.categoryName}
					</option>
				))}
			</select>

			<DatePicker
				selected={deadline}
				onChange={(date) => setDeadline(date)}
				dateFormat="dd-MM-yyyy"
				closeOnScroll={true}
				// placeholderText="Weeks start on Monday"
				// customInput={<ExampleCustomInput />}
				// className="red-border"
				// todayButton="Today"
				onKeyDown={onEnter}
			/>
			<button
				onClick={() => dispatch(onAddTask(taskInput, deadline, categoryInput))}
			>
				Add
			</button>
		</div>
	);
};
