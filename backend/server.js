import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import bcrypt from 'bcrypt';
// import crypto from 'crypto';
import listEndpoints from "express-list-endpoints";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/taskAPI";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

const TaskSchema = new mongoose.Schema({
	taskName: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 40,
		trim: true,
		unique: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
	},
	deadline: {
		type: Date,
		default: Date.now,
	},
	isCompleted: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const CategorySchema = new mongoose.Schema({
	categoryName: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 40,
		trim: true,
		unique: true,
	},
});

const Task = mongoose.model("Task", TaskSchema);

const Category = mongoose.model("Category", CategorySchema);

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (res) => {
	res.send(listEndpoints(app));
});

/************************** GET **************************/

app.get("/tasks", async (req, res) => {
	try {
		const tasks = await Task.find().sort({ createdAt: "desc" });
		res.status(200).json({ response: tasks, success: true });
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

app.get("/tasks/:categoryId", async (req, res) => {
	const { categoryId } = req.params;
	try {
		const tasks = await Task.findById(categoryId).populate("category");
		res.status(200).json({ response: tasks, success: true });
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

/************************** POST **************************/

app.post("/category", async (req, res) => {
	const { categoryName } = req.body;

	try {
		const newCategory = await new Category({ categoryName }).save();
		res.status(201).json({ response: newCategory, success: true });
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

app.post("/tasks", async (req, res) => {
	const { taskName, categoryId, deadline } = req.body;

	try {
		const queriedCategory = await Category.findById(categoryId);
		const newTask = await new Task({
			taskName,
			category: queriedCategory,
			deadline,
		}).save();
		res.status(201).json({ response: newTask, success: true });
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

/************************** PATCH **************************/

app.patch("/tasks/:taskId/isCompleted", async (req, res) => {
	const { taskId } = req.params;
	const { isCompleted } = req.body;

	try {
		const updatedIsCompleted = await Task.findOneAndUpdate(
			{ _id: taskId },
			{ isCompleted },
			{ new: true }
		);
		res.status(200).json({ response: updatedIsCompleted, success: true });
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

// PATCH: Updating taskName, (category?) or deadline or all
app.patch("/tasks/:taskId", async (req, res) => {
	const { taskId } = req.params;
	try {
		const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
			new: true,
		});
		if (updatedTask) {
			res.status(200).json({ response: updatedTask, success: true });
		} else {
			res.status(404).json({ response: "Task not found", success: false });
		}
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

/************************** DELETE **************************/

app.delete("/tasks/:taskId", async (req, res) => {
	const { taskId } = req.params;

	try {
		const deletedTask = await Task.findOneAndDelete({ _id: taskId });
		if (deletedTask) {
			res.status(200).json({ response: deletedTask, success: true });
		} else {
			res.status(404).json({ response: "Task not found", success: false });
		}
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

// Start the server
app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`Server running on http://localhost:${port}`);
});
