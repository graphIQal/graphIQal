import {
	deleteBackward,
	ELEMENT_BLOCKQUOTE,
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	ELEMENT_LI,
	ELEMENT_TABLE,
	ELEMENT_TODO_LI,
	getPath,
	getPluginType,
	insertNodes,
	isSelectionAtBlockStart,
	removeNodes,
	setNodes,
	someNode,
	TComboboxItemWithData,
} from '@udecode/plate';
import { ReactNode, useEffect, useState } from 'react';
import BlockMenu from '../../../components/organisms/BlockMenu';

import {
	ELEMENT_BLOCK,
	ELEMENT_COLUMN,
	ELEMENT_COLUMN_PARENT,
	ELEMENT_DIVIDER,
	ELEMENT_GROUP,
	ELEMENT_NODE,
	ELEMENT_NODELINK,
	ELEMENT_NODETITLE,
	MyBlockElement,
	MyEditor,
	MyGroupElement,
	MyH1Element,
	MyH2Element,
	MyNodeElement,
	MyNodeLinkElement,
	useMyPlateEditorRef,
} from '../plateTypes';

import { fetcher, fetcherSingleReturn } from '@/backend/driver/fetcher';
import { addBlockToInbox } from '@/backend/functions/node/mutate/addBlockToInbox';
import { createConnection } from '@/backend/functions/node/mutate/createConnection';
import NodeIcon from '@/components/atoms/NodeIcon';
import { Icons } from '@/components/icons';
import IconTitle from '@/components/molecules/IconTitle';
import { Combobox } from '@/components/plate-ui/combobox';
import { useToast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import { v4 as uuidv4, v4 } from 'uuid';
import { createNodeInDocument } from '../../../backend/functions/node/mutate/createNodeInDocument';
import { useViewData } from '../../../components/context/ViewContext';
import {
	getClosestBlock,
	getClosestNode,
	getClosestNodeId,
} from '../helpers/getClosestBlock';
import { formatList } from '../Plugins/Autoformat/autoformatUtils';
import { ConnectionTypes, NodeDataType } from '@/backend/schema';
import { emptyDocumentValue } from '@/packages/dnd-editor/Document';
import { deleteConnectionAPI } from '@/backend/functions/node/mutate/deleteConnection';

// export const markTooltip: TippyProps = {
// 	arrow: true,
// 	delay: 0,
// 	duration: [200, 0],
// 	hideOnClick: false,
// 	offset: [0, 17],
// 	placement: 'top',
// };

type item = {
	key: string;
	text: string;
	onPress: () => void;
	n: {
		searchFunction: (string: string) => boolean;
		icon?: string;
		customRender?: () => JSX.Element;
		subtext: string;
	};
};

type ExtendedItem = TComboboxItemWithData<item> & item & { n: NodeDataType };

const getTextAfterTrigger = (search: string, trigger: string) => {
	const indexOfTrigger = search.lastIndexOf(trigger);
	return indexOfTrigger !== -1
		? search.substring(indexOfTrigger + 1)
		: search;
};

// const [comboBoxOpen, setComboBoxOpen] = useState(false);

export const EditorSlashMenu = ({ children }: { children?: ReactNode }) => {
	const router = useRouter();
	const editor = useMyPlateEditorRef();
	const { nodeId, username } = useViewData();

	const {
		data: nodeDataSWR,
		isLoading,
		mutate: SWRmutateCurrNode,
	} = useSWR(
		[nodeId ? `/api/username/${nodeId}` : null],
		fetcherSingleReturn,
		{
			revalidateOnMount: false,
			revalidateOnFocus: false,
		}
	);

	const { toast } = useToast();

	const items: item[] = [
		{
			key: 'connect',
			text: 'Connect',
			n: {
				subtext: 'Connect this node to another node',
				icon: 'connect',
				searchFunction: (search) => {
					if ('connect'.startsWith(search)) {
						return true;
					}
					return false;
				},
			},
			onPress: () => {
				const { selection } = editor;
				if (selection) {
					let cursor = selection.anchor;
					let beforeText = '';
					while (cursor.offset > 0) {
						const before = editor.before(cursor);
						if (before) {
							const beforeRange = editor.range(before, cursor);
							const text = editor.string(beforeRange);
							if (text === '/') {
								break;
							}
							beforeText = text + beforeText;
							cursor = before;
						}
					}
					const match = 'connect'.startsWith(beforeText)
						? beforeText
						: '';
					const remainingText = 'connect'.slice(match.length);
					editor.insertText(remainingText);
					editor.insertText(':');
					// editor.insertText(' @');
				}

				// setnodeSearchOpen(true);
			},
		},
		{
			key: 'group',
			text: 'Group',
			n: {
				subtext: 'Create a group',
				icon: 'group',
				searchFunction: (search) => {
					if ('group'.startsWith(search)) {
						return true;
					}
					return false;
				},
			},
			onPress: async () => {
				// Add to backend
				const newId = uuidv4();

				insertNodes(editor, {
					type: getPluginType(editor, ELEMENT_GROUP),
					id: newId,
					children: [{ text: 'Group' }],
					filters: {
						PARENTS: [
							{
								children: nodeDataSWR.n.children,
								icon: nodeDataSWR.n.icon,
								id: nodeDataSWR.n.id,
								title: nodeDataSWR.n.title,
							},
						],
					},
				} as MyGroupElement);
			},
		},
		{
			key: '1',
			text: 'Create Node',
			n: {
				subtext: 'Create a new node here',
				icon: 'plusCircle',
				searchFunction: (search) => {
					// console.log('search ', search);
					if (
						'create node'.startsWith(search) ||
						'page'.startsWith(search)
					) {
						return true;
					}
					return false;
				},
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
		{
			key: 'create_inline_node',
			text: 'Create Inline Node',
			n: {
				subtext: 'Create expanded new node here',
				icon: 'plusCircle',
				searchFunction: (search) => {
					// console.log('search ', search);
					if (
						'create node inline'.startsWith(search) ||
						'create inline node '.startsWith(search) ||
						'page inlne'.startsWith(search)
					) {
						return true;
					}
					return false;
				},
			},
			onPress: async () => {
				// Add to backend
				const newId = uuidv4();

				// Create new page in frontend
				insertNodes(editor, {
					type: getPluginType(editor, ELEMENT_NODE),
					id: newId,
					nodeId: newId,
					routeString: `/${username}/${newId}`,
					icon: 'node',
					title: 'Untitled',
					children: [
						{
							type: ELEMENT_NODETITLE,
							routeString: `/${username}/${newId}`,
							icon: 'node',
							children: [{ text: 'Untitled' }],
						},
						{
							type: 'block',
							id: uuidv4(),
							children: [
								{
									type: 'p',
									id: uuidv4(),
									children: [{ text: '' }],
								},
							],
						},
						{
							type: 'block',
							id: uuidv4(),
							children: [
								{
									type: 'p',
									id: uuidv4(),
									children: [{ text: '' }],
								},
							],
						},
					],
				} as MyNodeElement);

				editor.move({ distance: 1, unit: 'character', reverse: true });

				const res = await createNodeInDocument(
					nodeId,
					username,
					'HAS',
					newId
				);
			},
		},
		{
			key: 'disconnect',
			text: 'disconnect',
			n: {
				subtext: 'disconnect this node from another node',
				icon: 'disconnect',
				searchFunction: (search) => {
					if ('disconnect'.startsWith(search)) {
						return true;
					}
					return false;
				},
			},
			onPress: () => {
				const { selection } = editor;
				if (selection) {
					let cursor = selection.anchor;
					let beforeText = '';
					while (cursor.offset > 0) {
						const before = editor.before(cursor);
						if (before) {
							const beforeRange = editor.range(before, cursor);
							const text = editor.string(beforeRange);
							if (text === '/') {
								break;
							}
							beforeText = text + beforeText;
							cursor = before;
						}
					}
					const match = 'disconnect'.startsWith(beforeText)
						? beforeText
						: '';
					const remainingText = 'disconnect'.slice(match.length);
					editor.insertText(remainingText);
					editor.insertText(':');
				}

				// setnodeSearchOpen(true);
			},
		},
		{
			key: 'divider',
			text: 'Divider',
			n: {
				subtext: 'Visually divide blocks',
				icon: 'minus',
				searchFunction: (search) => {
					if ('divider'.startsWith(search)) {
						return true;
					}
					return false;
				},
			},
			onPress: async () => {
				insertNodes(editor, {
					type: getPluginType(editor, ELEMENT_DIVIDER),
					children: [{ text: '' }],
				});
			},
		},
		{
			key: 'quote',
			text: 'Quote',
			n: {
				subtext: 'Capture a quote',
				icon: 'quote',
				searchFunction: (search) => {
					if ('quote'.startsWith(search)) {
						return true;
					}
					return false;
				},
			},
			onPress: async () => {
				insertNodes(editor, {
					type: getPluginType(editor, ELEMENT_BLOCKQUOTE),
					children: [{ text: '' }],
				});
			},
		},
		{
			key: 'column',
			text: 'Column',
			n: {
				subtext: 'Create a Column',
				icon: 'columns',
				searchFunction: (search) => {
					if ('columns'.startsWith(search)) {
						return true;
					}
					return false;
				},
			},
			onPress: async () => {
				insertNodes(editor, {
					type: getPluginType(editor, ELEMENT_COLUMN_PARENT),
					children: [
						{
							type: ELEMENT_COLUMN,
							id: v4(),
							children: [
								{
									type: ELEMENT_BLOCK,
									children: [{ text: '' }],
									id: v4(),
								},
							],
						},
						{
							type: ELEMENT_COLUMN,
							id: v4(),
							children: [
								{
									type: ELEMENT_BLOCK,
									children: [{ text: '' }],
									id: v4(),
								},
							],
						},
					],
				});
			},
		},
		// {
		// 	key: 'table',
		// 	text: 'Table',
		// 	n: {
		// 		subtext: 'Create a table',
		// 		icon: 'table',
		// 		searchFunction: (search) => {
		// 			if ('table'.startsWith(search)) {
		// 				return true;
		// 			}
		// 			return false;
		// 		},
		// 	},
		// 	onPress: async () => {
		// 		insertNodes(editor, {
		// 			type: getPluginType(editor, ELEMENT_TABLE),
		// 			children: [{ text: '' }],
		// 		});
		// 	},
		// },
		{
			key: 'nodelink',
			text: 'NodeLink',
			n: {
				subtext: 'Add a link to a node',
				icon: 'nodeLink',
				searchFunction: (search) => {
					if ('nodelink'.startsWith(search)) {
						return true;
					}
					return false;
				},
			},
			onPress: () => {
				const { selection } = editor;
				if (selection) {
					let cursor = selection.anchor;
					let beforeText = '';
					while (cursor.offset > 0) {
						const before = editor.before(cursor);
						if (before) {
							const beforeRange = editor.range(before, cursor);
							const text = editor.string(beforeRange);
							if (text === '/') {
								break;
							}
							beforeText = text + beforeText;
							cursor = before;
						}
					}
					const match = 'nodeLink'.startsWith(beforeText)
						? beforeText
						: '';
					const remainingText = 'nodeLink'.slice(match.length);
					editor.insertText(remainingText);
					editor.insertText(' @');
				}
			},
		},
		{
			key: 'add_node',
			text: 'Add Node',
			n: {
				subtext: 'Add existing node to document',
				icon: 'plus',
				searchFunction: (search) => {
					if ('addnode'.startsWith(search)) {
						return true;
					}
					return false;
				},
			},
			onPress: async () => {
				const { selection } = editor;
				if (selection) {
					let cursor = selection.anchor;
					let beforeText = '';
					while (cursor.offset > 0) {
						const before = editor.before(cursor);
						if (before) {
							const beforeRange = editor.range(before, cursor);
							const text = editor.string(beforeRange);
							if (text === '/') {
								break;
							}
							beforeText = text + beforeText;
							cursor = before;
						}
					}
					const match = 'addNode'.startsWith(beforeText)
						? beforeText
						: '';
					const remainingText = 'addNode'.slice(match.length);
					editor.insertText(remainingText);
					editor.insertText(' @');
				}
			},
		},
		{
			key: 'send_block',
			text: 'Send block to',
			n: {
				subtext: 'Send Block to',
				icon: 'send',
				searchFunction: (search) => {
					if ('send to'.startsWith(search)) {
						return true;
					}
					return false;
				},
			},
			onPress: () => {
				const { selection } = editor;
				if (selection) {
					let cursor = selection.anchor;
					let beforeText = '';
					while (cursor.offset > 0) {
						const before = editor.before(cursor);
						if (before) {
							const beforeRange = editor.range(before, cursor);
							const text = editor.string(beforeRange);
							if (text === '/') {
								break;
							}
							beforeText = text + beforeText;
							cursor = before;
						}
					}
					const match = 'send_block'.startsWith(beforeText)
						? beforeText
						: '';
					const remainingText = 'send_block'.slice(match.length);
					editor.insertText(remainingText);
					editor.insertText(' @');
				}
			},
		},
		{
			key: 'send_node',
			text: 'Send Node to',
			n: {
				subtext: 'Send Node to',
				icon: 'send',
				searchFunction: (search) => {
					if ('send node to'.startsWith(search)) {
						return true;
					}
					return false;
				},
			},
			onPress: () => {
				const { selection } = editor;
				if (selection) {
					let cursor = selection.anchor;
					let beforeText = '';
					while (cursor.offset > 0) {
						const before = editor.before(cursor);
						if (before) {
							const beforeRange = editor.range(before, cursor);
							const text = editor.string(beforeRange);
							if (text === '/') {
								break;
							}
							beforeText = text + beforeText;
							cursor = before;
						}
					}
					const match = 'send_node'.startsWith(beforeText)
						? beforeText
						: '';
					const remainingText = 'send_node'.slice(match.length);
					editor.insertText(remainingText);
					editor.insertText(' @');
				}
			},
		},
		{
			key: 'h1',
			text: 'Header 1',
			n: {
				subtext: 'Big Section Heading',
				icon: 'h1',
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
		{
			key: 'h2',
			text: 'Header 2',
			n: {
				subtext: 'Medium Section Heading',
				icon: 'h2',
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
		{
			key: 'h3',
			text: 'Header 3',
			n: {
				subtext: 'Small Section Heading',
				icon: 'h3',
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
		{
			key: 'blist',
			text: 'Bullet List',
			n: {
				subtext: 'Bulleted List',
				icon: 'blist',
				searchFunction: (search) => {
					if ('Bullet List'.startsWith(search)) {
						return true;
					}
					return false;
				},
			},
			onPress: () => {
				formatList(editor, ELEMENT_LI);
			},
		},
		{
			key: 'tlist',
			text: 'Todo List',
			n: {
				subtext: 'To Do List',
				icon: 'todolist',
				searchFunction: (search) => {
					if (
						'checkbox'.startsWith(search) ||
						'todo list'.startsWith(search)
					) {
						return true;
					}
					return false;
				},
			},
			onPress: () => {
				formatList(editor, ELEMENT_TODO_LI);
			},
		},
		{
			key: 'connect:is',
			text: 'Connect with IS',
			n: {
				subtext: 'This node IS type of node @',
				icon: 'connect',
				searchFunction: (search) => {
					if (
						!search.startsWith('disconnect') &&
						(search.endsWith('is') ||
							search.endsWith('i') ||
							search.endsWith(':'))
					) {
						return true;
					}
					return false;
				},
			},
			onPress: () => {
				const { selection } = editor;
				if (selection) {
					let cursor = selection.anchor;
					let beforeText = '';
					while (cursor.offset > 0) {
						const before = editor.before(cursor);
						if (before) {
							const beforeRange = editor.range(before, cursor);
							const text = editor.string(beforeRange);
							if (text === '/') {
								break;
							}
							beforeText = text + beforeText;
							cursor = before;
						}
					}
					const match = 'connect:is'.startsWith(beforeText)
						? beforeText
						: '';
					const remainingText = 'connect:is'.slice(match.length);
					editor.insertText(remainingText);
					editor.insertText(' @');
				}
			},
		},
		{
			key: 'connect:parent',
			text: 'Connect to parent node',
			n: {
				subtext: 'This node is the Parent of node @',
				icon: 'connect',
				searchFunction: (search) => {
					if (
						!search.startsWith('disconnect') &&
						(search.endsWith('parent') ||
							search.endsWith('paren') ||
							search.endsWith('pare') ||
							search.endsWith('par') ||
							search.endsWith('pa') ||
							search.endsWith('p') ||
							search.endsWith(':'))
					) {
						return true;
					}
					return false;
				},
			},
			onPress: () => {
				const { selection } = editor;
				if (selection) {
					let cursor = selection.anchor;
					let beforeText = '';
					while (cursor.offset > 0) {
						const before = editor.before(cursor);
						if (before) {
							const beforeRange = editor.range(before, cursor);
							const text = editor.string(beforeRange);
							if (text === '/') {
								break;
							}
							beforeText = text + beforeText;
							cursor = before;
						}
					}
					const match = 'connect:parent'.startsWith(beforeText)
						? beforeText
						: '';
					const remainingText = 'connect:parent'.slice(match.length);
					editor.insertText(remainingText);
					editor.insertText(' @');
				}
			},
		},
		{
			key: 'connect:child',
			text: 'Connect to child node',
			n: {
				subtext: 'This node is the Parent of node @',
				icon: 'connect',
				searchFunction: (search) => {
					if (
						!search.startsWith('disconnect') &&
						(search.endsWith(':') ||
							search.endsWith('c') ||
							search.endsWith('ch') ||
							search.endsWith('chi') ||
							search.endsWith('chil') ||
							search.endsWith('child'))
					) {
						return true;
					}
					return false;
				},
			},
			onPress: () => {
				const { selection } = editor;
				if (selection) {
					let cursor = selection.anchor;
					let beforeText = '';
					while (cursor.offset > 0) {
						const before = editor.before(cursor);
						if (before) {
							const beforeRange = editor.range(before, cursor);
							const text = editor.string(beforeRange);
							if (text === '/') {
								break;
							}
							beforeText = text + beforeText;
							cursor = before;
						}
					}
					const match = 'connect:child'.startsWith(beforeText)
						? beforeText
						: '';
					const remainingText = 'connect:child'.slice(match.length);
					editor.insertText(remainingText);
					editor.insertText(' @');
				}

				// setnodeSearchOpen(true);
			},
		},
		{
			key: 'connect:needs',
			text: 'Connect to needed node',
			n: {
				subtext: 'This node NEEDS node @',
				icon: 'connect',
				searchFunction: (search) => {
					if (
						!search.startsWith('disconnect') &&
						(search.endsWith(':') ||
							search.endsWith('n') ||
							search.endsWith('ne') ||
							search.endsWith('nee') ||
							search.endsWith('need') ||
							search.endsWith('needs'))
					) {
						return true;
					}
					return false;
				},
			},
			onPress: () => {
				const { selection } = editor;
				if (selection) {
					let cursor = selection.anchor;
					let beforeText = '';
					while (cursor.offset > 0) {
						const before = editor.before(cursor);
						if (before) {
							const beforeRange = editor.range(before, cursor);
							const text = editor.string(beforeRange);
							if (text === '/') {
								break;
							}
							beforeText = text + beforeText;
							cursor = before;
						}
					}
					const match = 'connect:needs'.startsWith(beforeText)
						? beforeText
						: '';
					const remainingText = 'connect:needs'.slice(match.length);
					editor.insertText(remainingText);
					editor.insertText(' @');
				}
			},
		},
		{
			key: 'connect:related',
			text: 'Connect to related node',
			n: {
				subtext: 'This node is RELATED to node @',
				icon: 'connect',
				searchFunction: (search) => {
					if (
						!search.startsWith('disconnect') &&
						(search.endsWith(':') ||
							search.endsWith('r') ||
							search.endsWith('re') ||
							search.endsWith('rel') ||
							search.endsWith('rela') ||
							search.endsWith('relat') ||
							search.endsWith('relate') ||
							search.endsWith('related'))
					) {
						return true;
					}
					return false;
				},
			},
			onPress: () => {
				const { selection } = editor;
				if (selection) {
					let cursor = selection.anchor;
					let beforeText = '';
					while (cursor.offset > 0) {
						const before = editor.before(cursor);
						if (before) {
							const beforeRange = editor.range(before, cursor);
							const text = editor.string(beforeRange);
							if (text === '/') {
								break;
							}
							beforeText = text + beforeText;
							cursor = before;
						}
					}
					const match = 'connect:related'.startsWith(beforeText)
						? beforeText
						: '';
					const remainingText = 'connect:related'.slice(match.length);
					editor.insertText(remainingText);
					editor.insertText(' @');
				}
			},
		},
		{
			key: 'disconnect:is',
			text: 'Disconnect IS',
			n: {
				subtext: 'This node will not be @',
				icon: 'disconnect',
				searchFunction: (search) => {
					if (
						!search.startsWith('connect') &&
						(search.endsWith('is') ||
							search.endsWith('i') ||
							search.endsWith(':'))
					) {
						return true;
					}
					return false;
				},
			},
			onPress: () => {
				const { selection } = editor;
				if (selection) {
					let cursor = selection.anchor;
					let beforeText = '';
					while (cursor.offset > 0) {
						const before = editor.before(cursor);
						if (before) {
							const beforeRange = editor.range(before, cursor);
							const text = editor.string(beforeRange);
							if (text === '/') {
								break;
							}
							beforeText = text + beforeText;
							cursor = before;
						}
					}
					const match = 'disconnect:is'.startsWith(beforeText)
						? beforeText
						: '';
					const remainingText = 'disconnect:is'.slice(match.length);
					editor.insertText(remainingText);
					editor.insertText(' @');
				}
			},
		},

		{
			key: 'disconnect:parent',
			text: 'Disconnect from parent node',
			n: {
				subtext: 'This node will not be the child of node @',
				icon: 'disconnect',
				searchFunction: (search) => {
					if (
						!search.startsWith('connect') &&
						(search.endsWith('parent') ||
							search.endsWith('paren') ||
							search.endsWith('pare') ||
							search.endsWith('par') ||
							search.endsWith('pa') ||
							search.endsWith('p') ||
							search.endsWith(':'))
					) {
						return true;
					}
					return false;
				},
			},
			onPress: () => {
				const { selection } = editor;
				if (selection) {
					let cursor = selection.anchor;
					let beforeText = '';
					while (cursor.offset > 0) {
						const before = editor.before(cursor);
						if (before) {
							const beforeRange = editor.range(before, cursor);
							const text = editor.string(beforeRange);
							if (text === '/') {
								break;
							}
							beforeText = text + beforeText;
							cursor = before;
						}
					}
					const match = 'disconnect:parent'.startsWith(beforeText)
						? beforeText
						: '';
					const remainingText = 'disconnect:parent'.slice(
						match.length
					);
					editor.insertText(remainingText);
					editor.insertText(' @');
				}
			},
		},
		{
			key: 'disconnect:related',
			text: 'Disconnect from related node',
			n: {
				subtext: 'This node will not be RELATED to node @',
				icon: 'disconnect',
				searchFunction: (search) => {
					if (
						!search.startsWith('connect') &&
						(search.endsWith('related') ||
							search.endsWith('relate') ||
							search.endsWith('relat') ||
							search.endsWith('rela') ||
							search.endsWith('rel') ||
							search.endsWith('re') ||
							search.endsWith('r') ||
							search.endsWith(':'))
					) {
						return true;
					}
					return false;
				},
			},
			onPress: () => {
				const { selection } = editor;
				if (selection) {
					let cursor = selection.anchor;
					let beforeText = '';
					while (cursor.offset > 0) {
						const before = editor.before(cursor);
						if (before) {
							const beforeRange = editor.range(before, cursor);
							const text = editor.string(beforeRange);
							if (text === '/') {
								break;
							}
							beforeText = text + beforeText;
							cursor = before;
						}
					}
					const match = 'disconnect:related'.startsWith(beforeText)
						? beforeText
						: '';
					const remainingText = 'disconnect:related'.slice(
						match.length
					);
					editor.insertText(remainingText);
					editor.insertText(' @');
				}
			},
		},
		{
			key: 'disconnect:child',
			text: 'Disconnect from child node',
			n: {
				subtext: 'This node will not be the parent of node @',
				icon: 'disconnect',
				searchFunction: (search) => {
					if (
						!search.startsWith('connect') &&
						(search.endsWith('child') ||
							search.endsWith('chil') ||
							search.endsWith('chi') ||
							search.endsWith('ch') ||
							search.endsWith('c') ||
							search.endsWith(':'))
					) {
						return true;
					}
					return false;
				},
			},
			onPress: () => {
				const { selection } = editor;
				if (selection) {
					let cursor = selection.anchor;
					let beforeText = '';
					while (cursor.offset > 0) {
						const before = editor.before(cursor);
						if (before) {
							const beforeRange = editor.range(before, cursor);
							const text = editor.string(beforeRange);
							if (text === '/') {
								break;
							}
							beforeText = text + beforeText;
							cursor = before;
						}
					}
					const match = 'disconnect:child'.startsWith(beforeText)
						? beforeText
						: '';
					const remainingText = 'disconnect:child'.slice(
						match.length
					);
					editor.insertText(remainingText);
					editor.insertText(' @');
				}
			},
		},
		{
			key: 'disconnect:needs',
			text: 'Disconnect from needed node',
			n: {
				subtext: 'This will not NEED node @',
				icon: 'disconnect',
				searchFunction: (search) => {
					if (
						!search.startsWith('connect') &&
						(search.endsWith('needs') ||
							search.endsWith('need') ||
							search.endsWith('nee') ||
							search.endsWith('ne') ||
							search.endsWith('n') ||
							search.endsWith(':'))
					) {
						return true;
					}
					return false;
				},
			},
			onPress: () => {
				const { selection } = editor;
				if (selection) {
					let cursor = selection.anchor;
					let beforeText = '';
					while (cursor.offset > 0) {
						const before = editor.before(cursor);
						if (before) {
							const beforeRange = editor.range(before, cursor);
							const text = editor.string(beforeRange);
							if (text === '/') {
								break;
							}
							beforeText = text + beforeText;
							cursor = before;
						}
					}
					const match = 'disconnect:needs'.startsWith(beforeText)
						? beforeText
						: '';
					const remainingText = 'disconnect:needs'.slice(
						match.length
					);
					editor.insertText(remainingText);
					editor.insertText(' @');
				}
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
	];

	const trigger = '/';

	const firstNodeOption = {
		n: {
			title: 'New node',
			icon: 'plusCircle',
		},
		text: 'New node',
		key: 'create',
		onPress: () => console.log('oy'),
	};

	const defaultOption = {
		n: {
			title: '',
		},
		text: '',
		key: 'default',
		onPress: () => console.log('oy'),
	};

	// const [nodeSearchOpen, setnodeSearchOpen] = useSate(true);
	const [searchVal, setsearchVal] = useState<string>('');

	const [nodeSearchResults, setnodeSearchResults] = useState<
		(Partial<NodeDataType> & {
			text: string;
			key: string;
			onPress: () => void;
		})[]
	>([firstNodeOption]);

	const { data: session, status } = useSession();

	const { data: searchResult } = useSWR(
		searchVal.length > 0
			? `/api/general/search?homenodeId=${session?.user?.homenodeId}&search=${searchVal}`
			: null,
		fetcher,
		{
			keepPreviousData: true,
		}
	);

	useEffect(() => {
		// console.log('node res: ', searchResult);
		if (searchResult) {
			setnodeSearchResults([...searchResult, firstNodeOption]);
		} else {
			setnodeSearchResults([firstNodeOption]);
		}
	}, [searchResult]);

	return (
		<>
			<Combobox
				id='1'
				onSelectItem={(editor, item) => {
					// Keep deleting backwards until you see the '/', then delete one more.
					// console.log('editor.selection: ', editor.selection);

					if (
						item.key === 'connect' ||
						item.key === 'disconnect' ||
						item.key === 'add_node' ||
						item.key === 'send_node' ||
						item.key === 'send_block' ||
						item.key === 'nodelink' ||
						item.key.startsWith('connect') ||
						item.key.startsWith('disconnect')
					) {
						item.onPress();
						return;
					}

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
									item.onPress();
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
					return (
						<div className='flex flex-row x-3 gap-x-2 items-center px-2'>
							<div className='w-8 h-8 bg-lining rounded-sm flex items-center justify-center'>
								{item.n.icon ? (
									item.n.icon in Icons ? (
										React.createElement(
											Icons[item.n.icon],
											{
												className: 'h-4 w-4',
											}
										)
									) : (
										<div>{item.n.icon}</div>
									)
								) : (
									<Icons.node className='h-4 w-4' />
								)}
							</div>
							<div>
								<div className='text-md'>{item.text}</div>
								<div className='text-sm opacity-70'>
									{item.n.subtext}
								</div>
							</div>
						</div>
					);
				}}
				searchPattern={'\\S+'}
				filter={(search: string) => (item) =>
					item.n.searchFunction
						? item.n.searchFunction(
								getTextAfterTrigger(
									search.toLowerCase(),
									trigger
								)
						  )
						: true}
			/>
			<Combobox
				id='nodeSearch'
				onSelectItem={(editor: MyEditor, item: ExtendedItem) => {
					// Keep deleting backwards until you see the '/', then delete one more.

					// Delete until the @
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
								if (beforeText === '@') {
									// The text right before the current selection is '/'
									break;
								}
							}
						}
					}

					// find id of item
					if (item.key === 'create') {
						return;
					}

					// find type of command.
					const { selection } = editor;
					if (selection) {
						let cursor = selection.anchor;
						let beforeText = '';
						while (cursor.offset > 0) {
							const before = editor.before(cursor);
							if (before) {
								const beforeRange = editor.range(
									before,
									cursor
								);
								const text = editor.string(beforeRange);
								if (text === '/') {
									break;
								}
								beforeText = text + beforeText;
								cursor = before;
							}
						}

						console.log('beforeText, ', beforeText);
						console.log(item);

						if (editor.selection) {
							while (editor.selection.anchor.offset > 0) {
								const before = editor.before(editor.selection);
								if (before) {
									const beforeRange = editor.range(
										before,
										editor.selection
									);
									const beforeText =
										editor.string(beforeRange);
									// console.log(beforeText);

									deleteBackward(editor, {
										unit: 'character',
									});
									if (beforeText === '/') {
										// The text right before the current selection is '/'
										break;
									}
								}
							}
						} else {
							return;
						}

						if (!item.n.id) return;

						// add_node or connect
						if (beforeText.startsWith('connect')) {
							// Find closestNode
							let node = getClosestNode(
								editor.selection.anchor.path,
								editor
							);

							const id = node ? node.nodeId : nodeId;

							if (beforeText.endsWith('is ')) {
								console.log('is');
								const { dismiss } = toast({
									title: (
										<div>
											<NodeIcon
												icon={
													node
														? node.icon
														: nodeDataSWR.n.icon
												}
											/>
											<span>
												{/* @ts-ignore */}
												{(node
													? node.children[0].text
													: editor.children[0]
															.children[0].text) +
													' is now '}
											</span>
											<NodeIcon icon={item.n.icon} />
											<span>{item.n.title}</span>
										</div>
									),
									description:
										'Connection of type IS created ',
								});

								setTimeout(() => {
									dismiss();
								}, 3000);

								createConnection({
									startNode: id,
									endNode: item.n.id,
									type: ConnectionTypes.IS,
								});
							} else if (beforeText.endsWith('parent ')) {
								const { dismiss } = toast({
									title: (
										<div>
											<NodeIcon
												icon={nodeDataSWR.n.icon}
											/>
											<span>
												{editor.children[0].children[0]
													.text +
													' is now a child of '}
											</span>
											<NodeIcon icon={item.n.icon} />
											<span>{item.n.title}</span>
										</div>
									),
									description:
										'Connection of type HAS created ',
								});

								setTimeout(() => {
									dismiss();
								}, 3000);

								createConnection({
									startNode: item.n.id,
									endNode: node,
									type: ConnectionTypes.HAS,
								});
							} else if (beforeText.endsWith('child ')) {
								const { dismiss } = toast({
									title: (
										<div>
											<NodeIcon
												icon={nodeDataSWR.n.icon}
											/>
											<span>
												{editor.children[0].children[0]
													.text +
													' is now a parent of '}
											</span>
											<NodeIcon icon={item.n.icon} />
											<span>{item.n.title}</span>
										</div>
									),
									description:
										'Connection of type HAS created ',
								});

								setTimeout(() => {
									dismiss();
								}, 3000);

								createConnection({
									startNode: node,
									endNode: item.n.id,
									type: ConnectionTypes.HAS,
								});
							} else if (beforeText.endsWith('needs ')) {
								const { dismiss } = toast({
									title: (
										<div>
											<NodeIcon
												icon={nodeDataSWR.n.icon}
											/>
											<span>
												{editor.children[0].children[0]
													.text + ' needs '}
											</span>
											<NodeIcon icon={item.n.icon} />
											<span>{item.n.title}</span>
										</div>
									),
									description:
										'Connection of type NEEDS created ',
								});

								setTimeout(() => {
									dismiss();
								}, 3000);

								createConnection({
									startNode: node,
									endNode: item.n.id,
									type: ConnectionTypes.NEEDS,
								});
							} else {
								// do 'related;
								const { dismiss } = toast({
									title: (
										<div>
											<NodeIcon
												icon={nodeDataSWR.n.icon}
											/>
											<span>
												{editor.children[0].children[0]
													.text +
													' is now related to '}
											</span>
											<NodeIcon icon={item.n.icon} />
											<span>{item.n.title}</span>
										</div>
									),
									description:
										'Connection of type RELATED created ',
								});

								setTimeout(() => {
									dismiss();
								}, 3000);

								createConnection({
									startNode: node,
									endNode: item.n.id,
									type: ConnectionTypes.RELATED,
								});
							}
						} else if (beforeText === 'addNode ') {
							console.log('add-node');
							console.log(item);

							if (
								someNode(editor, {
									match: { id: item.n.id },
									at: [],
								})
							) {
								const { dismiss } = toast({
									title: (
										<div>
											<NodeIcon icon='node' />
											<span>{'Can\t add add'}</span>
											<NodeIcon icon={item.n.icon} />
											<span>{item.n.title}</span>
										</div>
									),
									description:
										'An infinite loop would be created because current node already in ' +
										item.n.title,
								});

								setTimeout(() => {
									dismiss();
								}, 3000);

								return;
							}

							// create a connection HAS
							createConnection({
								startNode: nodeId,
								endNode: item.n.id,
								type: ConnectionTypes.HAS,
							});

							insertNodes(editor, {
								type: getPluginType(editor, ELEMENT_NODE),
								id: item.n.id,
								nodeId: item.n.id,
								routeString: `/${username}/${item.n.id}`,
								icon: item.n.icon ? item.n.icon : 'node',
								title: item.n.title,
								children: item.n.document
									? [
											{
												type: ELEMENT_NODETITLE,
												routeString: `/${username}/${item.n.id}`,
												icon: item.n.icon
													? item.n.icon
													: 'node',
												children: [
													{ text: item.n.title },
												],
											},
											...JSON.parse(item.n.document),
									  ]
									: [{ text: '' }],
							} as MyNodeElement);
						} else if (beforeText === 'send_block ') {
							// Send block to node inbox
							if (editor.selection) {
								const selection = getPath(
									editor,
									editor.selection.anchor
								);

								const closestBlock = getClosestBlock(
									selection,
									editor
								);

								if (closestBlock) {
									removeNodes(editor, {
										at: closestBlock[1],
									});

									// Attach block to inbox
									addBlockToInbox({
										nodeId: item.n.id,
										block: closestBlock[0] as MyBlockElement,
										nodeTitle: nodeDataSWR.n.title,
										icon: nodeDataSWR.n.icon,
										originNodeId: nodeDataSWR.n.id,
									});
								}

								const { dismiss } = toast({
									title: (
										<span className='flex flex-row'>
											<span>Block sent to </span>
											<IconTitle
												icon={item.n.icon}
												title={item.n.title}
											/>
											<span>'s inbox</span>
										</span>
									),
									description:
										'Undo will not unsend the block! Resolve in inbox!',
								});

								setTimeout(() => {
									dismiss();
								}, 3000);
							}
						} else if (beforeText === 'send_node ') {
							// Send block to node inbox
							if (editor.selection) {
								const selection = getPath(
									editor,
									editor.selection.anchor
								);

								const closestNode = getClosestNode(
									selection,
									editor
								);

								if (closestNode) {
									removeNodes(editor, {
										at: closestNode[1],
									});

									// Add connection to new node.

									// Remove current connection

									// Attach block to inbox
									addBlockToInbox({
										nodeId: item.n.id,
										block: closestNode[0] as MyBlockElement,
										nodeTitle: nodeDataSWR.n.title,
										icon: nodeDataSWR.n.icon,
										originNodeId: nodeDataSWR.n.id,
									});

									const { dismiss } = toast({
										title: (
											<span className='flex flex-row'>
												<span>Node sent to </span>
												<IconTitle
													icon={item.n.icon}
													title={item.n.title}
												/>
												<span>'s inbox</span>
											</span>
										),
										description:
											'Undo will not unsend the block! Resolve in inbox!',
									});

									setTimeout(() => {
										dismiss();
									}, 3000);
								}
							}
						} else if (beforeText.startsWith('disconnect')) {
							// Find closestNode
							let node = getClosestNode(
								editor.selection.anchor.path,
								editor
							);

							const id = node ? node.nodeId : nodeId;

							if (beforeText.endsWith('is ')) {
								console.log('is');
								const { dismiss } = toast({
									title: (
										<div>
											<NodeIcon
												icon={
													node
														? node.icon
														: nodeDataSWR.n.icon
												}
											/>
											<span>
												{/* @ts-ignore */}
												{(node
													? node.children[0].text
													: editor.children[0]
															.children[0].text) +
													' is not '}
											</span>
											<NodeIcon icon={item.n.icon} />
											<span>{item.n.title}</span>
										</div>
									),
									description: 'Disconnected type IS ',
								});

								setTimeout(() => {
									dismiss();
								}, 3000);

								deleteConnectionAPI({
									startNode: id,
									endNode: item.n.id,
									type: ConnectionTypes.IS,
								});
							} else if (beforeText.endsWith('parent ')) {
								const { dismiss } = toast({
									title: (
										<div>
											<NodeIcon
												icon={nodeDataSWR.n.icon}
											/>
											<span>
												{(node
													? node.children[0].text
													: editor.children[0]
															.children[0].text) +
													' is no longer a child of '}
											</span>
											<NodeIcon icon={item.n.icon} />
											<span>{item.n.title}</span>
										</div>
									),
									description:
										'Connection of type HAS deleted ',
								});

								setTimeout(() => {
									dismiss();
								}, 3000);

								deleteConnectionAPI({
									startNode: item.n.id,
									endNode: id,
									type: ConnectionTypes.HAS,
								});
							} else if (beforeText.endsWith('child ')) {
								const { dismiss } = toast({
									title: (
										<div>
											<NodeIcon
												icon={nodeDataSWR.n.icon}
											/>
											<span>
												{editor.children[0].children[0]
													.text +
													' is now no longer a parent of '}
											</span>
											<NodeIcon icon={item.n.icon} />
											<span>{item.n.title}</span>
										</div>
									),
									description:
										'Connection of type HAS deleted ',
								});

								setTimeout(() => {
									dismiss();
								}, 3000);

								deleteConnectionAPI({
									startNode: id,
									endNode: item.n.id,
									type: ConnectionTypes.HAS,
								});
							} else if (beforeText.endsWith('needs ')) {
								const { dismiss } = toast({
									title: (
										<div>
											<NodeIcon
												icon={nodeDataSWR.n.icon}
											/>
											<span>
												{editor.children[0].children[0]
													.text + " doesn't need "}
											</span>
											<NodeIcon icon={item.n.icon} />
											<span>{item.n.title}</span>
										</div>
									),
									description:
										'Connection of type NEEDS deleted ',
								});

								setTimeout(() => {
									dismiss();
								}, 3000);

								deleteConnectionAPI({
									startNode: id,
									endNode: item.n.id,
									type: ConnectionTypes.NEEDS,
								});
							} else {
								// do 'related;
								const { dismiss } = toast({
									title: (
										<div>
											<NodeIcon
												icon={nodeDataSWR.n.icon}
											/>
											<span>
												{editor.children[0].children[0]
													.text +
													' is no longer related to '}
											</span>
											<NodeIcon icon={item.n.icon} />
											<span>{item.n.title}</span>
										</div>
									),
									description:
										'Connection of type RELATED deleted',
								});

								setTimeout(() => {
									dismiss();
								}, 3000);

								deleteConnectionAPI({
									startNode: id,
									endNode: item.n.id,
									type: ConnectionTypes.RELATED,
								});

								deleteConnectionAPI({
									endNode: id,
									startNode: item.n.id,
									type: ConnectionTypes.RELATED,
								});
							}
						} else {
							// add node link
							console.log('add node link');

							createConnection({
								startNode: nodeId,
								endNode: item.n.id,
								type: ConnectionTypes.RELATED,
							});

							insertNodes(editor, {
								type: getPluginType(editor, ELEMENT_NODELINK),
								nodeId: item.n.id,
								routeString: `/${username}/${item.n.id}`,
								icon: item.n.icon ? item.n.icon : 'node',
								children: [{ text: item.n.title }],
							} as MyNodeLinkElement);
						}
					}
					// the combobox is getting overridden by the exitbreakline on headers.
				}}
				trigger={'@'}
				component={(store) => {
					return <BlockMenu></BlockMenu>;
				}}
				items={nodeSearchResults}
				// items={items}
				onRenderItem={({ search, item }) => {
					if (item.key === 'create') {
						const searchPattern = getTextAfterTrigger(
							search.toLowerCase(),
							'@'
						);
						// console.log('search, ', searchPattern);
						setsearchVal(searchPattern);
					}

					return (
						<div className='flex flex-row x-3 gap-x-2 items-center'>
							<NodeIcon icon={item.n.icon} />
							{item.key === 'create'
								? `new '${search.substring(
										search.indexOf('@') + 1
								  )}' node`
								: item.n.title}
						</div>
					);
				}}
				searchPattern={'.+'}
				filter={(search: string) => (value) => {
					// const searchPattern = getTextAfterTrigger(
					// 	search.toLowerCase(),
					// 	'@'
					// );
					// console.log('filter, ', searchPattern);
					// // console.log('searchPattern: ', searchPattern);
					// setsearchVal(searchPattern);
					return true;
				}}
			/>
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
