import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import dayjs from "dayjs";

import { Header } from "../components/Header";
import { TaskList } from "../components/TaskList";
import { AddTask } from "../components/AddTask";

const Container = styled.main`
	margin: 20px;

	@media (min-width: 700px) {
		margin: 30px 15vw;
	}

	@media (min-width: 1025px) {
		margin: 30px 20vw;
	}
`;

export const Tasks = () => {
	const tasks = useSelector((store) => store.todos.items);
	const todayFormated = dayjs(new Date()).format("YYYY-MM-DD");

	const dateFilter = (date) => (item) =>
		dayjs(item.deadline).format("YYYY-MM-DD") === date;

	const taskByDate = (date) => tasks.filter(dateFilter(date));

	const weekdayOfDeadline = (deadline) => {
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

	return (
		<>
			<Header />
			<Container>
				<h2>{weekdayOfDeadline("2022-01-31")}</h2>
				<TaskList tasks={taskByDate("2022-01-31")} />
				<h2>{weekdayOfDeadline("2022-02-01")}</h2>
				<TaskList tasks={taskByDate("2022-02-01")} />
				<h2>{weekdayOfDeadline("2022-02-11")}</h2>
				<TaskList tasks={taskByDate("2022-02-11")} />
				<AddTask />
			</Container>
		</>
	);
};
