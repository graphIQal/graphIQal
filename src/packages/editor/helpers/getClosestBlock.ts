import { NodeEntry, Path } from 'slate';
import {
	BlockElements,
	ELEMENT_NODE,
	ELEMENT_NODELINK,
	MyBlockElement,
	MyEditor,
	MyValue,
} from '../plateTypes';

export const getClosestBlockId = (path: Path, editor: MyEditor) => {
	const ancestors = [path, ...Path.ancestors(path, { reverse: true })];
	// console.log(ancestors)

	for (let i = 0; i < ancestors.length; i++) {
		if (editor.hasPath(ancestors[i])) {
			const node = editor.node(ancestors[i]) as [BlockElements, Path];
			// console.log(ancestors[i])
			// console.log(node)
			if (node && node[0].type === 'block') {
				return node[0].id;
			}
		}
	}

	return null;
};

export const getClosestNodeId = (path: Path, editor: MyEditor) => {
	const ancestors = [path, ...Path.ancestors(path, { reverse: true })];
	// console.log(ancestors)

	for (let i = 0; i < ancestors.length; i++) {
		if (editor.hasPath(ancestors[i])) {
			const node = editor.node(ancestors[i]) as [BlockElements, Path];

			console.log(node);

			if (
				node &&
				(node[0].type === ELEMENT_NODE ||
					node[0].type === ELEMENT_NODELINK)
			) {
				return node[0].nodeId;
			}
		}
	}

	return null;
};

export const getClosestBlock = (
	path: Path,
	editor: MyEditor
): NodeEntry | null => {
	const ancestors = [path, ...Path.ancestors(path, { reverse: true })];
	// console.log(ancestors)

	for (let i = 0; i < ancestors.length; i++) {
		if (editor.hasPath(ancestors[i])) {
			const node = editor.node(ancestors[i]) as [BlockElements, Path];
			// console.log(ancestors[i])
			// console.log(node)
			if (node && node[0].type === 'block') {
				return node;
			}
		}
	}

	return null;
};

export const getClosestNode = (
	path: Path,
	editor: MyEditor
): NodeEntry | null => {
	const ancestors = [path, ...Path.ancestors(path, { reverse: true })];
	// console.log(ancestors)

	for (let i = 0; i < ancestors.length; i++) {
		if (editor.hasPath(ancestors[i])) {
			const node = editor.node(ancestors[i]) as [BlockElements, Path];
			// console.log(ancestors[i])
			// console.log(node)
			console.log(node);

			if (
				node &&
				(node[0].type === ELEMENT_NODE ||
					node[0].type === ELEMENT_NODELINK)
			) {
				return node;
			}
		}
	}

	return null;
};
