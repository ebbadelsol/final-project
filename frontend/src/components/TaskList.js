import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { onToggleTask, onDeleteTask } from "../reducers/todos";

import { Icon } from "./icons/Icon";
import { Color } from "./colors/Color";
import { LabelPrimary, ParagraphSecondary } from "./Paragraphs";
import { SmallButton } from "./Buttons";

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

export const TaskList = ({ tasks }) => {
	const accessToken = useSelector((store) => store.user.accessToken);
	const dispatch = useDispatch();

	return (
		<>
			{tasks.map((item) => (
				<SingleTask key={item._id}>
					<Checkbox
						type="checkbox"
						name={item._id}
						id={item._id}
						value={item.taskName}
						checked={item.isCompleted}
						onChange={() =>
							dispatch(onToggleTask(accessToken, item._id, item.isCompleted))
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
						<ParagraphSecondary>
							Category: {item?.category?.categoryName} <br /> Deadline:{" "}
							{item.deadline}
						</ParagraphSecondary>
					</TextContainer>
					<SmallButton
						onClick={() => dispatch(onDeleteTask(accessToken, item._id))}
						ariaLabel="Delete task"
					>
						<Icon.Close size="0.75rem" color={Color.GREY} />
					</SmallButton>
				</SingleTask>
			))}
		</>
	);
};
