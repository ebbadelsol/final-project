import React from "react";
import styled from "styled-components";

const SmallBTN = styled.button`
	position: relative;
	top: 0.09rem;
	background-color: var(--white);
	border: var(--borderGrey);
	padding: 0.1rem;
	border-radius: 50%;
`;

const BigBTN = styled.button`
	position: fixed;
	bottom: 1.25rem;
	right: 1.25rem;
	width: 4rem;
	height: 4rem;
	border: none;
	padding: 1.25rem;
	box-shadow: var(--shadow);
	z-index: 3;
	border-radius: 50%;
`;

const SquareBTN = styled.button`
	width: 100%;
	margin-top: 0.75rem;
	border-radius: var(--roundedCorners);
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
	border = "none",
}) => {
	return (
		<SquareBTN
			onClick={onClick}
			aria-label={ariaLabel}
			style={{ backgroundColor, border }}
			// style={{ backgroundColor:{bgColor}, border }}
		>
			{children}
		</SquareBTN>
	);
};
