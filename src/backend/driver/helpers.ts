import { ManagedTransaction, Record } from 'neo4j-driver';
import { getDriver } from './neo4j';
import neo4j from 'neo4j-driver';
require('dotenv').config();

const NEO4J_URI = process.env.NEO4J_URI || '';
const NEO4J_USER = process.env.NEO4J_USER || '';
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || '';

// lib/neo4j.js
export const driver = neo4j.driver(
	NEO4J_URI,
	neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD),
	{ disableLosslessIntegers: true }
);

export async function read(cypher: string, params = {}) {
	// 1. Open a sessionxX
	// const driver = getDriver();
	const session = driver.session();

	try {
		// 2. Execute a Cypher Statement
		const res = await session.executeRead((tx: ManagedTransaction) =>
			tx.run(cypher, params)
		);

		// 3. Process the Results
		const values = res.records.map((record: Record) => record.toObject());

		return values;
	} catch (e) {
		return { e, err: true };
	} finally {
		// 4. Close the session
		await session.close();
	}
}

export async function write(cypher: string, params = {}) {
	// 1. Open a session
	// const driver = getDriver();
	const session = driver.session();

	try {
		// 2. Execute a Cypher Statement
		const res = await session.executeWrite((tx: ManagedTransaction) =>
			tx.run(cypher, params)
		);

		// 3. Process the Results
		const values = res.records.map((record: Record) => record.toObject());

		return values;
	} catch (e) {
		return { e, err: true };
	} finally {
		// 4. Close the session
		await session.close();
	}
}

export async function read_subscribe(cypher: string, params = {}) {
	// 1. Open a sessionxX
	// const driver = getDriver();
	const session = driver.session();

	try {
		// 2. Execute a Cypher Statement
		const res = await session.executeRead((tx: ManagedTransaction) =>
			tx.run(cypher, params).subscribe({
				onKeys: (keys) => {
					console.log(keys);
				},
				onNext: (record) => {
					console.log(record);
					return record;
				},
				onCompleted: (summary) => {
					session.close();
				},
			})
		);
	} catch (e) {
		return { e, err: true };
	} finally {
		// 4. Close the session
		await session.close();
	}
}
