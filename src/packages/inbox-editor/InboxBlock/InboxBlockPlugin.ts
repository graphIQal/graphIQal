import { HotkeyPlugin, onKeyDownToggleElement } from '@udecode/plate';
import React from 'react';
import { withDraggable } from '../../dnd-editor/components/withDraggable';
import { createMyPluginFactory, ELEMENT_BLOCK } from '../../editor/plateTypes';
import { withBlock } from '../../editor/Plugins/NestedBlocksPlugin/withBlock';
import { InboxBlock } from './InboxBlock';

export const createShelfBlockPlugin = createMyPluginFactory<HotkeyPlugin>({
	key: ELEMENT_BLOCK,
	component: withDraggable(InboxBlock),
	isElement: true,
	handlers: {
		onKeyDown: onKeyDownToggleElement,
	},
	options: {
		hotkey: ['cmd+k'],
	},
	withOverrides: withBlock,
	deserializeHtml: {
		rules: [
			{
				validNodeName: 'P',
			},
		],
		query: (el) => el.style.fontFamily !== 'Consolas',
	},
});
