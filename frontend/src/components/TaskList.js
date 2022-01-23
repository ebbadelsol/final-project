import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import dayjs from "dayjs";

import { todos } from "../reducers/todos";
import { TASK_URL, TASK_ID_URL, TASK_ID_COMPLETE_URL } from "../utils/urls";
import { Icon } from "./icons/Icon";
import { Color } from "./colors/Color";

const ListContainer = styled.section`
	margin-bottom: 110px;
`;

const Wrapper = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	background-color: var(--white);
	margin: 7px 0;
	border-radius: 5px;
	border: 1px solid var(--greyLight);
	min-height: 60px;
	padding: 15px;
`;

const Checkbox = styled.input`
	border-radius: 50%;
	position: relative;
	top: 5px;
	cursor: pointer;
`;

const TaskName = styled.label`
	width: 100%;
	padding-left: 10px;
	margin-right: 10px;
	display: flex;
	flex-direction: column;
	color: ${(props) => (props.isCompleted ? Color.GREY : Color.BLACK)};
	cursor: pointer;
`;

const Date = styled.span`
	font-size: 11px;
	color: var(--grey);
	line-height: 12px;
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

export const TaskList = () => {
	const taskItems = useSelector((store) => store.todos.items);

	const dispatch = useDispatch();

	useEffect(() => {
		const options = {
			method: "GET",
		};
		fetch(TASK_URL, options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(todos.actions.setItems(data.response));
					dispatch(todos.actions.setError(null));
				} else {
					dispatch(todos.actions.setError(data.response));
				}
			});
	}, [dispatch]);

	const onDeleteTask = (id) => {
		const options = {
			method: "DELETE",
		};
		fetch(TASK_ID_URL(id), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(todos.actions.setItems(data.response));
					dispatch(todos.actions.setError(null));
				} else {
					dispatch(todos.actions.setItems([]));
					dispatch(todos.actions.setError(data.response));
				}
			});
	};

	const onToggleTask = (id, isCompleted) => {
		const options = {
			method: "PATCH",
			body: JSON.stringify({ isCompleted: !isCompleted ? true : false }),
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetch(TASK_ID_COMPLETE_URL(id), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(todos.actions.setItems(data.response));
					dispatch(todos.actions.setError(null));
				} else {
					dispatch(todos.actions.setError(data.response));
				}
			});
	};

	return (
		<ListContainer>
			{taskItems.map((item) => (
				<Wrapper key={item._id}>
					<Checkbox
						type="checkbox"
						name={item._id}
						id={item._id}
						value={item.taskName}
						checked={item.isCompleted}
						onChange={() => onToggleTask(item._id, item.isCompleted)}
					/>
					<TaskName htmlFor={item._id} isCompleted={item.isCompleted}>
						{item.taskName}
						<Date> Created {dayjs(item.createdAt).format("DD MMM")}</Date>
					</TaskName>
					<DeleteButton
						aria-label="delete"
						onClick={() => onDeleteTask(item._id)}
					>
						<Icon.Close color={Color.GREY} />
					</DeleteButton>
				</Wrapper>
			))}
		</ListContainer>
	);
};