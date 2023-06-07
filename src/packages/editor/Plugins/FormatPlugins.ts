import {
	createExitBreakPlugin,
	createNormalizeTypesPlugin,
	createResetNodePlugin,
	createSoftBreakPlugin,
	createTrailingBlockPlugin,
	ELEMENT_BLOCKQUOTE,
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	ELEMENT_PARAGRAPH,
	ELEMENT_TODO_LI,
	HotkeyPlugin,
	isBlockAboveEmpty,
	isSelectionAtBlockStart,
	KEYS_HEADING,
	onKeyDownToggleElement,
} from '@udecode/plate';
import {
	BlockwrappedElements,
	createMyPluginFactory,
	createMyPlugins,
	ELEMENT_NODE,
	ELEMENT_TITLE,
} from '../plateTypes';

// I can try adding a plugin for the fricking paragraph that makes it an inline plugin? I'm not sure
const resetBlockTypesCommonRule = {
	types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
	defaultType: ELEMENT_PARAGRAPH,
};

export const FormatPlugins = createMyPlugins([
	createSoftBreakPlugin(),
	createNormalizeTypesPlugin({
		options: { rules: [{ path: [0], strictType: 'title' }] },
	}),
	// createTrailingBlockPlugin(),
	createResetNodePlugin({
		options: {
			rules: [
				{
					...resetBlockTypesCommonRule,
					hotkey: 'Enter',
					predicate: isBlockAboveEmpty,
				},
				{
					...resetBlockTypesCommonRule,
					hotkey: 'Backspace',
					predicate: isSelectionAtBlockStart,
				},
			],
		},
	}),
	createExitBreakPlugin({
		options: {
			rules: [
				{
					hotkey: 'mod+enter',
				},
				{
					hotkey: 'mod+shift+enter',
					before: true,
				},
				// This is where the reset node to paragraph works when on a heading
				{
					hotkey: 'enter',
					query: {
						start: true,
						end: true,
						allow: KEYS_HEADING,
					},
					// relative: true,
					level: 1,
				},
			],
		},
	}),
]);
