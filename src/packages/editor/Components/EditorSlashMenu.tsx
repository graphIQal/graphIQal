import { TippyProps } from '@tippyjs/react';
import {
	Combobox,
	deleteBackward,
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	ELEMENT_LI,
	ELEMENT_TODO_LI,
	getPluginType,
	insertNodes,
	isSelectionAtBlockStart,
	setNodes,
	toggleList,
} from '@udecode/plate';
import { ReactNode } from 'react';
import BlockMenu from '../../../components/organisms/BlockMenu';

import {
	ELEMENT_DIVIDER,
	ELEMENT_NODELINK,
	MyH1Element,
	MyH2Element,
	MyNodeLinkElement,
	useMyPlateEditorRef,
} from '../plateTypes';

import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { createNodeInDocument } from '../../../backend/functions/node/mutate/createNodeInDocument';
import { useViewData } from '../../../components/context/ViewContext';
import { formatList } from '../Plugins/Autoformat/autoformatUtils';

export const markTooltip: TippyProps = {
	arrow: true,
	delay: 0,
	duration: [200, 0],
	hideOnClick: false,
	offset: [0, 17],
	placement: 'top',
};

type item = {
	key: string;
	text: string;

	data: {
		onPress: () => void;
		searchFunction: (string: string) => boolean;
		logoSource?: string;
		customRender?: () => JSX.Element;
	};
};

// const [comboBoxOpen, setComboBoxOpen] = useState(false);

export const EditorSlashMenu = ({ children }: { children?: ReactNode }) => {
	const router = useRouter();
	const editor = useMyPlateEditorRef();
	const { nodeId, username } = useViewData();

	const items: item[] = [
		{
			key: '1',
			text: 'Create Node',
			data: {
				searchFunction: (search) => {
					// console.log('search ', search);
					if ('create node'.startsWith(search)) {
						return true;
					}
					return false;
				},
				onPress: async () => {
					// Add to backend
					const newId = uuidv4();

					// Create new page in frontend
					insertNodes(editor, {
						type: getPluginType(editor, ELEMENT_NODELINK),
						nodeId: newId,
						routeString: `/${username}/${newId}`,
						icon: 'node',
						children: [{ text: '' }],
					} as MyNodeLinkElement);

					const res = await createNodeInDocument(
						nodeId,
						username,
						'HAS',
						newId
					);
					// Navigate to node
					router.push(`/${username}/${newId}`, undefined);
				},
			},
		},
		{
			key: 'divider',
			text: 'Divider',
			data: {
				searchFunction: (search) => {
					if ('divider'.startsWith(search)) {
						return true;
					}
					return false;
				},
				onPress: async () => {
					insertNodes(editor, {
						type: getPluginType(editor, ELEMENT_DIVIDER),
						children: [{ text: '' }],
					});
				},
			},
		},
		{
			key: 'Connect',
			text: 'Connect',
			data: {
				searchFunction: (search) => {
					if ('connect'.startsWith(search)) {
						return true;
					}
					return false;
				},
				onPress: () => {
					console.log('okay');
					toggleList(editor, { type: ELEMENT_LI });
				},
			},
		},
		{
			key: 'nodelink',
			text: 'NodeLink',
			data: {
				searchFunction: (search) => {
					if ('nodelink'.startsWith(search)) {
						return true;
					}
					return false;
				},
				onPress: () => {
					console.log('okay');
					toggleList(editor, { type: ELEMENT_LI });
				},
			},
		},
		{
			key: 'add_node',
			text: 'Add Node',
			data: {
				searchFunction: (search) => {
					if ('add node'.startsWith(search)) {
						return true;
					}
					return false;
				},
				onPress: async () => {
					// setComboBoxOpen(true);
				},
			},
		},
		{
			key: 'h1',
			text: 'Header 1',
			data: {
				searchFunction: (search) => {
					if (
						'header'.startsWith(search) ||
						(search.endsWith('1') &&
							'header'.startsWith(
								search.slice(0, search.length - 1)
							))
					)
						return true;
					return false;
				},
				onPress: () => {
					if (isSelectionAtBlockStart(editor)) {
						setNodes(editor, { type: ELEMENT_H1 });
					} else {
						insertNodes(editor, {
							type: getPluginType(editor, ELEMENT_H1),
							children: [{ text: '' }],
						} as MyH1Element);
					}
				},
			},
		},
		{
			key: 'h2',
			text: 'Header 2',
			data: {
				searchFunction: (search) => {
					if (
						'header'.startsWith(search) ||
						(search.endsWith('2') &&
							'header'.startsWith(
								search.slice(0, search.length - 1)
							))
					)
						return true;
					return false;
				},
				onPress: () => {
					if (isSelectionAtBlockStart(editor)) {
						setNodes(editor, { type: ELEMENT_H2 });
					} else {
						insertNodes(editor, {
							type: getPluginType(editor, ELEMENT_H2),
							children: [{ text: '' }],
						} as MyH2Element);
					}
				},
			},
		},
		{
			key: 'h3',
			text: 'Header 3',
			data: {
				searchFunction: (search) => {
					// check if it's a number, if it's a number and not a three or it's 3
					if (
						'header 3'.startsWith(search) ||
						(search.endsWith('3') &&
							'header'.startsWith(
								search.slice(0, search.length - 1)
							))
					)
						return true;
					return false;
				},
				onPress: () => {
					if (isSelectionAtBlockStart(editor)) {
						setNodes(editor, { type: ELEMENT_H3 });
					} else {
						insertNodes(editor, {
							type: getPluginType(editor, ELEMENT_H3),
							children: [{ text: '' }],
						});
					}
				},
			},
		},
		{
			key: 'blist',
			text: 'Bullet List',
			data: {
				searchFunction: (search) => {
					if ('Bullet List'.startsWith(search)) {
						return true;
					}
					return false;
				},
				onPress: () => {
					formatList(editor, ELEMENT_LI);
				},
			},
		},
		{
			key: 'tlist',
			text: 'Todo List',
			data: {
				searchFunction: (search) => {
					if (
						'checkbox'.startsWith(search) ||
						'todo list'.startsWith(search)
					) {
						return true;
					}
					return false;
				},
				onPress: () => {
					formatList(editor, ELEMENT_TODO_LI);
				},
			},
		},
		// {
		// 	key: 'code block',
		// 	text: 'Code Block',
		// 	data: {
		// 		searchFunction: (search) => {
		// 			if ('code block'.startsWith(search)) {
		// 				return true;
		// 			}
		// 			return false;
		// 		},
		// 		onPress: () => {
		// 			if (isSelectionAtBlockStart(editor)) {
		// 				setNodes(editor, { type: ELEMENT_CODE_BLOCK });
		// 			} else {
		// 				insertNodes(editor, {
		// 					type: getPluginType(editor, ELEMENT_CODE_BLOCK),
		// 					children: [{ text: '' }],
		// 				});
		// 			}
		// 		},
		// 	},
		// },
		{
			key: 'HAScreate',
			text: 'Create Node with Connection: HAS',
			data: {
				searchFunction: (search) => {
					const connectionType = search.split(':')[1];

					if (
						'create:has'.startsWith(search) ||
						'has'.startsWith(connectionType)
					) {
						return true;
					}
					return false;
				},
				onPress: () => {
					console.log('okay');
					// Add to backend

					// Create new page in frontend
					insertNodes(editor, {
						type: getPluginType(editor, ELEMENT_NODELINK),
						children: [{ text: '' }],
					} as MyNodeLinkElement);

					// Navigate to backend
				},
			},
		},
		{
			key: 'IScreate',
			text: 'Create Node with Connection: IS',
			data: {
				searchFunction: (search) => {
					if (
						'create:is'.startsWith(search) ||
						search.endsWith('is')
					) {
						return true;
					}
					return false;
				},
				onPress: () => {
					console.log('okay');

					// Add to backend

					// Create new page in frontend
					insertNodes(editor, {
						type: getPluginType(editor, ELEMENT_NODELINK),
						children: [{ text: '' }],
					} as MyNodeLinkElement);

					// Navigate to backend
				},
			},
		},
		{
			key: 'ISconnect',
			text: 'IS : ',
			data: {
				searchFunction: (search) => {
					if (
						'connect:is'.startsWith(search) ||
						'is:'.startsWith(search)
					) {
						return true;
					}
					return false;
				},
				onPress: () => {
					console.log('okay');

					// Add to backend
				},
			},
		},
	];
	const trigger = '/';

	const getTextAfterTrigger = (search: string) => {
		const indexOfTrigger = search.lastIndexOf(trigger);
		return indexOfTrigger !== -1
			? search.substring(indexOfTrigger + 1)
			: search;
	};

	return (
		<>
			<Combobox
				id='1'
				onSelectItem={(editor, item) => {
					// Keep deleting backwards until you see the '/', then delete one more.
					// console.log('editor.selection: ', editor.selection);

					if (editor.selection) {
						while (editor.selection.anchor.offset > 0) {
							const before = editor.before(editor.selection);
							if (before) {
								const beforeRange = editor.range(
									before,
									editor.selection
								);
								const beforeText = editor.string(beforeRange);
								// console.log(beforeText);

								deleteBackward(editor, { unit: 'character' });
								if (beforeText === '/') {
									// The text right before the current selection is '/'
									item.data.onPress();
									break;
								}
							}
						}
					}

					// the combobox is getting overridden by the exitbreakline on headers.
				}}
				trigger={trigger}
				component={(store) => {
					return <BlockMenu></BlockMenu>;
				}}
				items={items}
				onRenderItem={({ search, item }) => {
					if (item.data.customRender) return item.data.customRender();
					return <div>{item.text}</div>;
				}}
				searchPattern={'\\S+'}
				filter={(search: string) => (value) =>
					value.data.searchFunction(
						getTextAfterTrigger(search.toLowerCase())
					)}
				// value.toLowerCase().startsWith(search.toLowerCase())}
			/>{' '}
			{/* <Combobox
				id={'nodes'}
				controlled
				onSelectItem={() => {
					console.log('hmm');
				}}
				// {...props}
			/> */}
		</>
	);
};

// On fixing trigger
// The issue lies in the getTextFromTrigger function. This function is responsible for determining when the combobox should be activated. It does this by checking if the text matches the trigger and searchPattern parameters.

// The trigger parameter is a string that represents the character(s) that should activate the combobox. The searchPattern parameter is a regular expression that represents the pattern of text that should be considered a match.

// The function works by iterating backwards from the current cursor position (at) until it finds a character that doesn't match the searchPattern. It then checks if the resulting text matches the trigger parameter.

// The problem is that the function stops iterating when it encounters a whitespace character, because whitespace characters do not match the searchPattern ('\\S+', which matches any non-whitespace character).

// To fix this, you need to modify the getTextFromTrigger function to keep iterating until it encounters a whitespace character that is not immediately followed by the trigger character. This can be done by adding a check for the trigger character inside the while loop.

// Here's how you can modify the getTextFromTrigger function:
// }

// This modification will make the function keep iterating when it encounters a whitespace character that is immediately followed by the trigger character, which should make the combobox appear when / is typed after any character.
