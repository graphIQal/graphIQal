import { ELEMENT_PARAGRAPH, liftNodes, wrapNodes } from '@udecode/plate';
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
import { outdent } from '../transforms/outdent';

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

		// console.log('prenormalise ', editor.children);

		if (node.type === ELEMENT_PARAGRAPH) {
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

			if (children[0][0].type !== ELEMENT_PARAGRAPH) {
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
				if (children[i][0].type === ELEMENT_PARAGRAPH) {
					setNodes<TElement>(
						editor,
						{ type: ELEMENT_BLOCK },
						{ at: children[i][1] }
					);
				}
			}
		}

		// normalizeNode([node, path]);
	};
};
