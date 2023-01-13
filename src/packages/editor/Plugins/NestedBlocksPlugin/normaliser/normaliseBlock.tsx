import { ELEMENT_PARAGRAPH, wrapNodes } from '@udecode/plate';
import {
	getChildren,
	getPluginType,
	isElement,
	PlateEditor,
	setNodes,
	TElement,
	TNodeEntry,
	Value,
} from '@udecode/plate-core';
import {
	ELEMENT_BLOCK,
	MyEditor,
	MyParagraphElement,
	MyValue,
} from '../../../plateTypes';

// I will normalise the block by setting the first block to text and all future blocks as children
export const normalizeBlock = <V extends MyValue>(editor: MyEditor) => {
	const blockType = getPluginType(editor, ELEMENT_BLOCK);

	const { normalizeNode } = editor;

	return ([node, path]: TNodeEntry) => {
		normalizeNode([node, path]);

		if (!isElement(node)) {
			return;
		}

		console.log(editor.children);

		const isBlock = node.type === blockType;
		// console.log(node.type, isBlock);

		if (isBlock) {
			// Children should all be code lines
			const children = getChildren([node, path]);
			console.log(children);

			// children returns array of tuples [child, path]
			// gets data of first child, makes sure it's paragraph

			if (children[0][0].type !== ELEMENT_PARAGRAPH) {
				// setNodes<TElement>(
				// 	editor,
				// 	// It's ignoring the children field becasuse apparently setnodes should do that?
				// 	{ type: 'text', children: [{ text: '' }] },
				// 	{ at: children[0][1] }
				// );
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

			// Iterates through remaining children, and they should not be ELEMENT_PARAGRAPH. They should be NODE, CONNECTION, or something else
			for (let i = 1; i < children.length; i++) {
				// console.log('is it here?');
				if (children[i][0].type === ELEMENT_PARAGRAPH) {
					setNodes<TElement>(
						editor,
						{ type: ELEMENT_BLOCK },
						{ at: children[i][1] }
					);
				}
			}
		}
		// if (node.type === ELEMENT_PARAGRAPH) {
		// }
	};
};
