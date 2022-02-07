import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";

import { Header } from "../components/Header";
import { TaskList } from "../components/TaskList";
import { AddTask } from "../components/AddTask";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { showTasks } from "../reducers/todos";
import { showCategories } from "../reducers/categories";
import { Icons } from "../components/icons/Icons";
import { Color } from "../components/colors/Color";
import { BigButton } from "../components/Buttons";
import { HeadlineSecondary } from "../components/Headlines";

const Container = styled.main`
	margin: 1.25rem 1.25rem 6.5rem;

	@media (min-width: 700px) {
		margin: 1.75rem 15vw;
	}

	@media (min-width: 1025px) {
		margin: 1.75rem 20vw;
	}
`;

export const TasksPage = () => {
	const loading = useSelector((state) => state.ui.loading);
	const tasks = useSelector((store) => store.todos.items);
	const accessToken = useSelector((store) => store.user.accessToken);
	const userId = useSelector((store) => store.user.userId);
	const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

	// const lateDeadlines = [];
	const allDeadlines = [];

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
								setIsAddTaskOpen={setIsAddTaskOpen}
								isAddTaskOpen={isAddTaskOpen}
							/>
						)}
					</Container>
				</>
			)}
		</>
	);
};
