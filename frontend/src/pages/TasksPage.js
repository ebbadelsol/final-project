import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import dayjs from "dayjs";

import { showTasks } from "../reducers/todos";
import { showCategories } from "../reducers/categories";

import { Header } from "../components/Header";
import { TaskList } from "../components/TaskList";
import { AddTask } from "../components/AddTask";
import { LoadingIndicator } from "../components/LoadingIndicator";

const Container = styled.main`
	margin: 20px;

	@media (min-width: 700px) {
		margin: 30px 15vw;
	}

	@media (min-width: 1025px) {
		margin: 30px 20vw;
	}
`;

export const TasksPage = () => {
	const loading = useSelector((state) => state.ui.loading);
	const tasks = useSelector((store) => store.todos.items);
	const todayFormated = dayjs(new Date()).format("YYYY-MM-DD");
	const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(showTasks());
	}, [dispatch]);

	useEffect(() => {
		dispatch(showCategories());
	}, [dispatch]);

	const dateFilter = (date) => (item) =>
		dayjs(item.deadline).format("YYYY-MM-DD") === date;

	const taskByDate = (date) => tasks.filter(dateFilter(date));

	const weekdayOfDeadline = (deadline) => {
		// Add another if statement for passed date, return "Late"
		if (todayFormated === deadline) {
			return "Today";
		} else if (todayFormated === deadline) {
			// Change this to fit tomorrow
			return "Tomorrow";
		} else if (todayFormated === deadline) {
			// Change this to fit rest of the weekdays for one week
			return dayjs(deadline).format("dddd");
		} else {
			return dayjs(deadline).format("DD MMM");
		}
	};

	const allDeadlines = [];

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

	console.log("allDeadlines", allDeadlines);

	return (
		<>
			<LoadingIndicator />
			{!loading && (
				<>
					<Header />
					<Container>
						{allDeadlines.map((item) => (
							<div key={item.deadline}>
								<h2>{weekdayOfDeadline(item.deadline)}</h2>
								<TaskList tasks={taskByDate(item.deadline)} />
							</div>
						))}

						<button onClick={() => setIsAddTaskOpen(!isAddTaskOpen)}>
							{isAddTaskOpen ? "Close" : "Open"}
						</button>
						{isAddTaskOpen && <AddTask />}
					</Container>
				</>
			)}
		</>
	);
};
