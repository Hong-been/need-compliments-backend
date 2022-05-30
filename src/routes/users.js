import {Router} from "express";
import {User} from "../models/user";
import {Goal} from "../models/goal";
import {Task} from "../models/task";

const router = Router();

router.get("/:userid", async (req, res) => {
	try {
		const result = await User.findOneByUserId(req.params.userid);
		if (!result) {
			return res.status(404).json({succes: false, err: "User not found"});
		}
		res.json({user: result});
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/", async (req, res) => {
	try {
		const result = await User.create(req.body);
		return res.json({user: result});
	} catch (err) {
		if (err.name === "MongoServerError" && err.code === 11000) {
			console.log(err);
			return res.status(422).json({
				succes: false,
				message: `user already exists. : duplicate ${Object.keys(
					err.keyValue
				).join(",")}`,
			});
		}

		if (err.name === "ValidationError") {
			return res.status(400).json({succes: false, message: err.message});
		}

		res.status(500).send(err);
	}
});

router.delete("/:userid", async (req, res) => {
	try {
		const result = await User.deleteByUserId(req.params.userid);
		if (!result) {
			return res.status(404).json({succes: false, message: "user not found!"});
		}

		return res.sendStatus(200);
	} catch (err) {
		return res.status(500).json(err);
	}
});

router.get("/:userid/goals", async (req, res) => {
	try {
		const result = await Goal.findByUserId(req.params.userid);
		if (!result) {
			return res.status(404).json({succes: false, err: "User not found"});
		}
		res.json({goals: result});
	} catch (err) {
		res.status(500).send(err);
	}
});

export default router;
