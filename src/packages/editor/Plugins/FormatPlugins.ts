import {
	createAutoformatPlugin,
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
	ELEMENT_BLOCK,
	ELEMENT_NODE,
	ELEMENT_NODELINK,
	ELEMENT_TITLE,
} from '../plateTypes';

const resetBlockTypesCommonRule = {
	types: [
		ELEMENT_BLOCKQUOTE,
		ELEMENT_TODO_LI,
		ELEMENT_H1,
		ELEMENT_H2,
		ELEMENT_H3,
	],
	defaultType: ELEMENT_PARAGRAPH,
};

export const FormatPlugins = createMyPlugins([
	// createTrailingBlockPlugin({ options: { type: ELEMENT_PARAGRAPH } }),
	createSoftBreakPlugin(),
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
						allow: [
							...KEYS_HEADING,
							ELEMENT_TITLE,
							ELEMENT_NODELINK,
						],
					},
					// relative: true,
					level: 1,
				},
			],
		},
	}),
	createAutoformatPlugin({}),
]);
