import { mutate } from 'swr';
import { History } from 'slate-history';
import { fetcherAll } from '@/backend/driver/fetcher';

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

	console.log('saveDocument', nodeId, title, history);

	// const blockMutates = [];

	// if (history.redos.length > 0) {
	// 	// save last redo
	// 	blockMutates.push(
	// 		...Object.keys(
	// 			history.redos[history.redos.length - 1].changedBlocks
	// 		)
	// 	);
	// } else {
	// 	// save last undo
	// 	blockMutates.push(
	// 		...Object.keys(
	// 			history.undos[history.undos.length - 2].changedBlocks
	// 		)
	// 	);
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
