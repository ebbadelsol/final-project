import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { AddTask } from "./AddTask";
import { onDeleteTask } from "../reducers/todos";
import { onUpdateTask } from "../reducers/todos";

const MenuOptions = styled.div`
	position: absolute;
	background-color: white;
	width: 125px;
	right: 2.25rem;
	box-shadow: var(--shadow);
	border: var(--borderGreyLight);
	border-radius: var(--roundedCorners);
	z-index: 1;
	> * {
		padding: 1.25rem;
		text-decoration: none;
		color: var(--black);
		font-weight: 600;
		width: 100%;
		:hover {
			background-color: var(--greyLightest);
		}
	}
	> *:last-child {
		border-top: var(--borderGreyLight);
	}
`;

export const OptionsMenu = ({ accessToken, taskId }) => {
	const [isEditOpen, setIsEditOpen] = useState(false);
	const dispatch = useDispatch();

	return (
		<>
			<MenuOptions>
				<button
					onClick={() => dispatch(onDeleteTask(accessToken, taskId))}
					aria-label="Delete task"
				>
					Delete
				</button>
				<button
					onClick={() => setIsEditOpen(!isEditOpen)}
					aria-label="Delete task"
				>
					Edit
				</button>
			</MenuOptions>
			{isEditOpen && (
				<AddTask
					fetchFunction={onUpdateTask}
					taskId={taskId}
					headline={"Change your task"}
					buttonText={"Change task"}
				/>
			)}
		</>
	);
};
