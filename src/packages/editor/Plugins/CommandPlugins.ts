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
	createMyPluginFactory,
	createMyPlugins,
	ELEMENT_NODE,
} from '../plateTypes';
import { onKeyDownTab } from './NestedBlocksPlugin/onKeyDownTab';

const createNestedBlocksPlugin = createMyPluginFactory<HotkeyPlugin>({
	key: COMMAND_NEST,
	// withOverrides: WITHINDE,
	handlers: {
		onKeyDown: onKeyDownTab,
	},
	// then: (editor, { options: { offset, unit } = {} }) => ({
	// 	inject: {
	// 		props: {
	// 			nodeKey: COMMAND_NEST,
	// 			styleKey: 'marginLeft',
	// 			validTypes: [isElement(editor)],
	// 			transformNodeValue: ({ nodeValue }) =>
	// 				nodeValue * offset! + unit!,
	// 		},
	// 	},
	// }),
});

export const CommandPlugins = createMyPlugins([createNestedBlocksPlugin()], {});
