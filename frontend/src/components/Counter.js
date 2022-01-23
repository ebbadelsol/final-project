import React from "react";
import { useSelector } from "react-redux";

export const Counter = () => {
	const tasksAmount = useSelector((store) => store.todos.items.length);
	const isCompletedAmount = useSelector(
		(store) => store.todos.items.filter((item) => item.isCompleted).length
	);

	return (
		<>
			<p>
				{tasksAmount === 0 ? "" : `${isCompletedAmount}/${tasksAmount} done`}
			</p>
		</>
	);
};
