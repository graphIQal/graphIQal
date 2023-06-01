type SaveDocumentInput = { nodeId: string; username: string; document: any[] };

export const saveDocument = async ({
	nodeId,
	username,
	document,
}: SaveDocumentInput) => {
	console.log('saveDocumentDocument');
	console.log(nodeId, username);

	const res = await fetch(`/api/${username}/${nodeId}/document/save`, {
		method: 'POST',
		body: JSON.stringify(document),
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
