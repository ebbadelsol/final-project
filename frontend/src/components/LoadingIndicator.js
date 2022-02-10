import React from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

const LoadingContainer = styled.div`
	width: 100vw;
	height: 100vh;
`;

const LoadingOverlay = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const spinner = keyframes`
	0% {
		transform: rotate(0);
	}
	50% {
		transform: rotate(180deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

const LoadingSpinner = styled.div`
	width: 70px;
	height: 70px;
	border: 7px solid var(--greyLight);
	border-radius: 50%;
	border-left: 7px solid var(--primaryColor);
	display: inline-block;
	animation-name: ${spinner};
	animation-duration: 0.5s;
	animation-iteration-count: infinite;
`;

export const LoadingIndicator = () => {
	const loading = useSelector((store) => store.ui.loading);

	return (
		<>
			{loading && (
				<LoadingContainer>
					<LoadingOverlay>
						<LoadingSpinner />
					</LoadingOverlay>
				</LoadingContainer>
			)}
		</>
	);
};
