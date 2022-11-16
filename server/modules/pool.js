const pg = require('pg');
let pool;

// When our app is deployed to the internet 
// we'll use the DATABASE_URL environment variable
// to set the connection info: web address, username/password, db name
// eg: 
// DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/prime_app
if (process.env.DATABASE_URL) {
	pool = new pg.Pool({
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false
		}
	});
}
// When we're running this app on our own computer
// we'll connect to the postgres database that is 
// also running on our computer (localhost)
else {
	pool = new pg.Pool({
		host: 'localhost',
		port: 5432,
		database: 'tasks',
		max: 10, //max query at one time
		idleTimeoutMillis: 30000 //30 seconds to try to connect; else cancel query
	});
}

// new Pool({
// 	database: 'tasks', //name of database
// 	host: 'localhost', //Where is database
// 	port: 5432, //default for Postgres
// 	max: 10, //max query at one time
// 	idleTimeoutMillis: 30000 //30 seconds to try to connect; else cancel query
// });

//console.log on connection of pool
pool.on('connect', () => {
	console.log('PostSQL is connected!');
});

pool.on('error', (error) => {
	console.log('Error with Postgres pool', error);
});

module.exports = pool;