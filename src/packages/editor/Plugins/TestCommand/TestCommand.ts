import { HotkeyPlugin } from '@udecode/plate';
import { COMMAND_TEST, createMyPluginFactory } from '../../plateTypes';
import { onKeyDownTest } from './onKeyDownTest';

export const createTestCommandPlugin = createMyPluginFactory<HotkeyPlugin>({
	key: COMMAND_TEST,
	handlers: {
		onKeyDown: onKeyDownTest,
	},
	options: {
		hotkey: ['cmd+j'],
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
