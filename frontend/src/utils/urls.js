// To GET and POST tasks
export const API_URL = "http://localhost:8080/tasks";

// To Change (PATCH) och DELETE a task
export const URL_ID = (taskId) => `http://localhost:8080/tasks/${taskId}/`;

// To change completed from false to true (PATCH)
export const URL_ID_COMPLETE = (taskId) =>
	`http://localhost:8080/tasks/${taskId}/isCompleted`;
