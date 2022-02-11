import React from "react";
import styled from "styled-components";

import { Counter } from "./Counter";
import { HeadlinePrimary } from "./Headlines";
import { Color } from "./colors/Color";
import { Menu } from "./Menu";

const HeaderSection = styled.header`
	background-color: var(--primaryColor);
	padding: 1.75rem 1.25rem;
	color: var(--white);

	@media (min-width: 768px) {
		padding: 1.75rem 15vw;
	}

	@media (min-width: 1025px) {
		padding: 1.75rem 20vw;
	}
`;

export const Header = () => {
	return (
		<HeaderSection>
			<div>
				<HeadlinePrimary color={Color.WHITE}>My tasks</HeadlinePrimary>
				<Counter />
			</div>
			<Menu />
		</HeaderSection>
	);
};
