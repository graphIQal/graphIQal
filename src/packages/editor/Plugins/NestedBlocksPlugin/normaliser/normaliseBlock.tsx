import { ELEMENT_PARAGRAPH, wrapNodes } from '@udecode/plate';
import {
	TElement,
	TNodeEntry,
	getChildren,
	getPluginType,
	setNodes,
} from '@udecode/plate-core';
import {
	BlockwrappedElements,
	ELEMENT_BLOCK,
	ELEMENT_TITLE,
	MyEditor,
	MyParagraphElement,
	MyValue,
	NoMarkElements,
} from '../../../plateTypes';
import { outdent } from '../transforms/outdent';
import {
	getBlockAbove,
	isMarkActive,
	removeMark,
	removeEditorMark,
} from '@udecode/plate';

// I will normalise the block by setting the first block to text and all future blocks as children
export const normalizeBlock = <V extends MyValue>(editor: MyEditor) => {
	const blockType = getPluginType(editor, ELEMENT_BLOCK);

	const { normalizeNode } = editor;

	return ([node, path]: TNodeEntry) => {
		normalizeNode([node, path]);
		// if (!isElement(node)) {
		// 	normalizeNode([node, path]);
		// 	return;
		// }

		const isBlock = node.type === blockType;

		if ((node.type as string) in BlockwrappedElements) {
			// Normalise p's so that they automatically lift if they're second.
			// The trick is that something that is indented will actually already be wrapped in a block, but a automatically generated p will be naked.

			// Check if it's the first item in a block. If so ignore.
			if (path[path.length - 1] === 0) return;

			// // Wrap in block
			wrapNodes(editor, {
				type: ELEMENT_BLOCK,
				id: '',
				children: [],
			});

			// outdent node to carry all children nodes.
			outdent(editor);
		} else if (isBlock) {
			// Children should all be code lines
			const children = getChildren([node, path]);

			// children returns array of tuples [child, path]
			// gets data of first child, makes sure it's paragraph
			const firstChildType = children[0][0].type as string;

			if (!(firstChildType in BlockwrappedElements)) {
				wrapNodes(
					editor,
					{
						type: ELEMENT_PARAGRAPH,
						id: '',
						children: [],
					} as MyParagraphElement,
					{ at: children[0][1] }
				);
			}

			// Iterates through remaining children, and they should not be a wrappedElementType. They should be a block
			for (let i = 1; i < children.length; i++) {
				if ((children[i][0].type as string) in BlockwrappedElements) {
					setNodes<TElement>(
						editor,
						{ type: ELEMENT_BLOCK },
						{ at: children[i][1] }
					);
				}
			}
		}

		console.log(path);
		console.log(getBlockAbove(editor));

		if (
			getBlockAbove(editor) &&
			getBlockAbove(editor)[0].type in NoMarkElements
		) {
			console.log(getBlockAbove(editor) && getBlockAbove(editor)[0].type);
			if (isMarkActive(editor, 'bold')) removeEditorMark(editor, 'bold');

			if (isMarkActive(editor, 'italic'))
				removeEditorMark(editor, 'italic');
		}

		// normalizeNode([node, path]);
	};
};
