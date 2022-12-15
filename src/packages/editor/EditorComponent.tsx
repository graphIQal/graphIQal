import {
	createPluginFactory,
	createPlugins,
	ELEMENT_PARAGRAPH,
	HotkeyPlugin,
	onKeyDownToggleElement,
	Plate,
} from '@udecode/plate';
import React from 'react';
import { editableProps } from './editableProps';
import { Block } from './Elements/Elements';
import { MyParagraphElement, MyValue } from './plateTypes';

const initialValue = [
	{
		type: 'p',
		children: [
			{
				text: 'This is editable plain text with react and history plugins, just like a <textarea>!',
			},
		],
	} as MyParagraphElement,
];

const plugins = createPlugins(plugins, {
	components: {
		[ELEMENT_PARAGRAPH]: Block,
	},
});

const EditorComponent: React.FC = () => (
	<Plate<MyValue>
		editableProps={editableProps}
		initialValue={initialValue}
		plugins={plugins}
	/>
);

export default EditorComponent;
