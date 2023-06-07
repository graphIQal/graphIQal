type SaveDocumentInput = {
	nodeId: string;
	username: string;
	document: any[];
	title?: string;
};

export const saveDocument = async ({
	nodeId,
	username,
	document,
	title = 'untitled',
}: SaveDocumentInput) => {
	// console.log('saveDocument');
	// console.log(JSON.stringify(document));
	// console.log(title);

	if (title === '') title = 'untitled';

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
			// console.log(json);
			return json;
		});

	return res;
};
