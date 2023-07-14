import { ELEMENT_PARAGRAPH, unwrapNodes, wrapNodes } from '@udecode/plate';
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
	ELEMENT_NODELINK,
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
	isElement,
} from '@udecode/plate';
import { useViewData } from '../../../../../components/context/ViewContext';

// I will normalise the block by setting the first block to text and all future blocks as children
export const normalizeBlock = <V extends MyValue>(editor: MyEditor) => {
	const blockType = getPluginType(editor, ELEMENT_BLOCK);

	const { normalizeNode } = editor;

	return ([node, path]: TNodeEntry) => {
		normalizeNode([node, path]);
		console.log('[node, path]');
		console.log([node, path]);
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
			console.log('lifting ', node.type);
			// // Wrap in block

			// if (node.type === 'li') {
			// 	unwrapNodes(editor, { at: getFirstNode });
			// }

			wrapNodes(
				editor,
				{
					type: ELEMENT_BLOCK,
					id: '',
					children: [],
				}
				// { at: path }
			);

			console.log(editor.children);
			// outdent node to carry all children nodes.

			outdent(editor);

			console.log(editor.children);
		} else if (isBlock) {
			console.log('isBlock');
			// Children should all be code lines
			const children = getChildren([node, path]);

			// children returns array of tuples [child, path]
			// gets data of first child, makes sure it's blockwrapped element
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
		// else if(node.type === ELEMENT_NODELINK) {

		// }

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
		}

		// normalizeNode([node, path]);
	};
};
