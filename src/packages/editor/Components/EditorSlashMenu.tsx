import { TippyProps } from '@tippyjs/react';
import {
	Combobox,
	deleteBackward,
	deleteText,
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	getPluginType,
	insertNodes,
	isSelectionAtBlockStart,
	setNodes,
} from '@udecode/plate';
import { ReactNode } from 'react';
import { Transforms } from 'slate';
import BlockMenu from '../../../components/organisms/BlockMenu';
import {
	MyH1Element,
	MyH2Element,
	MyH3Element,
	useMyPlateEditorRef,
} from '../plateTypes';

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
	const editor = useMyPlateEditorRef();

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
				onPress: () => {
					console.log('okay');
					// Create new page
					// If there is a connection type, add
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
					// Create new page
					// If there is a connection type, add
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
					// Create new page
					// If there is a connection type, add
				},
			},
		},
		{
			key: '2',
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
