const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool');


taskRouter.post('/task', (req, res) => {
	const newTask = req.body;
	let queryString = `INSERT INTO "ToDo" 
    ( "description") VALUES ( $1 )`;
	pool.query(queryString, [newTask.description, newTask.completed])
		.then((result) => {
			res.sendStatus(201);
		}).catch((err) => {
			console.log(err);
			res.sendStatus(500);
		});
});

taskRouter.get('/task', (req, res) => {
	let queryText = `SELECT * FROM "ToDO";`;
	pool.query(queryText)
		.then((result) => {
			console.log('Came back with the data from the Database.');
			res.send(200);
		}).catch((error) => {
			console.log(`Error GETTING the items from database, ${queryText}, Error: , ${error}`);
			res.sendStatus(500);
		});
});


module.exports = taskRouter;