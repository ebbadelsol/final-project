import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import bcrypt from 'bcrypt';
// import crypto from 'crypto';
import listEndpoints from "express-list-endpoints";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

const TaskSchema = new mongoose.Schema({
	taskname: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 140,
		trim: true,
		// unique: true,
	},
	description: {
		type: String,
		minlength: 5,
		maxlength: 10,
		trim: true, // trim checks if there is whitespaces in the beginning or end of the string and removes it
	},
	completed: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Number,
		default: Date.now,
	},
});

const Task = mongoose.model("Task", TaskSchema);

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
	res.send(listEndpoints(app));
});

app.get("/tasks", async (req, res) => {
	const tasks = await Task.find().sort({ createdAt: "desc" }).limit(20);
	res.status(200).json({ response: tasks, success: true });
});

app.post("/tasks", async (req, res) => {
	const { message } = req.body;

	try {
		const newTask = await new Task({ message }).save();
		res.status(201).json({ response: newTask, success: true });
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

app.post("/tasks/:id/isCompleted", async (req, res) => {
	const { id } = req.params;

	try {
		const updatedTask = await Task.findByIdAndUpdate(id, {
			completed: true,
		});
		res.status(200).json({ response: updatedTask, success: true });
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

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

app.patch("/tasks/:id", async (req, res) => {
	const { id } = req.params;
	const { message } = req.body;

	try {
		const updatedTask = await Task.findOneAndUpdate(
			{ _id: id },
			{ taskname },
			{ description },
			{ new: true }
		);
		if (updatedTask) {
			res.status(200).json({ response: updatedTask, success: true });
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
