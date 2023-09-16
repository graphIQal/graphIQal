import type { NextApiRequest, NextApiResponse } from 'next';
import { read } from '../../../../../backend/driver/helpers';
import { Block, MyTitleElement } from '@/packages/editor/plateTypes';
// import { write } from '../../../../../backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;
	const body = req.body;

	const cypher: string = `
	MATCH path = (n:Node {id: $nodeId})-[r:CHILD_BLOCK|NEXT_BLOCK*0..]->(p)
	WITH collect(path) AS paths
	CALL apoc.convert.toTree(paths)
	YIELD value
	RETURN value;
	`;

	const data = await read(cypher, { ...params, body: body });

	if ('err' in data) {
		// console.log('huh');
		res.status(400).json(data);
	} else {
		// console.log('else');
		const blockData = data[0].value;
		const document: Block[] = [
			{
				type: 'title',
				id: 'Node Title',
				children: [{ text: blockData.title }],
			} as MyTitleElement,
		];

		console.log('document data');
		console.log(JSON.stringify(blockData, null, 2));

		// all we do is pass in the level, and we push it using recursion.
		const traverseBlocks = (currLevel: Block[], obj: any) => {
			console.log('traverse');
			console.log(obj);

			// Pushes the current node onto the list
			const { _type, _id, next_block, child_block, children, ...rest } =
				obj;
			console.log(children);
			currLevel.push({ ...rest, children: JSON.parse(children) });

			// First child = children;
			// Go into CHILD_BLOCKs for next child
			if (obj.child_block) {
				traverseBlocks(
					currLevel[currLevel.length - 1].children as Block[],
					obj.child_block[0]
				);
			}

			if (obj.next_block) {
				traverseBlocks(currLevel, obj.next_block[0]);
			}

			// Go into NEXT_BLOCK to add to the document
			console.log('current document');
			console.log(document);
		};

		traverseBlocks(document, blockData.next_block[0]);
		// console.log('data: ', { nodeData, visualData });
		console.log('output document');
		console.log(JSON.stringify(document, null, 2));

		res.status(200).json(document);
	}

	// res.status(200).json(result);
}
