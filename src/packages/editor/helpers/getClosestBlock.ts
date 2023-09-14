import { Path } from 'slate';
import { MyEditor } from '../plateTypes';

export const getClosestBlock = (path: Path, editor: MyEditor) => {
	const ancestors = [path, ...Path.ancestors(path, { reverse: true })];
	// console.log(ancestors)

	for (let i = 0; i < ancestors.length; i++) {
		if (editor.hasPath(ancestors[i])) {
			const node = editor.node(ancestors[i]);
			// console.log(ancestors[i])
			// console.log(node)
			if (node && node[0].type === 'block') {
				return node[0].id;
			}
		}
	}

	return null;
};
