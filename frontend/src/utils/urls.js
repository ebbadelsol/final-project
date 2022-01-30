// To GET and POST tasks
export const TASK_URL = "http://localhost:8080/tasks";

// To GET and POST categories
export const CATEGORY_URL = "http://localhost:8080/category";

// To Change (PATCH) and DELETE a task. Or GET a specific category.
export const TASK_ID_URL = (id) => `http://localhost:8080/tasks/${id}/`;

// To change isCompleted from false to true (PATCH)
export const TASK_ID_COMPLETE_URL = (id) =>
	`http://localhost:8080/tasks/${id}/isCompleted`;
