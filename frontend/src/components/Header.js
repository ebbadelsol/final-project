import React from "react";
import styled from "styled-components";

import { Counter } from "./Counter";

const HeaderSection = styled.header`
	background-color: var(--primaryColor);
	padding: 30px 20px;
	color: var(--white);

	@media (min-width: 700px) {
		padding: 60px 15vw;
	}

	@media (min-width: 1025px) {
		padding: 60px 20vw;
	}
`;

const Heading = styled.h1`
	font-size: 26px;
	margin-bottom: 5px;
`;

export const Header = () => {
	return (
		<HeaderSection>
			<Heading>To do list</Heading>
			<Counter />
		</HeaderSection>
	);
};
