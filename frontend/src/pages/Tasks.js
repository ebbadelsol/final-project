import React from "react";
import styled from "styled-components";

import { Header } from "../components/Header";
import { TodoList } from "../components/TodoList";
import { AddTodo } from "../components/AddTodo";

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
	return (
		<>
			<Header />
			<Container>
				<TodoList />
				<AddTodo />
			</Container>
		</>
	);
};
