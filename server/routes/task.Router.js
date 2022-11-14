const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool({
	database: 'tasks', //name of database
	host: 'localhost', //Where is database
	port: 5432, //default for Postgres
	max: 10, //max query at one time
	idleTimeoutMillis: 30000 //30 seconds to try to connect; else cancel query
})

// console.log on connection of pool
pool.on('connect', () => {
	console.log('PostSQL is connected!');
})

pool.on('error', (error) => {
	console.log('Error with Postgres pool', error);
})

module.exports = pool;