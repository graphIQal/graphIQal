import {
	autoformatArrow,
	autoformatEquality,
	autoformatLegal,
	autoformatLegalHtml,
	autoformatPunctuation,
	autoformatSmartQuotes,
	autoformatSubscriptNumbers,
	createAutoformatPlugin,
	createExitBreakPlugin,
	createResetNodePlugin,
	createSoftBreakPlugin,
	createTrailingBlockPlugin,
	ELEMENT_BLOCKQUOTE,
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	ELEMENT_LI,
	ELEMENT_OL,
	ELEMENT_PARAGRAPH,
	ELEMENT_TODO_LI,
	isBlockAboveEmpty,
	isSelectionAtBlockStart,
	KEYS_HEADING,
} from '@udecode/plate';
import {
	createMyPlugins,
	ELEMENT_BLOCK,
	ELEMENT_NODELINK,
	ELEMENT_TITLE,
} from '../plateTypes';
import { autoformatLists } from './Autoformat/autoformatLists';

const resetBlockTypesCommonRule = {
	types: [
		ELEMENT_BLOCKQUOTE,
		ELEMENT_LI,
		ELEMENT_OL,
		ELEMENT_TODO_LI,
		ELEMENT_H1,
		ELEMENT_H2,
		ELEMENT_H3,
	],
	defaultType: ELEMENT_PARAGRAPH,
};

const listsOnly = {
	types: [ELEMENT_BLOCKQUOTE, ELEMENT_LI, ELEMENT_OL, ELEMENT_TODO_LI],
	defaultType: ELEMENT_PARAGRAPH,
};

export const FormatPlugins = createMyPlugins([
	createTrailingBlockPlugin({ options: { type: ELEMENT_BLOCK } }),
	createSoftBreakPlugin(),
	createResetNodePlugin({
		options: {
			rules: [
				{
					...listsOnly,
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
							ELEMENT_BLOCKQUOTE,
						],
					},
					// relative: true,
					level: 0,
				},
			],
		},
	}),
	createAutoformatPlugin({
		options: {
			rules: [
				...autoformatSmartQuotes,
				...autoformatPunctuation,
				...autoformatArrow,
				...autoformatSubscriptNumbers,
				...autoformatSubscriptNumbers,
				...autoformatEquality,
				...autoformatEquality,
				...autoformatLegal,
				...autoformatLegalHtml,
				// custom
				...autoformatLists,
			],
			enableUndoOnDelete: true,
		},
	}),
]);
