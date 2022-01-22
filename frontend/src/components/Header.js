import React from "react";
import styled from "styled-components";

import { Counter } from "./Counter";
import { CompleteButton } from "./CompleteButton";

const HeaderSection = styled.header`
	background-color: #60c57f;
	padding: 30px 20px;
	color: #ffffff;

	@media (min-width: 700px) {
		padding: 60px 15vw;
	}

	@media (min-width: 1025px) {
		padding: 60px 20vw;
	}
`;

const FlexContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Heading = styled.h1`
	font-size: 26px;
	margin-bottom: 5px;
`;

export const Header = () => {
	return (
		<HeaderSection>
			<FlexContainer>
				<Heading>To do list</Heading>
				<CompleteButton />
			</FlexContainer>
			<Counter />
		</HeaderSection>
	);
};
