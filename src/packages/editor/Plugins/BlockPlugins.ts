import {
	createBoldPlugin,
	createCodeBlockPlugin,
	createHeadingPlugin,
	createParagraphPlugin,
	createPlateUI,
	createPluginFactory,
	ELEMENT_H1,
	ELEMENT_PARAGRAPH,
	HotkeyPlugin,
	onKeyDownToggleElement,
	setDefaultPlugin,
} from '@udecode/plate';
import { Block, H1, NodeBlock } from '../Elements/Elements';
import { createMyPlugins, ELEMENT_NODE } from '../plateTypes';

const plateUI = createPlateUI({});

const createNodePlugin = createPluginFactory<HotkeyPlugin>({
	key: ELEMENT_NODE,
	isElement: true,
	isLeaf: false,
	component: NodeBlock,
	handlers: {
		onKeyDown: onKeyDownToggleElement,
	},
	options: {
		hotkey: ['cmd+g'],
	},
});

export const BlockPlugins = createMyPlugins(
	[
		createCodeBlockPlugin(),
		createHeadingPlugin(),
		createParagraphPlugin(),
		createNodePlugin(),
	],
	{
		components: {
			...createPlateUI({}),
			[ELEMENT_PARAGRAPH]: Block,
			[ELEMENT_H1]: H1,
		},
	}
);
