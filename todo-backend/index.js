import express from "express";
import { collectionName, connection } from "./dbconfig.js";
import cors from "cors";
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

app.listen(3100);
