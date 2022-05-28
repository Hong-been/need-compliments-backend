import {Router} from "express";
import {Task} from "../models/task";
import {Compliment} from "../models/compliment";
import {Goal} from "../models/goal";

const router = Router();

router.get("/", async (req, res) => {
	const LIMIT = 20;
	const page = req.query.page || 1;
	const offset = (page - 1) * LIMIT;
	const combined = req.query.combined || "false";
	const readPermission = req.query.readPermission;
	if (
		readPermission !== "everyone" &&
		readPermission !== "me" &&
		readPermission !== "none"
	) {
		return res
			.status(400)
			.json({succes: false, err: `${readPermission} not matched`});
	}

	try {
		const tasks = await Task.findReadPermissionTasks(
			readPermission,
			LIMIT,
			offset
		);
		if (!tasks) {
			return res
				.status(404)
				.json({succes: false, err: `${readPermission} tasks not found!`});
		}
		if (combined !== "true") {
			res.json({tasks});
			return;
		}

		const goalIds = Array.from(new Set(tasks.map((task) => task.goal)));
		const taskIds = tasks.map((task) => task._id);

		// 두개 병렬로 진행하도록?
		const goals = await Goal.findByGoalIds(goalIds);
		const taskIdAndComplimentsMap = await Compliment.findByTaskIds(taskIds);

		// 둘다끝나면 조합시키기
		const response = tasks.map((task) => {
			const goal =
				goals.find((goal) => goal._id.toString() === task.goal) || null;

			return {
				_id: task._id,
				title: task.title,
				goal: task.goal,
				goalData: goal,
				author: task.author,
				readPermission: task.readPermission,
				doneAt: task.doneAt,
				createdAt: task.createdAt,
				updatedAt: task.updatedAt,
				compliments: taskIdAndComplimentsMap[task._id],
			};
		});

		res.json({tasks: response});
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
		res.json(result);
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
		console.log(result);
		if (!result) {
			return res.status(404).json({succes: false, message: "task not found!"});
		}
		return res.json(result);
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
