import express from "express";

const app = express();

app.get("/", (req, resp) => {
	resp.send({
		message: "basic api success",
		success: true,
	});
});

app.listen(3100);
