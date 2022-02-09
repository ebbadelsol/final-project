/* eslint-disable max-len */
import React from "react";

export const More = ({ color = "#222221", size = "100%", ...rest }) => {
	return (
		<svg
			id="Layer_1"
			version="1.1"
			viewBox="0 0 512 512"
			height={size}
			width={size}
		>
			<g>
				<path
					d="M256,224c-17.7,0-32,14.3-32,32s14.3,32,32,32c17.7,0,32-14.3,32-32S273.7,224,256,224L256,224z"
					fill={color}
				/>
				<path
					d="M128.4,224c-17.7,0-32,14.3-32,32s14.3,32,32,32c17.7,0,32-14.3,32-32S146,224,128.4,224L128.4,224z"
					fill={color}
				/>
				<path
					d="M384,224c-17.7,0-32,14.3-32,32s14.3,32,32,32s32-14.3,32-32S401.7,224,384,224L384,224z"
					fill={color}
				/>
			</g>
		</svg>
	);
};
