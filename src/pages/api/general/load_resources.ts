import type { NextApiRequest, NextApiResponse } from 'next';
import { write } from '../../../backend/driver/helpers';
import { mergeNodeCypher } from '../../../backend/cypher-generation/cypherGenerators';
import { thirteenthirtytwojson } from '../../../backend/cypher-generation/temp_1332resources_json';
// import { write } from '../../../src/backend/driver/helpers';

type resource_json = {
	[key: string]: { name?: string; url?: string; title?: string }[];
};

export const loadResources = (json: any) => {
	const layer = json;
	while (layer) {}
};

// Object.keys(myEmptyObj).length === 0

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const json: resource_json = thirteenthirtytwojson;

	// let cypher = `
	// CALL apoc.load.json("file:///person.json")
	// YIELD value
	// MERGE (p:Person {name: value.name})
	// SET p.age = value.age
	// WITH p, value
	// UNWIND value.children AS child
	// MERGE (c:Person {name: child})
	// MERGE (c)-[:CHILD_OF]->(p);
	// `

	let index = 0;
	let cypher = ``;
	const id = '8d2d4dbc-d530-417b-8054-b69288e0f953';

	const promises: Promise<unknown>[] = [];
	// const promises: string[] = [];

	for (const key in json) {
		const array = json[key];

		cypher = mergeNodeCypher({
			properties: { title: key },
			connections: [
				{
					// Write home-node id
					connectionNodeProperties: {
						id: id,
					},
					type: 'HAS',
					direction_away: false,
				},
			],
		});

		// for batching uploads
		index++;
		if (index < 25) continue;
		if (index > 50) break;

		// promises.push(cypher);
		const categoryNode = await write(cypher as string);

		for (const i in array) {
			if (Object.keys(array[i]).length > 0) {
				if (array[i].name) {
					array[i].title = array[i].name;
					delete array[i].name;
				}
				cypher = mergeNodeCypher({
					properties: array[i],
					connections: [
						{
							connectionNodeProperties: { title: key },
							type: 'HAS',
							direction_away: false,
						},
					],
				});
				promises.push(write(cypher as string));
				// promises.push(cypher);
				// index++;
			}

			// if (index > 1000) {
			// 	res.status(200).json({ promises: promises });
			// 	return;
			// }
		}
	}

	await Promise.all(promises);

	res.status(200).json({ promises: promises });
}
