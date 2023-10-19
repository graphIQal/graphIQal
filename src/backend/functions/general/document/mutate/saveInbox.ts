import {
	BlockElements,
	ELEMENT_BLOCK,
	ELEMENT_NODE,
} from '@/packages/editor/plateTypes';
import { SaveDocumentInput, saveDocument } from './saveDocument';

export const saveInbox = async ({
	nodeId,
	username,
	document,
	title = 'untitled',
	history,
}: SaveDocumentInput) => {
	if (
		history === null ||
		(history.undos.length < 1 && history.redos.length < 1)
	)
		return;

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
						title: value.title as string,
					});
				} else if (value.type === ELEMENT_BLOCK) {
					traverse(value.children as BlockElements[]);
				}
			});
		}

		traverse(children);
	};

	saveNestedNodes(document.slice(1));

	const res = await fetch(`/api/${username}/${nodeId}/inbox/save`, {
		method: 'POST',
		body: JSON.stringify(document),
	})
		.then((res) => {
			// console.log('saveInbox ', res);
			return res.json();
		})
		.then((json) => {
			console.log(json);
			return json;
		});

	return res;
};
