import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { AddTask } from "./AddTask";
import { onDeleteTask } from "../reducers/todos";
import { onUpdateTask } from "../reducers/todos";

const MenuOptions = styled.div`
	background-color: white;
	right: 0;
	position: absolute;
	box-shadow: var(--shadow);
	border: var(--borderGreyLight);
	border-radius: var(--roundedCorners);
	z-index: 1;
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
			{isEditOpen && <AddTask fetchFunction={onUpdateTask} taskId={taskId} />}
		</>
	);
};
