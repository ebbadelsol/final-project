/* eslint-disable max-len */
import React from "react";

export const Add = ({ color = "#222221", size = "100%", ...rest }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width={size}
			height={size}
			viewBox="0 0 24 24"
		>
			<path
				d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
				fill={color}
			></path>
		</svg>
	);
};

// https://icons8.com/icon/3220/plus-%2B