import { TippyProps } from '@tippyjs/react';
import {
	Combobox,
	deleteBackward,
	deleteText,
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
import { Transforms } from 'slate';
import BlockMenu from '../../../components/organisms/BlockMenu';
import {
	ELEMENT_NODELINK,
	MyH1Element,
	MyH2Element,
	MyH3Element,
	MyNodeLinkElement,
	useMyPlateEditorRef,
} from '../plateTypes';
import { createNodeInDocument } from '../../../backend/functions/node/mutate/createNodeInDocument';
import { useViewData } from '../../../components/context/ViewContext';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
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
					if ('create'.startsWith(search)) {
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
						console.log('inserting');
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
						console.log('inserting');
						insertNodes(editor, {
							type: getPluginType(editor, ELEMENT_H3),
							children: [{ text: '' }],
						});
					}
				},
			},
		},
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

	return (
		<Combobox
			id='1'
			onSelectItem={(editor, item) => {
				// had to go through a SHIT load of stuff, finally figured out undo is working but honestly it's kinda hacky no?
				// editor.undo();
				deleteBackward(editor, { unit: 'word' });
				item.data.onPress();

				// the combobox is getting overridden by the exitbreakline on headers.
			}}
			trigger='/'
			component={(store) => {
				return <BlockMenu></BlockMenu>;
			}}
			items={items}
			onRenderItem={({ search, item }) => {
				if (item.data.customRender) return item.data.customRender();
				return <div>{item.text}</div>;
			}}
			searchPattern={'.+'}
			filter={(search: string) => (value) =>
				value.data.searchFunction(search.toLowerCase())}
			// value.toLowerCase().startsWith(search.toLowerCase())}
		/>
	);
};
