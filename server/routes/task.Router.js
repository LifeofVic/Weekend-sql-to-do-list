const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool');


taskRouter.post('/task', (req, res) => {
	const newTask = req.body;
	let queryString = `INSERT INTO "ToDo" 
    ( "description") VALUES ( $1 )`;
	pool.query(queryString, [newTask.description, newTask.completed]).then((result) => {
		res.sendStatus(201);
	}).catch((err) => {
		console.log(err);
		res.sendStatus(500);
	});
});


module.exports = taskRouter;