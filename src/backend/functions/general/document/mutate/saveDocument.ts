import { mutate } from 'swr';
import { History } from 'slate-history';
import { fetcherAll } from '@/backend/driver/fetcher';
import {
	BlockElements,
	ELEMENT_BLOCK,
	ELEMENT_GROUP,
	ELEMENT_NODE,
	ELEMENT_NODELINK,
} from '@/packages/editor/plateTypes';
import { updateNode } from '@/backend/functions/node/mutate/updateNode';

export type SaveDocumentInput = {
	nodeId: string;
	username: string;
	document: any[];
	title?: string;
	history: History | null;
};

export const saveDocument = async ({
	nodeId,
	username,
	document,
	title = 'untitled',
	history,
}: SaveDocumentInput) => {
	// console.log(title, nodeId);
	// console.log(JSON.stringify(document));

	if (
		history === null ||
		(history.undos.length < 1 && history.redos.length < 1)
	)
		return;

	// only have to worry about the latest save.

	// Should definitely revalidate document/save document on unload.

	const saveNestedNodes = (children: BlockElements[]) => {
		function traverse(obj: BlockElements[]) {
			if (typeof obj !== 'object' || obj === null) return;

			Object.entries(obj).forEach(([key, value]) => {
				// Key is either an array index or object key
				if (value.type === ELEMENT_NODE && value.nodeId) {
					// console.log('ELEMENT_NODE, ', value);
					saveDocument({
						nodeId: value.nodeId as string,
						username,
						history: history,
						document: value.children,
						// @ts-ignore
						title: value.children[0].children[0].text
							? // @ts-ignore
							  (value.children[0].children[0].text as string)
							: value.title,
					});
				} else if (value.type === ELEMENT_BLOCK) {
					traverse(value.children as BlockElements[]);
				} else if (value.type === ELEMENT_GROUP) {
					Object.values(value.filters).forEach((nodes: any) => {
						nodes.forEach((node: any) => {
							// console.log(node);
							delete node.document;
							delete node.inbox;
						});
					});
				} else if (value.type === ELEMENT_NODELINK && value.nodeId) {
					updateNode({
						nodeId: value.nodeId,
						nodeData: { title: value.children[0].text as string },
					});
				}
			});
		}

		traverse(children);

		return children;
	};

	// loop through document, find nodes, and update them.

	// console.log('saveDocument', nodeId, title);
	// console.log(JSON.stringify(document, null, 2));

	document = saveNestedNodes(document.slice(1));

	const res = await fetch(
		`/api/${username}/${nodeId}/document/save/${title}`,
		{
			method: 'POST',
			body: JSON.stringify(document),
		}
	)
		.then((res) => {
			console.log('saveDocument ', res);
			return res.json();
		})
		.then((json) => {
			console.log('saveDocumentJson', json);
			return json;
		});

	return res;
};
