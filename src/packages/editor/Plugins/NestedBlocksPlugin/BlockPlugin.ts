import { HotkeyPlugin, onKeyDownToggleElement } from '@udecode/plate';
import React from 'react';
import Handle from '../../../../components/atoms/Handle';
import { withDraggable } from '../../../dnd-editor/components/withDraggable';
import { Block } from '../../Elements/Elements';
import { createMyPluginFactory, ELEMENT_BLOCK } from '../../plateTypes';
import { withBlock } from './withBlock';

export const createBlockPlugin = createMyPluginFactory<HotkeyPlugin>({
	key: ELEMENT_BLOCK,
	component: withDraggable(Block),
	isElement: true,
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
