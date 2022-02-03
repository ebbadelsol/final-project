import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import dayjs from "dayjs";

import { Header } from "../components/Header";
import { TaskList } from "../components/TaskList";
import { AddTask } from "../components/AddTask";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { showTasks } from "../reducers/todos";
import { showCategories } from "../reducers/categories";

const Container = styled.main`
	margin: 20px;

	@media (min-width: 700px) {
		margin: 30px 15vw;
	}

	@media (min-width: 1025px) {
		margin: 30px 20vw;
	}
`;

const Button = styled.button`
	z-index: 2;
	position: fixed;
	top: 90vh;
	right: 0;
`;

export const TasksPage = () => {
	const loading = useSelector((state) => state.ui.loading);
	const tasks = useSelector((store) => store.todos.items);
	const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

	// const lateDeadlines = [];
	const allDeadlines = [];

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(showTasks());
	}, [dispatch]);

	useEffect(() => {
		dispatch(showCategories());
	}, [dispatch]);

	const dateGenerator = (number) =>
		dayjs(new Date().setDate(new Date().getDate() + number)).format(
			"YYYY-MM-DD"
		);

	const dateFilter = (date) => (item) =>
		dayjs(item.deadline).format("YYYY-MM-DD") === date;

	const taskByDate = (date) => tasks.filter(dateFilter(date));

	const isLate = (date) => {
		if (dayjs(new Date()).format("YYYY-MM-DD") === date) {
			return false;
		} else {
			return dayjs().isAfter(dayjs(date));
		}
	};

	const formattedDate = (deadline) => {
		if (isLate(deadline)) {
			return "Late";
		} else if (dateGenerator(0) === deadline) {
			return "Today";
		} else if (dateGenerator(1) === deadline) {
			return "Tomorrow";
		} else if (
			dateGenerator(2) === deadline ||
			dateGenerator(3) === deadline ||
			dateGenerator(4) === deadline ||
			dateGenerator(5) === deadline ||
			dateGenerator(6) === deadline
		) {
			return dayjs(deadline).format("dddd");
		} else {
			return dayjs(deadline).format("DD MMM");
		}
	};

	tasks.forEach((item) => {
		if (
			allDeadlines.find(
				(newItem) =>
					dayjs(newItem.deadline).format("YYYY-MM-DD") ===
					dayjs(item.deadline).format("YYYY-MM-DD")
			)
		) {
			return;
		}

		allDeadlines.push({
			deadline: dayjs(item.deadline).format("YYYY-MM-DD"),
		});
	});

	return (
		<>
			<LoadingIndicator />
			{!loading && (
				<>
					<Header />
					<Container>
						{allDeadlines.map((item) => (
							<div key={item.deadline}>
								<h2>{formattedDate(item.deadline)}</h2>
								<TaskList tasks={taskByDate(item.deadline)} />
							</div>
						))}

						<Button onClick={() => setIsAddTaskOpen(!isAddTaskOpen)}>
							{isAddTaskOpen ? "Close" : "Open"}
						</Button>
						{isAddTaskOpen && <AddTask />}
					</Container>
				</>
			)}
		</>
	);
};
