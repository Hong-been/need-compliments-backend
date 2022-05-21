import {Router} from "express";
import {User} from "models/user";

// Find All
Router.get("/", (req, res) => {
	Todo.findAll()
		.then((todos) => {
			if (!todos.length) return res.status(404).send({err: "Todo not found"});
			res.send(`find successfully: ${todos}`);
		})
		.catch((err) => res.status(500).send(err));
});

// Find One by todoid
Router.get("/todoid/:todoid", (req, res) => {
	Todo.findOneByTodoid(req.params.todoid)
		.then((todo) => {
			if (!todo) return res.status(404).send({err: "Todo not found"});
			res.send(`findOne successfully: ${todo}`);
		})
		.catch((err) => res.status(500).send(err));
});

// Create new todo document
Router.post("/", (req, res) => {
	Todo.create(req.body)
		.then((todo) => res.send(todo))
		.catch((err) => res.status(500).send(err));
});

// Update by todoid
Router.put("/todoid/:todoid", (req, res) => {
	Todo.updateByTodoid(req.params.todoid, req.body)
		.then((todo) => res.send(todo))
		.catch((err) => res.status(500).send(err));
});

// Delete by todoid
Router.delete("/todoid/:todoid", (req, res) => {
	Todo.deleteByTodoid(req.params.todoid)
		.then(() => res.sendStatus(200))
		.catch((err) => res.status(500).send(err));
});

module.exports = Router;
