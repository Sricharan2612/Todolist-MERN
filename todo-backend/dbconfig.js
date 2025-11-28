import { MongoClient } from "mongodb";

const url =
	"mongodb+srv://Sree:Sree%401234@cluster0.qj4ywnf.mongodb.net/?appName=Cluster0";
const dbName = "Todolist-MERN";
export const collectionName = "todos";
const client = new MongoClient(url);

export const connection = async () => {
	const connect = await client.connect();
	return await connect.db(dbName);
};
