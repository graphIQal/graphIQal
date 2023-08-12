import { mutate } from 'swr';
import { History } from 'slate-history';

export type updateNodeInput = {
	nodeId: string;
	username: string;
	fieldValObj: { [key: string]: any };
};

export const updateNodeFields = async ({
	nodeId,
	username,
	fieldValObj,
}: updateNodeInput) => {
	console.log('updateObj', fieldValObj);

	const res = await fetch(`/api/${username}/${nodeId}/update`, {
		method: 'POST',
		body: JSON.stringify(fieldValObj),
	})
		.then((res) => {
			console.log('updateNodeRes ', res);
			return res.json();
		})
		.then((json) => {
			console.log(json);
			return json;
		});

	return res;
};
