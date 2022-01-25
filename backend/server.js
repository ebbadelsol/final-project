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
		maxlength: 50,
		trim: true,
		unique: true,
	},
	category: {
		type: String,
		minlength: 4,
		maxlength: 25,
		trim: true,
		// enum: [
		// 	"Home",
		// 	"Work",
		// 	"Study",
		// 	"Travel",
		// 	"Shopping",
		// 	"Food",
		// 	"Music",
		// 	"Other",
		// 	"Custom made",
		// ],
		default: "Other",
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

const Task = mongoose.model("Task", TaskSchema);

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

/************************** POST **************************/

app.post("/tasks", async (req, res) => {
	const { taskName, category, deadline } = req.body;

	try {
		const newTask = await new Task({ taskName, category, deadline }).save();
		res.status(201).json({ response: newTask, success: true });
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

/************************** PATCH **************************/

app.patch("/tasks/:id/isCompleted", async (req, res) => {
	const { id } = req.params;
	const { isCompleted } = req.body;

	try {
		const updatedIsCompleted = await Task.findOneAndUpdate(
			{ _id: id },
			{ isCompleted },
			{ new: true }
		);
		res.status(200).json({ response: updatedIsCompleted, success: true });
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

// PATCH: Updating taskName, category or deadline or all
app.patch("/tasks/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const updatedTask = await Task.findOneAndUpdate({ _id: id }, req.body, {
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

app.delete("/tasks/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const deletedTask = await Task.findOneAndDelete({ _id: id });
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
