// To GET and POST tasks
export const API_URL = "http://localhost:8080/tasks";

// To Change (PATCH) och DELETE a task
export const URL_ID = (id) => `http://localhost:8080/tasks/${id}/`;

// To change completed from false to true (PATCH)
export const URL_ID_COMPLETE = (id) =>
	`http://localhost:8080/tasks/${id}/isCompleted`;
