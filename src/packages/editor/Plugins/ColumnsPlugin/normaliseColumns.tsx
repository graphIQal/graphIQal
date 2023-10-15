import {
	TElement,
	TNodeEntry,
	getBlockAbove,
	getChildren,
	getPluginType,
	isEditor,
	isMarkActive,
	removeEditorMark,
	setNodes,
	unwrapNodes,
	wrapNodes,
} from '@udecode/plate';

import { randomUUID } from 'crypto';
import { v4 } from 'uuid';
import {
	MyValue,
	MyEditor,
	ELEMENT_BLOCK,
	ELEMENT_NODE,
	ELEMENT_GROUP,
	BlockwrappedElements,
	NoMarkElements,
	ELEMENT_COLUMN_PARENT,
	ELEMENT_COLUMN,
} from '../../plateTypes';

// I will normalise the block by setting the first block to text and all future blocks as children
export const normaliseColumns = <V extends MyValue>(editor: MyEditor) => {
	const ColumnParentType = getPluginType(editor, ELEMENT_COLUMN_PARENT);
	const ColumnType = getPluginType(editor, ELEMENT_COLUMN);

	const { normalizeNode } = editor;

	return ([node, path]: TNodeEntry) => {
		normalizeNode([node, path]);
		// console.log('normalise: ', editor.children);
		// console.log([node, path]);

		// Check if is editor
		if (isEditor(node)) {
			return;
		}

		const isColumnParent = node.type === ColumnParentType;
		const isColumn = node.type === ColumnType;

		if (isColumnParent) {
			// console.log('isBlock');
			// Children should all be code lines
			const children = getChildren([node, path]);

			if (children.length === 0) {
				// If there are no children, delete the column
				setNodes<TElement>(
					editor,
					{ type: ELEMENT_BLOCK },
					{ at: path }
				);
			} else if (children.length === 1) {
				console.log('l1');
				unwrapNodes(editor, { at: children[0][1] });
				setNodes<TElement>(
					editor,
					{ type: ELEMENT_BLOCK },
					{ at: path }
				);
				// unwrapNodes(editor, { at: path });
			} else {
				// Iterates through remaining children, and they should not be a column

				for (let i = 0; i < children.length; i++) {
					if (
						(children[i][0].type as string) in BlockwrappedElements
					) {
						// setNodes<TElement>(
						// 	editor,
						// 	{ type: ELEMENT_BLOCK },
						// 	{ at: children[i][1] }
						// );
						wrapNodes(
							editor,
							{ type: ELEMENT_COLUMN, id: v4(), children: [] },
							{
								at: children[i][1],
							}
						);
					}
				}
			}
		} else if (isColumn) {
			const children = getChildren([node, path]);

			if (children.length === 0) {
				// If there are no children, delete the column
				editor.removeNodes({ at: path });
			} else {
				// Iterates through remaining children, and they should not be a column
				for (let i = 0; i < children.length; i++) {
					if (
						(children[i][0].type as string) in
							BlockwrappedElements ||
						(children[i][0].type as string) === ELEMENT_COLUMN
					) {
						setNodes<TElement>(
							editor,
							{ type: ELEMENT_BLOCK },
							{ at: children[i][1] }
						);
					}
				}
			}
		}

		if (
			getBlockAbove(editor) &&
			getBlockAbove(editor)[0].type in NoMarkElements
		) {
			if (isMarkActive(editor, 'bold')) removeEditorMark(editor, 'bold');

			if (isMarkActive(editor, 'italic'))
				removeEditorMark(editor, 'italic');

			if (isMarkActive(editor, 'underline'))
				removeEditorMark(editor, 'underline');

			if (isMarkActive(editor, 'strikethrough'))
				removeEditorMark(editor, 'strikethrough');

			if (isMarkActive(editor, 'cut')) removeEditorMark(editor, 'cut');
		}

		// normalizeNode([node, path]);
	};
};
