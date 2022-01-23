import React from "react";
import { useSelector } from "react-redux";

export const Counter = () => {
	const todosAmount = useSelector((store) => store.todos.items.length);
	const isCompletedAmount = useSelector(
		(store) => store.todos.items.filter((item) => item.isCompleted).length
	);

	return (
		<>
			<p>
				{todosAmount === 0 ? "" : `${isCompletedAmount}/${todosAmount} done`}
			</p>
		</>
	);
};
