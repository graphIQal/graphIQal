import React, { useCallback, useState } from 'react';

import { createEditor, Editor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

// TypeScript users only add this code
import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';
import BlockMenu from './BlockMenu/BlockMenu';
import { Leaf, DefaultElement, CodeElement } from './Elements/Elements';

type CustomElement = {
	type: 'paragraph' | 'code';
	children: (CustomText | CustomElement)[];
};

type CustomText = {
	text: string;
	bold?: boolean;
	italics?: boolean;
	text_type: 'text' | 'h1' | 'h2' | 'h3';
};

declare module 'slate' {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}

const initialValue: CustomElement[] = [
	{
		type: 'paragraph',
		children: [{ text: 'TITLE PAGE', text_type: 'h1' }],
	},
	{
		type: 'paragraph',
		children: [
			{ text: 'A line of text in a paragraph.', text_type: 'text' },
		],
	},
];

const EditorComponent: React.FC = () => {
	const [editor] = useState(() => withReact(createEditor()));

	// ELEMENTS
	// Define a React component renderer for our code blocks.

	// Define a rendering function based on the element passed to `props`. We use
	// `useCallback` here to memoize the function for subsequent renders.
	const renderElement = useCallback((props: any) => {
		switch (props.element.type) {
			case 'code':
				return <CodeElement {...props} />;
			default:
				return <DefaultElement {...props} />;
		}
	}, []);

	const renderLeaf = useCallback((props: any) => {
		return <Leaf {...props} />;
	}, []);

	const showMenu = () => {
		// <div style={}></div>;
	};
	return (
		<>
			<BlockMenu
				items={[
					{
						title: 'text',
						onPress: () => {
							Transforms.setNodes(
								editor,
								{ text_type: 'text' },
								// Apply it to text nodes, and split the text node up if the
								// selection is overlapping only part of it.
								{
									match: (n) => Text.isText(n),
								}
							);
						},
					},
					{
						title: 'Header 1',
						onPress: () => {
							Transforms.setNodes(
								editor,
								{ text_type: 'h1' },
								// Apply it to text nodes, and split the text node up if the
								// selection is overlapping only part of it.
								{
									match: (n) => Text.isText(n),
								}
							);
						},
					},
					{
						title: 'Header 2',
						onPress: () => {
							Transforms.setNodes(
								editor,
								{ text_type: 'h2' },
								// Apply it to text nodes, and split the text node up if the
								// selection is overlapping only part of it.
								{
									match: (n) => Text.isText(n),
								}
							);
						},
					},
					{
						title: 'Header 3',
						onPress: () => {
							Transforms.setNodes(
								editor,
								{ text_type: 'h3' },
								// Apply it to text nodes, and split the text node up if the
								// selection is overlapping only part of it.
								{
									match: (n) => Text.isText(n),
								}
							);
						},
					},
					{
						title: 'bold',
						onPress: () => {
							Transforms.setNodes(
								editor,
								{ bold: true },
								// Apply it to text nodes, and split the text node up if the
								// selection is overlapping only part of it.
								{
									match: (n) => Text.isText(n),
									split: true,
								}
							);
						},
					},
					{
						title: 'italics',
						onPress: () => {
							const match = Editor.nodes(editor, {
								match: (n) =>
									Editor.isBlock(editor, n) &&
									n.type === 'paragraph',
							});
						},
					},
					{
						title: 'test',
						onPress: () => {},
					},
				]}
			/>
			<Slate editor={editor} value={initialValue}>
				<Editable
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					onKeyDown={(event) => {
						if (!event.ctrlKey && !event.metaKey) {
							if (event.key === 'Slash') {
								showMenu();
							}
						}

						switch (event.key) {
							// When "`" is pressed, keep our existing code block logic.
							case '`': {
								event.preventDefault();
								const match = Editor.nodes(editor, {
									match: (n) =>
										Editor.isBlock(editor, n) &&
										n.type === 'paragraph',
								});
								Transforms.setNodes(
									editor,
									{ type: match ? 'code' : 'paragraph' },
									{ match: (n) => Editor.isBlock(editor, n) }
								);
								break;
							}

							// When "B" is pressed, bold the text in the selection.
							case 'b': {
								event.preventDefault();
								Transforms.setNodes(
									editor,
									{ bold: true },
									// Apply it to text nodes, and split the text node up if the
									// selection is overlapping only part of it.
									{
										match: (n) => Text.isText(n),
										split: true,
									}
								);
								console.log(editor);
								break;
							}
						}
					}}
				/>
			</Slate>
		</>
	);
};

export default EditorComponent;
