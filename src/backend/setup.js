const neo4j = require('neo4j-driver');
// import neo4j from 'neo4j-driver';
require('dotenv').config();

// const driver = neo4j.driver(
// 	process.env.NEO4J_URI,
// 	neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
// );

let driver;

export async function initDriver(uri, username, password) {
	// TODO: Create an instance of the driver here
	driver = neo4j.driver(
		process.env.NEO4J_URI,
		neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
	);

	await driver.verifyConnectivity();

	return driver;
}

export function getDriver() {
	return driver;
}
