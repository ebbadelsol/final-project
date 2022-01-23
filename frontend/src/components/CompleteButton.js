import React from "react";
import { useDispatch } from "react-redux";
import { todos } from "../reducers/todos";
import styled from "styled-components";

const CompleteAllButton = styled.button`
	background-color: var(--primaryColor);
	color: var(--white);
	padding: 4px 8px;
	border: solid 2px var(--white);
	border-radius: 100px;
	font-size: 12px;
	font-weight: 700;
	text-transform: uppercase;
	&:hover {
		background-color: var(--white);
		color: var(--primaryColor);
	}
`;

export const CompleteButton = () => {
	const dispatch = useDispatch();

	const onCompleteAllTasks = (items) => {
		dispatch(todos.actions.completeAllTasks(items));
	};

	return (
		<CompleteAllButton onClick={onCompleteAllTasks}>
			Complete all
		</CompleteAllButton>
	);
};
