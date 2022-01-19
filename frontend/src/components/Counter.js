import React from "react";
import { useSelector } from "react-redux";

export const Counter = () => {
	const todosAmount = useSelector((store) => store.todos.items.length);
	const completedAmount = useSelector(
		(store) => store.todos.items.filter((item) => item.isComplete).length
	);

	return (
		<>
			<p>{todosAmount === 0 ? "" : `${completedAmount}/${todosAmount} done`}</p>
		</>
	);
};
