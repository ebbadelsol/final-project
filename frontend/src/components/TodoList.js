import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import dayjs from "dayjs";

import { todos } from "../reducers/todos";
import { TASK_URL, TASK_ID_URL } from "../utils/urls";
import { Icon } from "./icons/Icon";

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
`;

const TaskName = styled.label`
	width: 100%;
	padding-left: 10px;
	margin-right: 10px;
	display: flex;
	flex-direction: column;
	color: ${(props) => (props.completed ? `#b0b0b0` : `#222221`)};
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
	cursor: pointer;
`;

export const TodoList = () => {
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

	// const onToggleTodo = (id) => {
	// 	dispatch(todos.actions.toggleTodo(id));
	// };

	return (
		<ListContainer>
			{taskItems.map((item) => (
				<Wrapper key={item._id}>
					<Checkbox
						type="checkbox"
						name={item._id}
						id={item._id}
						value={item.taskname}
						checked={item.isComplete}
						// onChange={() => onToggleTodo(item._id)}
					/>
					<TaskName htmlFor={item._id} completed={item.completed}>
						{item.taskname}
						<Date> Created {dayjs(item.createdAt).format("DD MMM")}</Date>
					</TaskName>
					<DeleteButton
						aria-label="delete"
						onClick={() => onDeleteTask(item._id)}
					>
						<Icon.Close />
					</DeleteButton>
				</Wrapper>
			))}
		</ListContainer>
	);
};
