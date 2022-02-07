/* eslint-disable max-len */
import React from "react";

export const Hamburger = ({ color = "#222221", size = "100%", ...rest }) => {
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
				d="M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"
				fill={color}
			></path>
		</svg>
	);
};

// export const Hamburger = ({ color = "#222221", size = "100%", ...rest }) => {
// 	return (
// 		<svg
// 			xmlns="http://www.w3.org/2000/svg"
// 			x="0px"
// 			y="0px"
// 			width={size}
// 			height={size}
// 			viewBox="0 0 48 48"
// 		>
// 			<path
// 				d="M 5.5 9 A 1.50015 1.50015 0 1 0 5.5 12 L 42.5 12 A 1.50015 1.50015 0 1 0 42.5 9 L 5.5 9 z M 5.5 22.5 A 1.50015 1.50015 0 1 0 5.5 25.5 L 42.5 25.5 A 1.50015 1.50015 0 1 0 42.5 22.5 L 5.5 22.5 z M 5.5 36 A 1.50015 1.50015 0 1 0 5.5 39 L 42.5 39 A 1.50015 1.50015 0 1 0 42.5 36 L 5.5 36 z"
// 				fill={color}
// 			></path>
// 		</svg>
// 	);
// };
