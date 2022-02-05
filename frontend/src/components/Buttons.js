import React from "react";
import styled from "styled-components";

const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	cursor: pointer;
`;

const SmallBTN = styled(Button)`
	position: relative;
	top: 0.09rem;
	background-color: var(--white);
	border: solid 1px var(--grey);
	padding: 0.25rem;
`;

const BigBTN = styled(Button)`
	position: fixed;
	bottom: 1.25rem;
	right: 1.25rem;
	width: 4rem;
	height: 4rem;
	border: none;
	padding: 1.25rem;
	box-shadow: 0 2px 4px var(--shadow-1), 0 12px 28px var(--shadow-2);
	z-index: 2;
`;

const SquareBTN = styled(Button)`
	position: relative;
	top: 0.09rem;
	width: 100%;
	border: none;
	padding: 0.5rem;
	border-radius: 5px;
`;

export const SmallButton = ({ onClick, children, ariaLabel }) => {
	return (
		<SmallBTN onClick={onClick} aria-label={ariaLabel}>
			{children}
		</SmallBTN>
	);
};

export const BigButton = ({
	onClick,
	children,
	ariaLabel,
	backgroundColor,
}) => {
	return (
		<BigBTN
			onClick={onClick}
			aria-label={ariaLabel}
			style={{ backgroundColor }}
		>
			{children}
		</BigBTN>
	);
};

export const SquareButton = ({
	onClick,
	children,
	ariaLabel,
	backgroundColor,
}) => {
	return (
		<SquareBTN
			onClick={onClick}
			aria-label={ariaLabel}
			style={{ backgroundColor }}
		>
			{children}
		</SquareBTN>
	);
};
