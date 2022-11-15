### For New Projects Setup: 
	npm init --yes 
	npm install express body-parser nodemon
	* nodemon : is a server refresher, like live server whenever there is new updated files.

	"start" : nodemon server/server.js

	###Folder Structures: 

	new folder, public/index.html will create a file within that folder all in one shot. 

CREATE TABLE "TODO" (
	id SERIAL PRIMARY KEY, 
	title VARCHAR NOt NULL,
	Complete BOOLEAN DEFAULT FALSE NOT NULL
);

GET / todo [RESPONSE]
{
	** Get all the items from the DataBase **
	id: 1,
	description: "blah",
	isComplete: "true"
}

POST / Todo [REQUEST]
{
	description: " blah "
}

PUT /Todo/id  [REQUEST]
{
	isComplete: true
}

DELETE /todo/id 
{
	id: 1
}

### Make Sure to have a router for every nouns created

