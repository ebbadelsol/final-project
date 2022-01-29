import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
// import dayjs from "dayjs";

import { showTasks, onToggleTask, onDeleteTask } from "../reducers/todos";

import { LoadingIndicator } from "./LoadingIndicator";
import { Icon } from "./icons/Icon";
import { Color } from "./colors/Color";
import { LabelPrimary, ParagraphSecondary } from "./Paragraphs";

const TaskListContainer = styled.section`
	margin-bottom: 110px;
`;

const SingleTask = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	background-color: var(--white);
	margin: 7px 0;
	border-radius: 5px;
	border: 1px solid var(--greyLight);
	/* min-height: 60px; */
	/* padding: 15px; */
	/* min-height: 4.25rem; */
	padding: 0.75rem;
`;

const Checkbox = styled.input`
	border-radius: 50%;
	position: relative;
	top: 6px;
	cursor: pointer;
`;

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 10px;
	width: 100%;
`;

const DeleteButton = styled.button`
	display: flex;
	justify-content: center;
	border: solid 1px var(--grey);
	border-radius: 50%;
	background-color: var(--white);
	position: relative;
	top: 5px;
	padding: 3px;
	cursor: pointer;
`;

export const TaskList = ({ tasks }) => {
	// const tasks = useSelector((store) => store.todos.items);
	const loading = useSelector((state) => state.ui.loading);
	const dispatch = useDispatch();
	// const today = new Date();

	useEffect(() => {
		dispatch(showTasks());
	}, [dispatch]);

	return (
		<>
			<LoadingIndicator />
			{!loading && (
				<TaskListContainer>
					{tasks.map((item) => (
						<SingleTask key={item._id}>
							<Checkbox
								type="checkbox"
								name={item._id}
								id={item._id}
								value={item.taskName}
								checked={item.isCompleted}
								onChange={() =>
									dispatch(onToggleTask(item._id, item.isCompleted))
								}
							/>
							<TextContainer>
								<LabelPrimary
									htmlFor={item._id}
									isCompleted={item.isCompleted}
									color={item.isCompleted ? Color.GREY : Color.BLACK}
								>
									{item.taskName}
								</LabelPrimary>
								<ParagraphSecondary>{item.category}</ParagraphSecondary>
							</TextContainer>
							<DeleteButton
								aria-label="delete"
								onClick={() => dispatch(onDeleteTask(item._id))}
							>
								<Icon.Close color={Color.GREY} />
							</DeleteButton>
						</SingleTask>
					))}
				</TaskListContainer>
			)}
		</>
	);
};
