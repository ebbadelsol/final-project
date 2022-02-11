import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";

import { Header } from "../components/Header";
import { TaskList } from "../components/TaskList";
import { AddTask } from "../components/AddTask";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { Icons } from "../components/icons/Icons";
import { Color } from "../components/colors/Color";
import { BigButton } from "../components/Buttons";
import { HeadlineSecondary } from "../components/Headlines";
import { showTasks } from "../reducers/todos";
import { showCategories } from "../reducers/categories";
import { onCreateTask } from "../reducers/todos";

const Container = styled.main`
	margin: 1.25rem 1.25rem 6.5rem;

	@media (min-width: 768px) {
		margin: 1.75rem 15vw;
	}

	@media (min-width: 1025px) {
		margin: 1.75rem 20vw;
	}
`;

export const TasksPage = () => {
	const loading = useSelector((store) => store.ui.loading);
	const tasks = useSelector((store) => store.todos.items);
	const accessToken = useSelector((store) => store.user.accessToken);
	const userId = useSelector((store) => store.user.userId);
	const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

	const lateDeadlines = [];
	const onTimeDeadlines = [];

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!accessToken) {
			navigate("/login");
		}
	}, [accessToken, navigate]);

	useEffect(() => {
		dispatch(showTasks(accessToken, userId));
	}, [dispatch, accessToken, userId]);

	useEffect(() => {
		dispatch(showCategories());
	}, [dispatch]);

	// Gives you a date (today + number)
	const dateGenerator = (number) =>
		dayjs(new Date().setDate(new Date().getDate() + number)).format(
			"YYYY-MM-DD"
		);

	const dateFilter = (date) => (item) =>
		dayjs(item.deadline).format("YYYY-MM-DD") === date;

	// Filter all tasks by a specific date
	const taskByDate = (date) => tasks.filter(dateFilter(date));

	// Gives you a true or false value depending on if the date has passed or not
	const isLate = (date) => {
		if (dayjs().format("YYYY-MM-DD") === date) {
			return false;
		} else {
			return dayjs().isAfter(dayjs(date));
		}
	};

	// Formattes the date differently depending on how close the deadline is to the current date
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

	const filterLateDeadlines = tasks.filter((item) =>
		isLate(dayjs(item.deadline).format("YYYY-MM-DD"))
	);

	const filterDeadlinesOnTime = tasks.filter(
		(item) => !isLate(dayjs(item.deadline).format("YYYY-MM-DD"))
	);

	// Adds all existing deadlines to onTimeDeadlines array. (It also checks if a deadline with the same date already exists in the array and in that case returns nothing).
	filterDeadlinesOnTime.forEach((item) => {
		if (
			onTimeDeadlines.find(
				(newItem) =>
					dayjs(newItem.deadline).format("YYYY-MM-DD") ===
					dayjs(item.deadline).format("YYYY-MM-DD")
			)
		) {
			return;
		}

		onTimeDeadlines.push({
			deadline: dayjs(item.deadline).format("YYYY-MM-DD"),
		});
	});

	// Adds all late deadlines to the lateDeadlines array and exclude todays date. (It also checks if a deadline with the same date already exists in the array and in that case returns nothing).
	filterLateDeadlines.forEach((item) => {
		if (
			lateDeadlines.find(
				(newItem) =>
					dayjs(newItem.deadline).format("YYYY-MM-DD") ===
					dayjs(item.deadline).format("YYYY-MM-DD")
			)
		) {
			return;
		}

		if (
			dayjs(item.deadline).format("YYYY-MM-DD") !== dayjs().format("YYYY-MM-DD")
		) {
			lateDeadlines.push({
				deadline: dayjs(item.deadline).format("YYYY-MM-DD"),
			});
		}
		return lateDeadlines;
	});

	return (
		<>
			<LoadingIndicator />
			{!loading && (
				<>
					<Header />
					<Container>
						{lateDeadlines.length !== 0 && (
							<HeadlineSecondary marginTop="1.5rem" marginBottom="0.5rem">
								Late
							</HeadlineSecondary>
						)}
						{lateDeadlines.map((item) => (
							<TaskList key={item.deadline} tasks={taskByDate(item.deadline)} />
						))}

						{onTimeDeadlines.map((item) => (
							<div key={item.deadline}>
								<HeadlineSecondary marginTop="1.5rem" marginBottom="0.5rem">
									{formattedDate(item.deadline)}
								</HeadlineSecondary>
								<TaskList tasks={taskByDate(item.deadline)} />
							</div>
						))}

						<BigButton
							onClick={() => setIsAddTaskOpen(!isAddTaskOpen)}
							ariaLabel="New task"
							backgroundColor={
								isAddTaskOpen ? Color.BLACK : Color.PRIMARY_COLOR
							}
						>
							{isAddTaskOpen ? (
								<Icons.Close color={Color.WHITE} />
							) : (
								<Icons.Add color={Color.WHITE} />
							)}
						</BigButton>
						{isAddTaskOpen && (
							<AddTask
								fetchFunction={onCreateTask}
								setIsAddTaskOpen={setIsAddTaskOpen}
								isAddTaskOpen={isAddTaskOpen}
								headline={"What are you planning?"}
								buttonText={"Create task"}
							/>
						)}
					</Container>
				</>
			)}
		</>
	);
};
