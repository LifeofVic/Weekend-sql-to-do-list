const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool');


taskRouter.post('/task', (req, res) => {
	const newTask = req.body;
	let queryString = `INSERT INTO "todo" 
    ( "description") VALUES ( $1 );`;
	pool.query(queryString, [newTask.description])
		.then((result) => {
			res.sendStatus(201);
		}).catch((err) => {
			console.log(err);
			res.sendStatus(500);
		});
});

taskRouter.get('/task', (req, res) => {
	let queryText = `SELECT * FROM "todo";`;
	pool.query(queryText)
		.then((result) => {
			console.log('Came back with the data from the Database.');
			res.send(result.rows);
		}).catch((error) => {
			console.log(`Error GETTING the items from database, ${queryText}, Error: , ${error}`);
			res.sendStatus(500);
		});
});

taskRouter.delete('/:id', (req, res) => {
	let queryText = `DELETE FROM "todo" WHERE "id" = $1;`
	pool.query(queryText, [req.params.id])
		.then((result) => {
			res.sendStatus(200);
		}).catch((error) => {
			console.log(error);
			res.sendStatus(500);
		})
})

module.exports = taskRouter;