import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import users from "./routes/users";
import goals from "./routes/goals";
import tasks from "./routes/tasks";
import compliments from "./routes/compliments";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/users", users);
app.use("/goals", goals);
app.use("/tasks", tasks);
app.use("/compliments", compliments);

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log(`✅ Connected to DB`))
	.catch((e) => console.log(`❌ Error on DB connection: ${e}`));

app.listen(PORT, () => {
	console.log(`Example App listening on port ${PORT}`);
});
