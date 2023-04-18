import neo4j from 'neo4j-driver';

/**
 * A singleton instance of the Neo4j Driver to be used across the app
 *
 * @type {neo4j.Driver}
 */
let driver;

/**
 * Initiate the Neo4j Driver
 *
 * @param {string} uri   The neo4j URI, eg. `neo4j://localhost:7687`
 * @param {string} username   The username to connect to Neo4j with, eg `neo4j`
 * @param {string} password   The password for the user
 * @returns {Promise<neo4j.Driver>}
 */
export async function initDriver(uri, username, password) {
	driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

	await driver.verifyConnectivity();

	return driver;
}

/**
 * Get the instance of the Neo4j Driver created in the
 * `initDriver` function
 *
 * @param {string} uri   The neo4j URI, eg. `neo4j://localhost:7687`
 * @param {string} username   The username to connect to Neo4j with, eg `neo4j`
 * @param {string} password   The password for the user
 * @returns {neo4j.Driver}
 */
export function getDriver() {
	return driver;
}

/**
 * If the driver has been instantiated, close it and all
 * remaining open sessions
 *
 * @returns {void}
 */
export async function closeDriver() {
	if (driver) {
		await driver.close();
	}
}
