import React from "react";
import styled from "styled-components";

const PrimaryHeadline = styled.h1`
	font-size: 26px;
	line-height: 1.3;
	color: var(--black);
	font-weight: 700;

	@media (min-width: 768px) {
		font-size: 30px;
	}
`;

const SecondaryHeadline = styled.h2`
	font-size: 20px;
	line-height: 1.4;
	color: var(--black);
	font-weight: 700;

	@media (min-width: 768px) {
		font-size: 23px;
	}
`;

const SmallHeadline = styled.h3`
	font-size: 18px;
	line-height: 1.4;
	color: var(--black);
	font-weight: 700;

	@media (min-width: 768px) {
		font-size: 20px;
	}
`;

export const HeadlinePrimary = ({
	color,
	marginTop,
	marginBottom,
	children,
}) => {
	return (
		<PrimaryHeadline style={{ color, marginTop, marginBottom }}>
			{children}
		</PrimaryHeadline>
	);
};

export const HeadlineSecondary = ({
	color,
	marginTop,
	marginBottom,
	children,
}) => {
	return (
		<SecondaryHeadline style={{ color, marginTop, marginBottom }}>
			{children}
		</SecondaryHeadline>
	);
};

export const HeadlineSmall = ({ color, marginTop, marginBottom, children }) => {
	return (
		<SmallHeadline style={{ color, marginTop, marginBottom }}>
			{children}
		</SmallHeadline>
	);
};
