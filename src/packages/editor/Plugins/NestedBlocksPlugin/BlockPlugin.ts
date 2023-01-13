import { HotkeyPlugin, onKeyDownToggleElement } from '@udecode/plate';
import { Block } from '../../Elements/Elements';
import { createMyPluginFactory, ELEMENT_BLOCK } from '../../plateTypes';
import { withBlock } from './withBlock';

export const createBlockPlugin = createMyPluginFactory<HotkeyPlugin>({
	key: ELEMENT_BLOCK,
	component: Block,
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
