import React, { ReactNode } from 'react';
import { FormatBold } from '@styled-icons/material/FormatBold';
import { FormatItalic } from '@styled-icons/material/FormatItalic';
import { FormatUnderlined } from '@styled-icons/material/FormatUnderlined';
import { TippyProps } from '@tippyjs/react';
import {
	BalloonToolbar,
	getPluginType,
	MARK_BOLD,
	MARK_ITALIC,
	MARK_UNDERLINE,
	MarkToolbarButton,
	Combobox,
	insertNode,
	ELEMENT_H1,
	insertNodes,
	ELEMENT_H2,
	ELEMENT_H3,
	deleteBackward,
	deleteText,
	deleteFragment,
	isCollapsed,
	getPointBefore,
	getPointBeforeLocation,
	select,
	insertText,
	collapseSelection,
} from '@udecode/plate';
import {
	ELEMENT_NODE,
	MyH1Element,
	MyH2Element,
	MyH3Element,
	MyNodeElement,
	useMyPlateEditorRef,
} from '../plateTypes';
import BlockMenuOrg from '../../../components/organisms/BlockMenu/BlockMenuOrg';
import { BaseRange, Transforms } from 'slate';

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
			key: '4',
			text: 'Node',
			data: {
				onPress: () => {
					insertNodes(editor, {
						type: getPluginType(editor, ELEMENT_NODE),
						children: [{ text: '' }],
					} as MyNodeElement);
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
				console.log(editor.selection);

				const selection = editor.selection as BaseRange;

				const startMarkup = '/';

				const startMarkupPointBefore = getPointBeforeLocation(
					editor,
					selection.anchor,
					{
						matchString: startMarkup,
						skipInvalid: true,
					}
				);

				console.log(startMarkupPointBefore);
				const markupRange: BaseRange = {
					anchor: startMarkupPointBefore,
					focus: selection.anchor,
				};

				// This emoji plugin uses slate transforms to find the appropriate range
				// https://github.com/udecode/plate/commit/777bd42de939deba98d0da5c718660b540f33b7f
				select(editor, markupRange);
				insertText(editor, '');
				collapseSelection(editor, { edge: 'end' });

				item.data.onPress();
			}}
			trigger='/'
			component={(store) => {
				return <BlockMenuOrg></BlockMenuOrg>;
			}}
			items={items}
			onRenderItem={({ search, item }) => {
				return <text>{item.text}</text>;
			}}
		/>
	);
};
