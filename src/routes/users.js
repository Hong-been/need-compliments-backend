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
/*
628cec334f61762047e47a94,628cec43348bc0ed52244e18,628d05ba936b562b0b2b69ca,628d05be936b562b0b2b69cc,628d05bf936b562b0b2b69ce,628d05bf936b562b0b2b69d0,628d05c0936b562b0b2b69d2,628d05c1936b562b0b2b69d4,628d05c1936b562b0b2b69d6,628d05c2936b562b0b2b69d8,628d05c2936b562b0b2b69da,628d05c3936b562b0b2b69dc,628d05c3936b562b0b2b69de,628d05c4936b562b0b2b69e0,628d05c4936b562b0b2b69e2,628d05c5936b562b0b2b69e4,628d05c5936b562b0b2b69e6,628d05c6936b562b0b2b69e8,628d05c6936b562b0b2b69ea,628d05c7936b562b0b2b69ec,628d05c7936b562b0b2b69ee,628d05c8936b562b0b2b69f0,
*/

router.get("/:userid/tasks", async (req, res) => {
	try {
		const result = await Task.findByUserId(req.params.userid);
		if (!result) {
			return res.status(404).json({succes: false, err: "User not found"});
		}
		res.json({tasks: result});
	} catch (err) {
		res.status(500).send(err);
	}
});

export default router;
