import {
	TElement,
	TNodeEntry,
	collapseSelection,
	focusEditor,
	getBlockAbove,
	getChildren,
	getNextSiblingNodes,
	getNode,
	getNodeAncestors,
	getPluginType,
	isEditor,
	isElement,
	isMarkActive,
	isText,
	mergeNodes,
	outdent,
	removeEditorMark,
	removeNodes,
	setNodes,
	unwrapNodes,
	withoutNormalizing,
	withoutSavingHistory,
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
import { Editor, Path, hasPath } from 'slate';

// I will normalise the block by setting the first block to text and all future blocks as children
export const normaliseCutText = <V extends MyValue>(editor: MyEditor) => {
	const { normalizeNode } = editor;

	return ([node, path]: TNodeEntry) => {
		normalizeNode([node, path]);

		// Check if is editor
		if (isEditor(node) || !hasPath(editor as Editor, path)) {
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
			const index = path[path.length - 1];

			// If next node is text -> check the node after that.

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
						return;
					}
				}
			}

			// Get the next sibling node
			const nextNode = getNode(editor, parentPath.concat(index + 1));

			// If the next node is of the same type, merge the nodes
			if (isElement(nextNode) && nextNode.type === node.type) {
				mergeNodes(editor, { at: parentPath.concat(index + 1) });
				return;
			} else if (nextNode && isText(nextNode)) {
				if (nextNode.text === '') {
					const nextnextNode = getNode(
						editor,
						parentPath.concat(index + 2)
					);

					if (
						isElement(nextnextNode) &&
						nextnextNode.type === node.type
					)
						withoutSavingHistory(editor, () => {
							// withoutNormalizing(editor, () => {
							removeNodes(editor, {
								at: parentPath.concat(index + 1),
							});

							mergeNodes(editor, {
								at: parentPath.concat(index + 1),
							});
							// });
						});
				}
				return;
			}
		}
	};
};
