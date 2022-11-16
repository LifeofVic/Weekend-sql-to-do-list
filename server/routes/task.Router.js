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

taskRouter.delete('/task/:id', (req, res) => {
	const id = req.params.id
	console.log('DELETING the selected Task.');
	const queryText = `DELETE FROM "todo" WHERE "id" = $1;`
	pool.query(queryText, [id])
		.then((result) => {
			console.log('Task has been deleted from the database');
			res.sendStatus(200);
		}).catch((error) => {
			console.log(`We have encountered an error..., ${queryText}, error: ${error}`);
			res.sendStatus(500);
		});
})

taskRouter.put('/task/:id', (req, res) => {
	let id = req.params.id;
	console.log('Updating the status of task.');
	let queryText = `UPDATE "todo" SET "IsComplete" = 'true' WHERE "id" = $1;`;
	pool.query(queryText, [id])
		.then(() => {
			console.log('Updated ${id} with the new status, ${id}');
			res.sendStatus(200);
		}).catch((error) => {
			console.log('Error in router.put : ', error);
			res.sendStatus(500);
		});
})




module.exports = taskRouter;