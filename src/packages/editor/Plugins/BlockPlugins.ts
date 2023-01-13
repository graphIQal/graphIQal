import {
	createCodeBlockPlugin,
	createHeadingPlugin,
	createParagraphPlugin,
	createPlateUI,
	ELEMENT_H1,
	ELEMENT_PARAGRAPH,
	HotkeyPlugin,
	MARK_BOLD,
	onKeyDownToggleElement,
} from '@udecode/plate';
import { Block, H1, NodeBlock } from '../Elements/Elements';
import {
	createMyPluginFactory,
	createMyPlugins,
	ELEMENT_BLOCK,
	ELEMENT_NODE,
} from '../plateTypes';
import { createBlockPlugin } from './NestedBlocksPlugin/BlockPlugin';
import { TextMarkPlugins } from './TextMarkPlugins';

const plateUI = createPlateUI({});

const createNodePlugin = createMyPluginFactory<HotkeyPlugin>({
	key: ELEMENT_NODE,
	isElement: true,
	isLeaf: false,
	handlers: {
		onKeyDown: onKeyDownToggleElement,
	},
	options: {
		hotkey: ['cmd+g'],
	},
});

// I can try adding a plugin for the fricking paragraph that makes it an inline plugin? I'm not sure

export const BlockPlugins = createMyPlugins(
	[
		createHeadingPlugin(),
		createParagraphPlugin(),
		createNodePlugin(),
		createBlockPlugin(),
	]
	// {
	// 	components: {
	// 		...createPlateUI({}),
	// 		[ELEMENT_PARAGRAPH]: Block,
	// 		[ELEMENT_H1]: H1,
	// 	},
	// }
);
