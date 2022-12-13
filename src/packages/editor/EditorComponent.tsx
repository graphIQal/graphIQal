import React, { useCallback, useState, useRef, useEffect } from 'react';

import {
	createEditor,
	Range,
	Text,
	Transforms,
	Editor,
	Descendant,
	Element,
} from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

// TypeScript users only add this code
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import BlockMenu from './BlockMenu/BlockMenu';
import EditorCommands from './EditorCommands';
import { CodeElement, DefaultElement, Leaf } from './Elements/Elements';
import HoveringToolbar from './Elements/HoveringToolbar';
import FloatingMenu from './Elements/FloatingMenu';
import { createId } from '../../helpers/frontend/frontend';

type CustomElement = {
	format: 'paragraph' | 'code';
	type: 'block' | 'node' | 'connection';
	children: (CustomText | CustomElement)[];
	id: string;
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

const EditorComponent: React.FC = () => {
	const [editor] = useState(() => withReact(createEditor()));
	let nums: number = 0;

	const { normalizeNode } = editor;
	editor.normalizeNode = (entry) => {
		const [node, path] = entry;

		// If the element is a paragraph, ensure its children are valid.
		// idk man
		if (Element.isElement(node) && !node.id) {
			console.log('hmm');
			Transforms.setNodes(editor, {
				id: nums + '',
			});
			nums++;
			return;
		}

		// Fall back to the original `normalizeNode` to enforce other constraints.
		normalizeNode(entry);
	};

	const [value, setValue] = useState<Descendant[]>([
		{
			type: 'block',
			id: createId('1'),
			format: 'paragraph',
			children: [{ text: 'TITLE PAGE', text_type: 'h1' }],
		},
		{
			type: 'block',
			id: createId('2'),
			format: 'paragraph',
			children: [
				{ text: 'A line of text in a paragraph.', text_type: 'text' },
			],
		},
	]);

	useEffect(() => {
		console.log(value);
	}, [value]);

	const [isOpen, setIsOpen] = useState(false);
	const commandTextRef = useRef<any>('');
	const closeMenu = false;
	const menuListRef = useRef<any>(null);

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

	const [opacity, setOpacity] = useState<'0%' | '100%'>('0%');
	const showMenu = () => {
		setOpacity('100%');
		// editor.insertNode()
	};

	// const findBlock = useCallback(
	// 	(id: string) => {
	// 		const card = value.filter((c) => `${c.id}` === id)[0] as {
	// 			id: number;
	// 			text: string;
	// 		};
	// 		return {
	// 			card,
	// 			index: value.indexOf(card),
	// 		};
	// 	},
	// 	[value]
	// );

	// const moveCard = useCallback(
	// 	(id: string, atIndex: number) => {
	// 	  const { card, index } = findCard(id)
	// 	  setCards(
	// 		update(cards, {
	// 		  $splice: [
	// 			[index, 1],
	// 			[atIndex, 0, card],
	// 		  ],
	// 		}),
	// 	  )
	// 	},
	// 	[findCard, cards, setCards],
	//   )

	return (
		<>
			<Slate
				editor={editor}
				value={value}
				onChange={(value) => {
					setValue(value);
				}}
			>
				<HoveringToolbar />
				<BlockMenu />
				<Editable
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					onKeyDown={(event) => {
						if (!event.ctrlKey && !event.metaKey) {
							// console.log(
							//   'event ' + event.currentTarget.offsetHeight
							//   // event.currentTarget
							// );
							switch (event.key) {
								case 'Tab':
									event.preventDefault();
									if (
										editor.selection &&
										Range.isCollapsed(editor.selection) &&
										editor.selection.anchor.offset === 0
									) {
										console.log('at start');
									} else {
										console.log('not at start');
										editor.insertText('    ');
									}
									break;
								case '&':
									event.preventDefault();
									editor.insertText('and');
									break;
								case '/':
									showMenu();
									break;
								default:
									setOpacity('0%');
							}
						} else {
							switch (event.key) {
								// When "`" is pressed, keep our existing code block logic.
								case 'k': {
									event.preventDefault();
									EditorCommands.toggleCodeBlock(editor);
									break;
								}

								// When "B" is pressed, bold the text in the selection.
								case 'b': {
									event.preventDefault();
									EditorCommands.toggleBoldMark(editor);
									break;
								}

								// When "i" is pressed, italics the text in the selection.
								case 'i': {
									event.preventDefault();
									EditorCommands.toggleItalicsMark(editor);
									break;
								}
							}
						}
					}}
				/>
			</Slate>
		</>
	);
};

export default EditorComponent;
