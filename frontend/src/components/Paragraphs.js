import React from "react";
import styled, { css } from "styled-components";

export const basePrimaryText = css`
	font-size: 16px;
	line-height: 1.5;
	color: var(--black);

	@media (min-width: 768px) {
		font-size: 18px;
	}
`;

export const baseSecondaryText = css`
	font-size: 14px;
	line-height: 1.5;
	color: var(--grey);

	@media (min-width: 768px) {
		font-size: 15px;
	}
`;

const TextPrimary = styled.p`
	${basePrimaryText}
`;

const Label = styled.label`
	${basePrimaryText}
	cursor: pointer;
`;

const TextSecondary = styled.p`
	${baseSecondaryText}
`;

export const ParagraphPrimary = ({ color, children }) => {
	return <TextPrimary style={{ color }}>{children}</TextPrimary>;
};

export const LabelPrimary = ({ htmlFor, isCompleted, color, children }) => {
	return (
		<Label htmlFor={htmlFor} isCompleted={isCompleted} style={{ color }}>
			{children}
		</Label>
	);
};

export const ParagraphSecondary = ({ color, children }) => {
	return <TextSecondary style={{ color }}>{children}</TextSecondary>;
};
