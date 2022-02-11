import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import listEndpoints from "express-list-endpoints";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/taskAPI";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

/************************** Schemas **************************/

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		minlength: 4,
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 7,
	},
	accessToken: {
		type: String,
		default: () => crypto.randomBytes(128).toString("hex"),
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

const TaskSchema = new mongoose.Schema({
	taskName: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 40,
		trim: true,
		unique: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
	},
	deadline: {
		type: Date,
		default: Date.now,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	isCompleted: {
		type: Boolean,
		default: false,
	},
});

/************************** Models **************************/

const User = mongoose.model("User", UserSchema);
const Category = mongoose.model("Category", CategorySchema);
const Task = mongoose.model("Task", TaskSchema);

/********** Middlewares to enable cors and json body parsing **********/

app.use(cors());

app.use(express.json());

/************************** Authenticate User **************************/

const authenticateUser = async (req, res, next) => {
	const accessToken = req.header("Authorization");

	try {
		const user = await User.findOne({ accessToken });
		if (user) {
			next();
		} else {
			res.status(401).json({ response: "Please, log in", success: false });
		}
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
};

/************************** Routes **************************/

app.get("/", (res) => {
	res.send(listEndpoints(app)); // Delete listEndpoints?
});

/************************** POST **************************/

app.post("/signup", async (req, res) => {
	const { username, password } = req.body;

	try {
		const salt = bcrypt.genSaltSync();
		if (password.length < 7) {
			throw "Password must be at least 7 characters long";
		}
		if (!username) {
			throw "Please enter a username";
		}
		if (username.unique === false) {
			throw "Username is not available";
		}

		const newUser = await new User({
			username,
			password: bcrypt.hashSync(password, salt),
		}).save();

		res.status(201).json({
			response: {
				userId: newUser._id,
				username: newUser.username,
				accessToken: newUser.accessToken,
			},
			success: true,
		});
	} catch (error) {
		res
			.status(400)
			.json({ message: "Invalid request", response: error, success: false });
	}
});

app.post("/signin", async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });

		if (user && bcrypt.compareSync(password, user.password)) {
			res.status(200).json({
				response: {
					userId: user._id,
					username: user.username,
					accessToken: user.accessToken,
				},
				success: true,
			});
		} else {
			res.status(404).json({
				response: "Username or password is incorrect or doesn't match",
				success: false,
			});
		}
	} catch (error) {
		res
			.status(400)
			.json({ message: "Invalid request", response: error, success: false });
	}
});

app.post("/tasks", authenticateUser);
app.post("/tasks", async (req, res) => {
	const { taskName, categoryId, deadline, userId } = req.body;
	try {
		const queriedCategory = await Category.findById(categoryId);
		const queriedUser = await User.findById(userId);
		const newTask = await new Task({
			taskName,
			category: queriedCategory,
			deadline,
			user: queriedUser,
		}).save();
		res.status(201).json({ response: newTask, success: true });
	} catch (error) {
		res
			.status(400)
			.json({ message: "Invalid request", response: error, success: false });
	}
});

app.post("/category", async (req, res) => {
	const { categoryName } = req.body;
	try {
		const newCategory = await new Category({ categoryName }).save();
		res.status(201).json({ response: newCategory, success: true });
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

/************************** GET **************************/

app.get("/tasks/:userId", authenticateUser);
app.get("/tasks/:userId", async (req, res) => {
	const { userId } = req.params;

	try {
		const tasks = await Task.find({ user: userId })
			.populate("category")
			.sort({ deadline: "asc" });
		res.status(200).json({ response: tasks, success: true });
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

app.get("/category", async (req, res) => {
	try {
		const category = await Category.find();
		res.status(200).json({ response: category, success: true });
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

app.patch("/tasks/:taskId", authenticateUser);
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
		res.status(400).json({
			message: "Could not update task",
			response: error,
			success: false,
		});
	}
});

/************************** DELETE **************************/

app.delete("/tasks/:taskId", authenticateUser);
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
		res.status(400).json({
			message: "Could not delete task",
			response: error,
			success: false,
		});
	}
});

// Start the server
app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`Server running on http://localhost:${port}`);
});
