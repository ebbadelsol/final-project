import React from "react";

import { SingleTask } from "./SingleTask";

export const TaskList = ({ tasks }) => {
	return (
		<>
			{tasks.map((item) => (
				<SingleTask key={item._id} item={item} />
			))}
		</>
	);
};
