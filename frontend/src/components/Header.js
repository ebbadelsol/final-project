import React from "react";
import styled from "styled-components";

import { Counter } from "./Counter";
import { HeadlinePrimary } from "./Headlines";
import { Color } from "./colors/Color";

const HeaderSection = styled.header`
	background-color: var(--primaryColor);
	padding: 1.75rem 1.25rem;
	color: var(--white);

	@media (min-width: 700px) {
		padding: 1.75rem 15vw;
	}

	@media (min-width: 1025px) {
		padding: 1.75rem 20vw;
	}
`;

export const Header = () => {
	return (
		<HeaderSection>
			<HeadlinePrimary color={Color.WHITE}>My tasks</HeadlinePrimary>
			<Counter />
		</HeaderSection>
	);
};
