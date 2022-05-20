import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import bodyParser from "body-parser";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log(`✅ Connected to DB`))
	.catch((e) => console.log(`❌ Error on DB connection: ${e}`));

console.log("app.js!!!");
app.listen(PORT, () => {
	console.log(`Example App listening on port ${PORT}`);
});
