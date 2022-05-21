import {Router} from "express";
import {User} from "../models/user";

const router = Router();

router.get("/userid/:userid", (req, res) => {
	User.findOneByUserId(req.params.userid)
		.then((user) => {
			if (!user)
				return res.status(404).send({succes: false, err: "User not found"});
			res.send(`findOne successfully: ${user}`);
		})
		.catch((err) => res.status(500).send(err));
});

router.post("/", async (req, res) => {
	try {
		const result = await User.create(req.body);
		res.sendStatus(200);
	} catch (err) {
		if (err.name === "MongoServerError" && err.code === 11000) {
			console.log(err);
			res.status(422).send({
				succes: false,
				message: `user already exists. : duplicate ${Object.keys(
					err.keyValue
				).join(",")}`,
			});
		} else if (err.name === "ValidationError") {
			res.status(400).send({succes: false, message: err.message});
		} else {
			res.status(500).send(err);
		}
	}
});

router.delete("/userid/:userid", async (req, res) => {
	try {
		const result = await User.deleteByUserId(req.params.userid);
		if (!result) {
			res.status(404).send({succes: false, message: "user not found!"});
		} else res.sendStatus(200);
	} catch (err) {
		res.status(500).send(err);
	}
});

export default router;
