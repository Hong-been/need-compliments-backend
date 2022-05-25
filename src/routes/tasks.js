import {Router} from "express";
import {Task} from "../models/task";
import {Compliment} from "../models/compliment";

const router = Router();

router.get("/public", async (req, res) => {
	const LIMIT = 20;
	const page = req.query.page || 1;
	const offset = (page - 1) * LIMIT;

	try {
		const result = await Task.findPublicTasks(LIMIT, offset);
		if (!result) {
			return res
				.status(404)
				.json({succes: false, err: `public tasks not found!`});
		}
		res.json({tasks: result});
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/:taskIds/compliments", async (req, res) => {
	try {
		const ids = req.params.taskIds.split(",");
		const result = await Compliment.findByTaskIds(ids);
		if (!result) {
			return res.status(404).json({succes: false, err: "User not found"});
		}
		res.json({compliments: result});
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/", async (req, res) => {
	try {
		const result = await Task.create(req.body);
		res.set({
			"Content-Location": `tasks/${result._id}`,
		});
		return res.json({task: result});
	} catch (err) {
		if (err.name === "ValidationError") {
			return res.status(400).json({succes: false, message: err.message});
		}
		res.status(500).send(err);
	}
});

router.patch("/:taskid", async (req, res) => {
	try {
		const result = await Task.patchByTaskId(req.params.taskid, req.body);
		if (!result) {
			return res.status(404).json({succes: false, message: "task not found!"});
		}
		return res.sendStatus(200);
	} catch (err) {
		if (err.name === "CastError")
			return res
				.status(400)
				.json({succes: false, message: "taskId not valid for id type"});
		return res.status(500).json(err);
	}
});

router.delete("/:taskid", async (req, res) => {
	try {
		const result = await Task.deleteByTaskId(req.params.taskid);
		if (!result) {
			return res.status(404).json({succes: false, message: "task not found!"});
		}
		return res.sendStatus(200);
	} catch (err) {
		return res.status(500).json(err);
	}
});

export default router;
