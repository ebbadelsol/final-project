import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

import { onAddTask } from "../reducers/todos";
import { SquareButton } from "./Buttons";
import { Color } from "./colors/Color";
import { ParagraphPrimary } from "./Paragraphs";

const Background = styled.div`
	position: fixed;
	height: 100vh;
	width: 100vw;
	top: 0;
	right: 0;
	display: flex;
	align-items: end;
	justify-content: center;
	background-color: var(--shadow-2);
	z-index: 1;
`;

const AddTaskContainer = styled.div`
	background-color: var(--white);
	margin: 1.25rem 1.25rem 6.5rem;
	padding: 1.25rem;
	border-radius: 5px;
	box-shadow: 0 2px 4px var(--shadow-1), 0 12px 28px var(--shadow-2);
`;

export const AddTask = () => {
	const accessToken = useSelector((store) => store.user.accessToken);
	const userId = useSelector((store) => store.user.userId);
	const categories = useSelector((state) => state.categories);
	const [taskInput, setTaskInput] = useState("");
	const [deadline, setDeadline] = useState(new Date());
	const [categoryInput, setCategoryInput] = useState("");

	const dispatch = useDispatch();

	const onEnter = (event) => {
		if (event.key === "Enter") {
			dispatch(
				onAddTask(accessToken, taskInput, deadline, categoryInput, userId)
			);
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
				<SquareButton
					onClick={() =>
						dispatch(
							onAddTask(accessToken, taskInput, deadline, categoryInput, userId)
						)
					}
					backgroundColor={Color.PRIMARY_COLOR}
				>
					<ParagraphPrimary color={Color.WHITE}>Add task</ParagraphPrimary>
				</SquareButton>
			</AddTaskContainer>
		</Background>
	);
};

/*
<Button onClick={() => setIsAddTaskOpen(!isAddTaskOpen)}>
<Icon.Add color={Color.WHITE} />
</Button>
{isAddTaskOpen && <AddTask />}
*/
