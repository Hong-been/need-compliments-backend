import {Router} from "express";
import {Compliment} from "../models/compliment";

const router = Router();

router.post("/", async (req, res) => {
	try {
		const result = await Compliment.create(req.body);
		res.set({
			"Content-Location": `compliments/${result._id}`,
		});
		return res.json({compliment: result});
	} catch (err) {
		if (err.name === "ValidationError") {
			return res.status(400).json({succes: false, message: err.message});
		}
		res.status(500).send(err);
	}
});

router.delete("/:complimentid", async (req, res) => {
	try {
		const result = await Compliment.deleteByComplimentId(req.params.goalid);
		if (!result) {
			return res
				.status(404)
				.json({succes: false, message: "compliment not found!"});
		}
		return res.sendStatus(200);
	} catch (err) {
		return res.status(500).json(err);
	}
});

export default router;
