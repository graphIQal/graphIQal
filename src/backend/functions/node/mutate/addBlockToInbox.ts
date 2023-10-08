import { MyBlockElement, MyNodeElement } from '@/packages/editor/plateTypes';

type addBlockToInboxInput = {
	nodeId: string;
	block: MyBlockElement | MyNodeElement;
	nodeTitle: string;
	icon: string;
	originNodeId: string;
};

export const addBlockToInbox = async ({
	nodeId,
	block,
	nodeTitle,
	icon,
	originNodeId,
}: addBlockToInboxInput) => {
	let body = ``;

	block.sentMetadata = {
		icon: icon,
		title: nodeTitle,
		timestamp: Date.now(),
		id: originNodeId,
	};

	// Hey
	body += `
	MATCH (n:Node {id: "${nodeId}"})
	SET n.inbox = apoc.convert.toJson([ $children ] + coalesce(apoc.convert.fromJsonList(n.inbox), []))
	RETURN n
	`;

	// THIS IS THE BLOCK VERSION OF ADD BLOCK TO INBOX. REDO when there is a block document system model

	// // Detach Block
	// body += `
	//     // Detach from all connections
	//     OPTIONAL MATCH  (n:Block {id: "92a5b810-b759-4ce3-88f3-3f833a6baf4f"})-[r:NEXT_BLOCK]-(o)
	// 	DELETE r
	// 	WITH r
	//     `;
	// // }

	// let out = 'SET';

	// for (const property in block) {
	// 	if (property in block && property !== 'children' && property !== 'id') {
	// 		if (typeof block[property] === 'string') {
	// 			out += ' n.' + property + ' = "' + block[property] + '",';
	// 		} else {
	// 			out += ' n.' + property + ' = ' + block[property] + ',';
	// 		}
	// 	}
	// }

	// out += ' n.children = $children,';
	// out = out.slice(0, out.length - 1);
	// // body += out;

	// body += `
	//     // Create Inbox connection
	// 	MATCH (m: Node {id: "${nodeId}"})
	//     // Actually need to merge the previous block (once we have block document models, we're chilling for now).
	//     MERGE (n:Block {id: "${block.id}"})
	//     ${out}
	//     MERGE (m)-[i:INBOX]->(n)
	//     SET i.time = timestamp(), i.sentFromTitle = "${nodeName}", i.sentFromIcon="${icon}", i.sentFromId="${originNodeId}"

	//     RETURN m, i, n
	// `;

	const res = await fetch(`/api/username/${nodeId}/inbox/add`, {
		method: 'POST',
		body: JSON.stringify({
			cypher: body,
			// children: block.children[0]
			children: block,
		}),
	})
		.then((res) => {
			console.log('res ', res);
			return res.json();
		})
		.then((json) => {
			console.log('json: ', json);
			return json;
		});

	return res;
};
