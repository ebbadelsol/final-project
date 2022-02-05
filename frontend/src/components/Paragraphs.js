import React from "react";
import styled from "styled-components";

const TextPrimary = styled.p`
	font-size: 16px;
	line-height: 1.5;
	color: var(--black);

	@media (min-width: 768px) {
		font-size: 18px;
	}
`;

const Label = styled.label`
	font-size: 16px;
	line-height: 1.5;
	color: var(--black);
	cursor: pointer;

	@media (min-width: 768px) {
		font-size: 18px;
	}
`;

const TextSecondary = styled.p`
	font-size: 14px;
	line-height: 1.5;
	color: var(--grey);

	@media (min-width: 768px) {
		font-size: 15px;
	}
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
