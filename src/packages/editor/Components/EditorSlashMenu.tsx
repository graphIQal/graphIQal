import { TippyProps } from '@tippyjs/react';
import {
	Combobox,
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	getPluginType,
	insertNodes,
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

export const EditorSlashMenu = ({ children }: { children?: ReactNode }) => {
	const editor = useMyPlateEditorRef();

	const items = [
		{
			key: '1',
			text: 'Header 1',
			data: {
				onPress: () => {
					insertNodes(editor, {
						type: getPluginType(editor, ELEMENT_H1),
						children: [{ text: '' }],
					} as MyH1Element);
				},
			},
		},
		{
			key: '2',
			text: 'Header 2',
			data: {
				onPress: () => {
					insertNodes(editor, {
						type: getPluginType(editor, ELEMENT_H2),
						children: [{ text: '' }],
					} as MyH2Element);
				},
			},
		},
		{
			key: '3',
			text: 'Header 3',
			data: {
				onPress: () => {
					insertNodes(editor, {
						type: getPluginType(editor, ELEMENT_H3),
						children: [{ text: '' }],
					} as MyH3Element);
				},
			},
		},
		{
			key: '99',
			text: 'move to start',
			data: {
				onPress: () => {
					Transforms.moveNodes(editor as any, { to: [0] });
				},
			},
		},
	];

	return (
		<Combobox
			id='1'
			onSelectItem={(editor, item) => {
				// had to go through a SHIT load of stuff, finally figured out undo is working but honestly it's kinda hacky no?
				editor.undo();
				item.data.onPress();
			}}
			trigger='/'
			component={(store) => {
				return <BlockMenu></BlockMenu>;
			}}
			items={items}
			onRenderItem={({ search, item }) => {
				return <text>{item.text}</text>;
			}}
		/>
	);
};
