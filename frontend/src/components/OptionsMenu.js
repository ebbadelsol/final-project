import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { AddTask } from "./AddTask";
import { onDeleteTask } from "../reducers/todos";
import { onAddTask } from "../reducers/todos";

const Box = styled.div`
	background-color: white;
	position: relative;
	box-shadow: var(--shadow);
	border: var(--borderGreyLight);
	border-radius: var(--roundedCorners);
`;

export const OptionsMenu = ({ accessToken, id }) => {
	const [isEditOpen, setIsEditOpen] = useState(false);
	const dispatch = useDispatch();

	return (
		<>
			<Box>
				<button
					onClick={() => dispatch(onDeleteTask(accessToken, id))}
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
			</Box>
			{isEditOpen && (
				<AddTask
					fetchFunction={onAddTask}
					// setIsAddTaskOpen={setIsAddTaskOpen}
					// isAddTaskOpen={isAddTaskOpen}
				/>
			)}
		</>
	);
};
