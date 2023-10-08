import { SaveDocumentInput } from './saveDocument';

export const saveInbox = async ({
	nodeId,
	username,
	document,
	title = 'untitled',
}: SaveDocumentInput) => {
	console.log('saveInbox');
	// console.log(JSON.stringify(document));

	const res = await fetch(`/api/${username}/${nodeId}/inbox/save`, {
		method: 'POST',
		body: JSON.stringify(document),
	})
		.then((res) => {
			console.log('saveInbox ', res);
			return res.json();
		})
		.then((json) => {
			console.log(json);
			return json;
		});

	return res;
};
