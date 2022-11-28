import { createEditor, Editor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';

// Define our own custom set of helpers.
const EditorCommands = {
	isBoldMarkActive(editor: BaseEditor & ReactEditor) {
		const match = Editor.nodes(editor, {
			match: (n) => Text.isText(n) && n.bold === true,
			universal: true,
		});

		return !!match;
	},

	isCodeBlockActive(editor: BaseEditor & ReactEditor) {
		const match = Editor.nodes(editor, {
			match: (n) => Editor.isBlock(editor, n) && n.type === 'code',
		});

		return !!match;
	},

	toggleBoldMark(editor: BaseEditor & ReactEditor) {
		Transforms.setNodes(
			editor,
			{ bold: EditorCommands.isBoldMarkActive(editor) ? false : true },
			{ match: (n) => Text.isText(n), split: true }
		);
	},

	toggleCodeBlock(editor: BaseEditor & ReactEditor) {
		Transforms.setNodes(
			editor,
			{
				type: EditorCommands.isCodeBlockActive(editor)
					? 'paragraph'
					: 'code',
			},
			{ match: (n) => Editor.isBlock(editor, n) }
		);
	},
};

export default EditorCommands;
