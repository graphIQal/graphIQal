import type { NextApiRequest, NextApiResponse } from 'next';
import { write } from '../../../backend/driver/helpers';
// import { write } from '../../../src/backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let params = req.query;

	// params.homelessnodeId = crypto.randomUUID();
	// params.homenodeId = crypto.randomUUID();

	// params.hometitle = params.name ? params.name + "'s Home Node" : 'Home Node';
	// params.homelesstitle = params.name
	// 	? params.name + "'s Homeless Nodes"
	// 	: 'Homeless Node';

	const homelessnodeId = crypto.randomUUID();
	const homenodeId = crypto.randomUUID();
	const favouritesId = crypto.randomUUID();

	const user = {
		id: crypto.randomUUID(),
		name: params.name,
		email: params.email,
		password: params.password,
		homenodeId,
		homelessnodeId,
		favouritesId,
	};

	params.homenodeName = user.name ? user.name + "'s Home Node" : 'Home Node';
	params.homelessnodeName = user.name
		? user.name + "'s Homeless Nodes"
		: 'Homeless Node';

	params = { ...params, ...user };

	// Add Hash for password
	const cypher = `
	MERGE (u:User {
		id: $id,
		email: $email,
		password: $password,
		name: $name,
		homenodeId : $homenodeId,
		homelessnodeId: $homelessnodeId,
		favourites: []
	})

	CREATE (n:Node {title: $homenodeName})
	SET n.id = $homenodeId
	MERGE (u)-[r:HAS]->(n)

	CREATE (h:Node {title: $homelessnodeName})
	SET h.id = $homelessnodeId
	MERGE (n)-[:RELATED]-(h)

	CREATE (f:Node {title: "Favourites"})
	SET f.id = $favouritesId, f.favourites = []
	MERGE (n)-[:RELATED]-(f)
	
	MERGE (b:BLOCK_ELEMENT {type: "block", id: randomUuid()})
	MERGE (n)-[:NEXT_BLOCK]->(b)

	MERGE (p:BLOCK_INLINE {type: "p", id: randomUuid(), children: ["{text: ''}"]})
	MERGE (b)-[:BLOCK_CHILD]->(p)

	MERGE (g:GRAPH_VIEW {title: "Graph View"})<-[:VIEW]-(n)
	ON CREATE SET g.id = randomUuid()
	RETURN u, n, b
	`;

	const result: any = await write(cypher as string, params);

	// res.status(200).json({ ...result, ...params, cypher });
	res.status(200).json(result);
}
