import React, { useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

import { SquareButton } from "./Buttons";
import { Color } from "./colors/Color";
import { ParagraphPrimary } from "./Paragraphs";
import { HeadlinePrimary } from "./Headlines";

const Background = styled.div`
	position: fixed;
	height: 100vh;
	width: 100vw;
	top: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: end;
	background-color: var(--shadow-2);
	z-index: 2;

	@media (min-width: 768px) {
		align-items: center;
	}
`;

const AddTaskContainer = styled.div`
	background-color: var(--white);
	margin: 1.25rem 1.25rem 6.5rem;
	padding: 2rem 2rem 3rem;
	border-radius: var(--roundedCorners);
	box-shadow: var(--shadow);

	> *:not(:last-child) {
		margin-bottom: 0.75rem;
	}

	@media (min-width: 768px) {
		margin: 0;
	}
`;

const DateButton = styled.button`
	width: 100%;
	justify-content: start;
	border: var(--borderGreyLight);
	border-radius: var(--roundedCorners);

	:hover {
		background-color: var(--greyLightest);
	}
`;

export const AddTask = ({
	fetchFunction,
	setIsAddTaskOpen,
	isAddTaskOpen,
	taskId,
}) => {
	const accessToken = useSelector((store) => store.user.accessToken);
	const userId = useSelector((store) => store.user.userId);
	const categories = useSelector((store) => store.categories);
	const [taskInput, setTaskInput] = useState("");
	const [categoryInput, setCategoryInput] = useState("");
	const [deadline, setDeadline] = useState(new Date());

	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(
			fetchFunction(
				accessToken,
				taskInput,
				deadline,
				categoryInput,
				userId,
				taskId
			)
		);
		const closeContainer = () => setIsAddTaskOpen(!isAddTaskOpen);
		closeContainer();
	};

	const CustomDatePicker = forwardRef(({ value, onClick }, ref) => (
		<DateButton onClick={onClick} ref={ref}>
			<ParagraphPrimary>{value}</ParagraphPrimary>
		</DateButton>
	));

	return (
		<Background>
			<AddTaskContainer>
				<HeadlinePrimary marginBottom="0.75rem">
					What are you planning?
				</HeadlinePrimary>
				<input
					type="text"
					value={taskInput}
					placeholder="Your task"
					onChange={(event) => setTaskInput(event.target.value)}
				/>
				<select
					aria-label="Choose collection"
					value={categoryInput}
					onChange={(event) => setCategoryInput(event.target.value)}
				>
					<option value="" hidden>
						Collection
					</option>
					{categories.items.map((item) => (
						<option key={item._id} value={item._id}>
							{item.categoryName}
						</option>
					))}
				</select>

				<DatePicker
					aria-label="Choose a deadline"
					selected={deadline}
					onChange={(date) => setDeadline(date)}
					dateFormat="dd-MM-yyyy"
					closeOnScroll={true}
					customInput={<CustomDatePicker />}
				/>
				<SquareButton
					onClick={handleClick}
					backgroundColor={Color.PRIMARY_COLOR}
				>
					<ParagraphPrimary color={Color.WHITE}>Create task</ParagraphPrimary>
				</SquareButton>
			</AddTaskContainer>
		</Background>
	);
};
