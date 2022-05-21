import {Router} from "express";
import {User} from "models/user";

// Find One by userid
Router.get("/userid/:userid", (req, res) => {
	User.findOneByUserId(req.params.userId)
		.then((user) => {
			if (!user) return res.status(404).send({err: "User not found"});
			res.send(`findOne successfully: ${user}`);
		})
		.catch((err) => res.status(500).send(err));
});

// Create new user
Router.post("/", (req, res) => {
	User.create(req.body)
		.then((user) => res.send(user))
		.catch((err) => res.status(500).send(err));
});

// Delete by userid
Router.delete("/userid/:userid", (req, res) => {
	User.deleteByuserid(req.params.userid)
		.then(() => res.sendStatus(200))
		.catch((err) => res.status(500).send(err));
});

export default Router;
