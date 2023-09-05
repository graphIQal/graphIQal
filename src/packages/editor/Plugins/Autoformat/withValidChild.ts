import { TNodeEntry, insertNodes, isEditor } from '@udecode/plate';

import { MyEditor, MyValue } from '../../plateTypes';

export const withValidChild = <
	V extends MyValue = MyValue,
	E extends MyEditor = MyEditor
>(
	editor: E
) => {
	// editor.normalizeNode = (entry) => {
	// 	const [node, path] = entry;

	//     editor.normalizeNode([node, path]);

	// 	console.log('node ', node);
	// 	console.log(!isEditor(node));

	// 	if (!isEditor(node) || node.children.length > 0) {
	// 		return;
	// 	}

	// 	insertNodes(
	// 		editor,
	// 		{
	// 			type: 'title',
	// 			children: [{ text: '' }],
	// 		},
	// 		{ at: [0] }
	// 	);
	// };

	editor.normalizeNode = normaliseValidChild(editor);

	return editor;
};

export const normaliseValidChild = <V extends MyValue>(editor: MyEditor) => {
	const { normalizeNode } = editor;

	return ([node, path]: TNodeEntry) => {
		normalizeNode([node, path]);

		if (!isEditor(node) || node.children.length > 0) {
			return normalizeNode([node, path]);
		}

		insertNodes(
			editor,
			{
				type: 'paragraph',
				children: [{ text: '' }],
			},
			{ at: [0] }
		);
	};
};
