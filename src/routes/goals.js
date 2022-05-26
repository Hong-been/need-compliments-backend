import {Router} from "express";
import {Goal} from "../models/goal";

const router = Router();

router.get("/:goalIds", async (req, res) => {
	try {
		const ids = req.params.goalIds.split(",");
		const result = await Goal.findByGoalIds(ids);
		if (!result) {
			return res.status(404).json({succes: false, err: "User not found"});
		}
		res.json({goals: result});
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/", async (req, res) => {
	try {
		const result = await Goal.create(req.body);
		res.set({
			"Content-Location": `goals/${result._id}`,
		});
		return res.json({goal: result});
	} catch (err) {
		if (err.name === "ValidationError") {
			return res.status(400).json({succes: false, message: err.message});
		}
		res.status(500).send(err);
	}
});

router.patch("/:goalid", async (req, res) => {
	try {
		const result = await Goal.patchByGoalId(req.params.goalid, req.body);
		if (!result) {
			return res.status(404).json({succes: false, message: "goal not found!"});
		}
		return res.json(result);
	} catch (err) {
		if (err.name === "CastError")
			return res
				.status(400)
				.json({succes: false, message: "goalId not valid for id type"});
		return res.status(500).json(err);
	}
});

router.delete("/:goalid", async (req, res) => {
	try {
		const result = await Goal.deleteByGoalId(req.params.goalid);
		if (!result) {
			return res.status(404).json({succes: false, message: "goal not found!"});
		}
		return res.sendStatus(200);
	} catch (err) {
		return res.status(500).json(err);
	}
});

export default router;
