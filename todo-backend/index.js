import express from "express";
import { collectionName, connection } from "./dbconfig.js";
import cors from "cors";
import { ObjectId } from "mongodb";
const app = express();

app.use(express.json());
app.use(cors());

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
	const id = req.body;
	const db = await connection();
	const collection = db.collection(collectionName);
	const deleteFilter = { _id: new ObjectId(id) };
	const deleteOPtions = req.body.ids
	const result = await collection.deleteMany(deleteFilter);

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

app.patch("/update-task/:id", async (req, resp) => {
	const db = await connection();
	const collection = db.collection(collectionName);
	const filter = { _id: new ObjectId(req.params.id) };
	const result = await collection.updateOne(filter, { $set: req.body });

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
