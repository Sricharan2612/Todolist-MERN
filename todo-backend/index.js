import express from "express";
import { collectionName, connection } from "./dbconfig.js";
import cors from "cors";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.post("/signup", async (req, resp) => {
	const userData = req.body;

	if (userData.email && userData.password) {
		const db = await connection();
		const collection = db.collection("users");
		const result = await collection.insertOne(userData);

		if (result) {
			jwt.sign(userData, "Google", { expiresIn: "5d" }, (error, token) => {
				resp.send({
					message: "sign up successful",
					success: true,
					token,
				});
			});
		}
	} else {
		resp.send({
			message: "sign up unsuccessful",
			success: false,
		});
	}
});

app.post("/login", async (req, resp) => {
	const userData = req.body;

	if (userData.email && userData.password) {
		const db = await connection();
		const collection = db.collection("users");
		const result = await collection.findOne({
			email: userData.email,
			password: userData.password,
		});

		if (result) {
			jwt.sign(userData, "Google", { expiresIn: "5d" }, (error, token) => {
				resp.send({
					message: "Login Successful",
					success: true,
					token,
				});
			});
		} else {
			resp.send({
				message: "User not found",
				success: false,
			});
		}
	} else {
		resp.send({
			message: "login unsuccessful",
			success: false,
		});
	}
});

app.post("/add-task", async (req, resp) => {
	const db = await connection();
	const collection = db.collection(collectionName);
	const result = await collection.insertOne(req.body);

	if (result) {
		resp.send({
			message: "Task added successfully",
			success: true,
			result,
		});
	} else {
		resp.send({
			message: "Task Not Added",
			success: false,
			result,
		});
	}
});

app.get("/tasks", async (req, resp) => {
	const db = await connection();
	const collection = db.collection(collectionName);
	const result = await collection.find().toArray();

	if (result) {
		resp.send({
			message: "list fetched successfully",
			success: true,
			result,
		});
	} else {
		resp.send({
			message: "list fetching failed",
			success: false,
			result,
		});
	}
});
app.delete("/delete-task/:id", async (req, resp) => {
	const id = req.params.id;
	const db = await connection();
	const collection = db.collection(collectionName);
	// const deleteFilter = { _id: new ObjectId(id) };
	const result = await collection.deleteOne({ _id: new ObjectId(id) });

	if (result) {
		resp.send({
			message: "Task deleted successfully",
			success: true,
			result,
		});
	} else {
		resp.send({
			message: "Task not deleted",
			success: false,
			result,
		});
	}
});

app.delete("/delete-multiple", async (req, resp) => {
	const db = await connection();
	const collection = db.collection(collectionName);
	const ids = req.body;
	const deleteTaskIds = ids.map((item) => new ObjectId(item));
	// const deleteFilter = { _id: { $in: deleteTaskIds } };
	const result = await collection.deleteMany({ _id: { $in: deleteTaskIds } });

	if (result) {
		resp.send({
			message: "Tasks deleted successfully",
			success: true,
			result,
		});
	} else {
		resp.send({
			message: "Tasks not deleted",
			success: false,
			result,
		});
	}
});

app.get("/task/:id", async (req, resp) => {
	const db = await connection();
	const collection = db.collection(collectionName);
	const filter = { _id: new ObjectId(req.params.id) };
	const result = await collection.findOne(filter);

	if (result) {
		resp.send({
			message: "Task fetched successfully",
			success: true,
			result,
		});
	} else {
		resp.status(500).send({
			message: "Task not fetched",
			success: false,
			result,
		});
	}
});

app.patch("/update-task", async (req, resp) => {
	const db = await connection();
	const collection = db.collection(collectionName);
	const { _id, ...fields } = req.body;
	const filter = { _id: new ObjectId(_id) };
	const result = await collection.updateOne(filter, { $set: fields });

	if (result) {
		resp.send({
			message: "Task updated successfully",
			success: true,
			result,
		});
	} else {
		resp.status(500).send({
			message: "Task not updated",
			success: false,
			result,
		});
	}
});

app.listen(3100);
