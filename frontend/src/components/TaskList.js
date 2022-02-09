import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { Icons } from "./icons/Icons";
import { Color } from "./colors/Color";
import { LabelPrimary, ParagraphSecondary } from "./Paragraphs";
import { SmallButton } from "./Buttons";
import { onToggleTask /*onDeleteTask*/ } from "../reducers/todos";
import { OptionsMenu } from "./OptionsMenu";

const SingleTask = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	background-color: var(--white);
	margin: 0.5rem 0;
	border-radius: var(--roundedCorners);
	border: var(--borderGreyLight);
	padding: 0.75rem;
`;

const Checkbox = styled.input`
	position: relative;
	top: 0.35rem;
	cursor: pointer;
`;

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 0.75rem;
	width: 100%;
`;

export const TaskList = ({ tasks }) => {
	const accessToken = useSelector((store) => store.user.accessToken);
	const [isOptionsOpen, setIsOptionsOpen] = useState(false);
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
							{item?.category?.categoryName} <br />
							{item.deadline}
						</ParagraphSecondary>
					</TextContainer>
					{isOptionsOpen && (
						<OptionsMenu accessToken={accessToken} id={item._id} />
					)}
					<SmallButton
						onClick={() => setIsOptionsOpen(!isOptionsOpen)}
						ariaLabel="More options"
					>
						{isOptionsOpen ? (
							<Icons.Close size="1em" padding="0.1em" color={Color.GREY} />
						) : (
							<Icons.More size="1em" color={Color.GREY} />
						)}
					</SmallButton>
				</SingleTask>
			))}
		</>
	);
};

/*
<SmallButton
	onClick={() => dispatch(onDeleteTask(accessToken, item._id))}
	ariaLabel="Delete task"
>
	<Icons.Close size="0.75rem" color={Color.GREY} />
</SmallButton>
*/
