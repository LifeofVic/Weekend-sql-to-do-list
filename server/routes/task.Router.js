const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool');

//router to inject the sql to the database in order to add daa from the client side to the data base with the values from the the input fields.
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
//This will go to the database and retrieve all the objects in the database and pass it to the render in order to display accordingly to the DOM.
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

//This will utilize the id value created by the database to remove that object based on the id value of where the delete button was clicked on.
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
//This will allow to update the property of "IsComplete" to true in order to be able to utilize the css styling to change the background color to green wherever the table row is displayed on the DOM.
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