import {
	TElement,
	TNodeEntry,
	getBlockAbove,
	getChildren,
	getNextSiblingNodes,
	getNode,
	getNodeAncestors,
	getPluginType,
	isEditor,
	isElement,
	isMarkActive,
	mergeNodes,
	outdent,
	removeEditorMark,
	setNodes,
	unwrapNodes,
	wrapNodes,
} from '@udecode/plate';
import {
	BlockElements,
	BlockLevelElements,
	BlockwrappedElements,
	ELEMENT_BLOCK,
	ELEMENT_CUT_HIDDEN,
	ELEMENT_CUT_SHOWN,
	ELEMENT_GROUP,
	ELEMENT_NODE,
	MyEditor,
	MyValue,
	NoMarkElements,
} from '../../plateTypes';
import { Editor, Path } from 'slate';

// I will normalise the block by setting the first block to text and all future blocks as children
export const normaliseCutText = <V extends MyValue>(editor: MyEditor) => {
	const { normalizeNode } = editor;

	return ([node, path]: TNodeEntry) => {
		normalizeNode([node, path]);

		// Check if is editor
		if (isEditor(node)) {
			return;
		}

		if (
			node.type === getPluginType(editor, ELEMENT_CUT_HIDDEN) ||
			node.type === getPluginType(editor, ELEMENT_CUT_SHOWN)
		) {
			// Get the parent node
			const [parentNode, parentPath] = Editor.parent(
				editor as Editor,
				path
			);

			// Get the index of the current node in the parent's children
			const index = parentPath[parentPath.length - 1];

			// Get the next sibling node
			const nextNode = getNode(editor, parentPath.concat(index + 1));

			// If the next node is of the same type, merge the nodes
			// if (isElement(nextNode) && nextNode.type === node.type) {
			// 	mergeNodes(editor, { at: parentPath.concat(index + 1) });
			// }

			const ancestors = [...Path.ancestors(path, { reverse: true })];

			for (let i = 0; i < ancestors.length; i++) {
				if (editor.hasPath(ancestors[i])) {
					const node = editor.node(ancestors[i]) as [
						BlockElements,
						Path
					];
					if (
						node &&
						(node[0].type === ELEMENT_CUT_HIDDEN ||
							node[0].type === ELEMENT_CUT_SHOWN)
					) {
						unwrapNodes(editor, { at: path });
					}
				}
			}
		}
	};
};
