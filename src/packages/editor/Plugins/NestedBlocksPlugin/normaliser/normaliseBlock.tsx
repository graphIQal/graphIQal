import {
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	ELEMENT_PARAGRAPH,
	liftNodes,
	wrapNodes,
} from '@udecode/plate';
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

const wrappedELementTypes = {
	[ELEMENT_PARAGRAPH]: true,
	[ELEMENT_H1]: true,
	[ELEMENT_H2]: true,
	[ELEMENT_H3]: true,
};

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

		if ((node.type as string) in wrappedELementTypes) {
			console.log('is ' + node.type);
			console.log(node);
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
			console.log('isBlock ', node);
			// Children should all be code lines
			const children = getChildren([node, path]);

			// children returns array of tuples [child, path]
			// gets data of first child, makes sure it's paragraph
			const firstChildType = children[0][0].type as string;
			if (!(firstChildType in wrappedELementTypes)) {
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
				if ((children[i][0].type as string) in wrappedELementTypes) {
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
