import {
	createCodeBlockPlugin,
	createHeadingPlugin,
	createParagraphPlugin,
	createPlateUI,
	ELEMENT_H1,
	ELEMENT_PARAGRAPH,
	getPluginType,
	HotkeyPlugin,
	isElement,
	mapInjectPropsToPlugin,
	onKeyDownIndent,
	onKeyDownToggleElement,
} from '@udecode/plate';
import { Block, H1, NodeBlock } from '../Elements/Elements';
import {
	COMMAND_NEST,
	COMMAND_TEST,
	createMyPluginFactory,
	createMyPlugins,
	ELEMENT_NODE,
} from '../plateTypes';
import { onKeyDownTab } from './NestedBlocksPlugin/onKeyDownTab';
import { createTestCommandPlugin } from './TestCommand/TestCommand';

const createNestedBlocksPlugin = createMyPluginFactory<HotkeyPlugin>({
	key: COMMAND_NEST,
	// withOverrides: WITHINDE,
	handlers: {
		onKeyDown: onKeyDownTab,
	},
	// then: (editor) => ({
	// 	inject: {
	// 		props: {
	// 			nodeKey: COMMAND_NEST,
	// 			validTypes: [isElement(editor)],
	// 		},
	// 	},
	// }),
});

export const CommandPlugins = createMyPlugins(
	[
		createNestedBlocksPlugin(),
		// createTestCommandPlugin()
	],
	{}
);
