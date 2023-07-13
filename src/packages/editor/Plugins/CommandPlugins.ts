import { HotkeyPlugin } from '@udecode/plate';
import {
	COMMAND_NEST,
	createMyPluginFactory,
	createMyPlugins,
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
