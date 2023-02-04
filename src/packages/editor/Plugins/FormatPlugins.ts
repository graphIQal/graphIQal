import {
	createSoftBreakPlugin,
	HotkeyPlugin,
	onKeyDownToggleElement,
} from '@udecode/plate';
import {
	createMyPluginFactory,
	createMyPlugins,
	ELEMENT_NODE,
} from '../plateTypes';

// I can try adding a plugin for the fricking paragraph that makes it an inline plugin? I'm not sure

export const FormatPlugins = createMyPlugins([createSoftBreakPlugin()]);
