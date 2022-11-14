const express = require('express');
const pool = require('../modules/pool');
const taskRouter = express.Router();

taskRouter.post('/task', (req, res) => {
	console.log('/task POST', req.body);
	let queryString = `INSERT INTO "ToDo" 
    ( "description") VALUES ( $1 )`;
	pool.query(queryString, [req.body.description, req.body.completed]).then((result) => {
		res.sendStatus(201);
	}).catch((err) => {
		console.log(err);
		res.sendStatus(500);
	});
});