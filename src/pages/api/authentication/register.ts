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
	params.homelessnodeName = 'Homeless Nodes';

	const document = `[{"type":"block","id":"9d67707d-d70a-4b27-8aa1-e6efdaa900f5","children":[{"type":"p","id":"daf56f00-46e6-4f75-9114-25d6d6b87b6c","children":[{"text":"Hi! Jesse & Isabelle here, welcome to graphIQal!","bold":true},{"text":" "}]}]},{"type":"block","children":[{"type":"p","id":"d4e42f0d-14a5-4896-9295-e6842778ecf1","children":[{"text":""}]}],"id":"138dff5b-238b-4f3e-b75c-2daabeb038bf"},{"type":"block","children":[{"type":"p","id":"c9f286dc-2d49-4945-ab9c-7ca523e08c55","children":[{"text":"We hope graphIQal will improve your life, and we're so excited for you to join the community! "}]}],"id":"e3c2a7e7-c8ca-4bca-af72-e13609ddb3ae"},{"type":"block","children":[{"type":"p","id":"28318bfa-aa54-4a13-afa2-1991c8b0d383","children":[{"text":""}]}],"id":"a3df39e1-274c-4544-8dde-e994ba9f71f3"},{"type":"block","children":[{"type":"p","id":"b4e67215-d12c-4c50-acb8-29a47a381411","children":[{"text":"Give us your direct feedback and what you want, and we'll respond with a timeframe for incorporating it! ","bold":true}]}],"id":"01274b85-bae6-497e-a639-1267496f5ace"},{"type":"block","children":[{"type":"li","id":"2913aee2-31c5-4560-bf0f-0a55ee29229c","children":[{"text":"Link for that"}]}],"id":"15caf697-9948-4c2b-b2b3-80dfb29c4db1"},{"type":"block","children":[{"type":"p","id":"11de475f-c44b-43fc-8620-d7e329f89fb8","children":[{"text":""}]}],"id":"b80767fa-ce8b-472f-93b3-638345a57ca5"},{"type":"block","children":[{"type":"p","id":"fb0426be-6ae2-4f39-bf1c-13a43844de56","children":[{"text":"How do you use graphIQal? ","bold":true}]}],"id":"fd289304-aa57-42e7-b80e-ed1d7180cc2e"},{"type":"block","children":[{"type":"li","id":"c7ea7127-7d27-4274-adab-d525d44d1c6d","children":[{"text":"Link One"}]},{"type":"block","children":[{"type":"action_item","id":"d23cfd5c-0020-4da7-a441-996a0394433f","children":[{"text":"Add Linking to text lmao"}],"checked":false}],"id":"239c9018-3661-408a-aca4-309ede73a885"}],"id":"5fa04fea-d067-482e-9480-126f971ccd48"},{"type":"block","children":[{"type":"li","id":"1618021e-2bca-498f-a95b-3b922c4d6522","children":[{"text":"Link two "}]}],"id":"832bfe4b-b8dc-4512-8009-e5b330e7b14f"},{"type":"block","children":[{"type":"p","id":"75c7004b-5388-4c4b-aab2-d0b9e5f5dc04","children":[{"text":""}]}],"id":"4e5ce1cd-cfa0-434f-bd1e-45657c363c46"},{"type":"block","children":[{"type":"p","id":"a0f8ce52-0c3d-4452-8478-816f367143a8","children":[{"text":"Learn more about why we created graphIQal ","bold":true}]}],"id":"45a783c9-3353-4b03-aeed-87bee8d66e1f"},{"type":"block","children":[{"type":"li","id":"6db8f43c-7b70-45c3-835b-b9ee6000d2e4","children":[{"text":"Link one"}]}],"id":"87d52ecf-330a-42d6-9a99-225aabc07f12"},{"type":"block","children":[{"type":"li","id":"4ffc17d9-c4a0-4e5e-b917-4bd146c7a80f","children":[{"text":"Link two "}]}],"id":"08fb1175-90a3-4312-91e2-10a4bb09582a"},{"type":"block","children":[{"type":"p","id":"55a8a164-534c-423f-a1ed-2474d94349d8","children":[{"text":""}]}],"id":"9e674720-6025-4042-9c44-29f89b2d19af"},{"type":"block","children":[{"type":"p","id":"1e7115f0-5aaa-4e53-9684-fe6e6686b547","children":[{"text":"Give us feedback! ","bold":true}]}],"id":"cfb977b3-cd34-448f-bc4d-f56476150f2b"},{"type":"block","children":[{"type":"li","id":"cb4b8539-3a37-4035-8868-01db1094e515","children":[{"text":"Feedback Link"}]}],"id":"f96f059b-f72f-4c7a-8104-3dfc4635950e"},{"type":"block","children":[{"type":"li","id":"9cc02540-782a-4be6-9ce5-58120f4c2afa","children":[{"text":"Social Link "}]}],"id":"93354b60-80ce-49f0-ab4a-2ba052c624d4"},{"type":"block","children":[{"type":"li","id":"236f0ffc-281f-4bc0-bd30-712ae298d88e","children":[{"text":""}]}],"id":"72ad6efa-7839-499c-8cb1-c97c5f79cbb1"},{"type":"block","children":[{"type":"p","id":"b5bf6714-2a95-444d-b820-b94699e61b1a","children":[{"text":"","bold":true}]}],"id":"64719a39-2732-4ee2-aaa9-3b27a90d4799"},{"type":"block","children":[{"type":"p","id":"ab230c57-330a-4544-b575-189ef801d962","children":[{"text":""}]}],"id":"8551ec8e-1563-4f60-8bda-b2e175ddfcc0"}]`;
	params = { ...params, ...user, document };

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
	SET n.id = $homenodeId, n.document = $document
	MERGE (u)-[r:HAS]->(n)

	CREATE (h:Node {title: $homelessnodeName})
	SET h.id = $homelessnodeId
	MERGE (n)-[:RELATED]-(h)

	CREATE (f:Node {title: "Favourites"})
	SET f.id = $favouritesId, f.favourites = []
	MERGE (f)-[:HAS]->(n)
	MERGE (f)-[:HAS]->(h)
	
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
