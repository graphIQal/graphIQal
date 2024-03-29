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
import {
	BlockLevelElements,
	BlockwrappedElements,
	ELEMENT_BLOCK,
	ELEMENT_GROUP,
	ELEMENT_NODE,
	MyEditor,
	MyValue,
	NoMarkElements,
} from '../../../plateTypes';
import { outdent } from '../transforms/outdent';
import { randomUUID } from 'crypto';
import { v4 } from 'uuid';

// I will normalise the block by setting the first block to text and all future blocks as children
export const normalizeBlock = <V extends MyValue>(editor: MyEditor) => {
	const blockType = getPluginType(editor, ELEMENT_BLOCK);
	const nodetype = getPluginType(editor, ELEMENT_NODE);
	const groupType = getPluginType(editor, ELEMENT_GROUP);

	const { normalizeNode } = editor;

	return ([node, path]: TNodeEntry) => {
		normalizeNode([node, path]);
		// console.log('normalise: ', editor.children);
		// console.log([node, path]);

		const isBlock = node.type === blockType;

		// Check if is editor
		if (isEditor(node)) {
			// if (node.children.length < 1) {
			// 	insertNodes(editor, {
			// 		type: 'title',
			// 		children: [{ text: 'Untitled' }],
			// 	});
			// }
			return;
		}

		// The problem, I'm pretty sure, is that noramlise block instantly destroys anything that's not a paragraph in it.
		// I need a normalise paragraph. I need to add a class of inline elements.
		// So there will be Block-level elements, Block-wrapped elements, and inline-elements.
		// Block = Node, group, etc.
		// Blockwrapped = p, divider, basically anything that lives on the first line of a block.
		// Inline = Things that are wrapped in paragraph. Inline nodes. I need to normalise them so that they're part of

		if ((node.type as string) in BlockwrappedElements) {
			// console.log('blockwrapped');
			// console.log('blockWrapped');
			// Normalise p's so that they automatically lift if they're second.
			// The trick is that something that is indented will actually already be wrapped in a block, but a automatically generated p will be naked.

			// Check if it's the first item in a block. If so ignore.
			if (path[path.length - 1] === 0) return;
			// console.log('actually blockwrapped');
			// // Wrap in block

			// if (node.type === 'li') {
			// 	unwrapNodes(editor, { at: getFirstNode });
			// }

			wrapNodes(
				editor,
				{
					type: ELEMENT_BLOCK,
					// id: '',
					children: [],
					// peepee: 'honk' + v4(),
				},
				{ at: path }
			);

			// outdent node to carry all children nodes.
			outdent(editor);
		} else if (isBlock) {
			// console.log('isBlock');
			// Children should all be code lines
			const children = getChildren([node, path]);

			if (children.length === 0) {
				// If there are no children, delete the block
				// console.log('deleting child');
				editor.removeNodes({ at: path });
			} else {
				// console.log('checking blockChildren');
				// children returns array of tuples [child, path]
				// gets data of first child, makes sure it's blockwrapped element
				const firstChildType = children[0][0].type as string;

				if (firstChildType === blockType)
					editor.unwrapNodes({ at: [...path, 0] });

				// if (!(firstChildType in BlockwrappedElements)) {
				// 	wrapNodes(
				// 		editor,
				// 		{
				// 			type: ELEMENT_PARAGRAPH,
				// 			id: '',
				// 			children: [],
				// 		} as MyParagraphElement,
				// 		{ at: children[0][1] }
				// 	);
				// }

				// Iterates through remaining children, and they should not be a wrappedElementType. They should be a block
				for (let i = 1; i < children.length; i++) {
					if (
						(children[i][0].type as string) in BlockwrappedElements
					) {
						setNodes<TElement>(
							editor,
							{ type: ELEMENT_BLOCK },
							{ at: children[i][1] }
						);
					} else if (
						children[i][0].type !== blockType &&
						(children[i][0].type as string) in BlockLevelElements
					) {
						// console.log('unwrap nodes');
						// console.log(path, [i, 0], children[i]);
						unwrapNodes(editor, { at: path });
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
