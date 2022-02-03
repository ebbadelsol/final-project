import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

import { onAddTask } from "../reducers/todos";

const Background = styled.div`
	height: 100vh;
	width: 100vw;
	z-index: 1;
	position: fixed;
	top: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const AddTaskContainer = styled.div`
	background-color: var(--white);
`;

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
		<Background>
			<AddTaskContainer>
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
					onClick={() =>
						dispatch(onAddTask(taskInput, deadline, categoryInput))
					}
				>
					Add
				</button>
			</AddTaskContainer>
		</Background>
	);
};
