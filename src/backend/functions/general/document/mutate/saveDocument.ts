import { mutate } from 'swr';
import { History } from 'slate-history';

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

	console.log('saveDocument');
	if (history === null) return;
	console.log(history, document);
	// const changedBlocks = {};
	// for (const i in history.undos) {
	// 	for (const key in history.undos[i].blockIds) {
	// 		console.log(key);
	// 		// changedBlocks[]
	// 	}
	// }

	const res = await fetch(
		`/api/${username}/${nodeId}/document/save/${title}`,
		{
			method: 'POST',
			body: JSON.stringify(document.slice(1)),
		}
	)
		.then((res) => {
			console.log('saveDocument ', res);
			return res.json();
		})
		.then((json) => {
			console.log(json);
			return json;
		});

	return res;
};
