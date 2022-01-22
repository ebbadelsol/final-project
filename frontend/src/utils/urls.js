// To GET and POST tasks
export const TASK_URL = "http://localhost:8080/tasks";

// To Change (PATCH) och DELETE a task
export const TASK_ID_URL = (id) => `http://localhost:8080/tasks/${id}/`;

// To change completed from false to true (PATCH)
export const TASK_ID_COMPLETE_URL = (id) =>
	`http://localhost:8080/tasks/${id}/isCompleted`;
