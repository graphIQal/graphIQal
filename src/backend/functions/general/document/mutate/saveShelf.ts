import { SaveDocumentInput } from './saveDocument';

export const saveShelf = async ({
	nodeId,
	username,
	document,
	title = 'untitled',
}: SaveDocumentInput) => {
	console.log('saveShelf');
	// console.log(JSON.stringify(document));

	const res = await fetch(`/api/${username}/${nodeId}/shelf/save`, {
		method: 'POST',
		body: JSON.stringify(document),
	})
		.then((res) => {
			console.log('saveShelf ', res);
			return res.json();
		})
		.then((json) => {
			console.log(json);
			return json;
		});

	return res;
};
