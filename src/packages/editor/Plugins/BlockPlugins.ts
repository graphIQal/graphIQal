import {
	CodeBlockElement,
	CodeLineElement,
	CodeSyntaxLeaf,
	createCodeBlockPlugin,
	createHeadingPlugin,
	// createListPlugin,
	createParagraphPlugin,
	createPlateUI,
	ELEMENT_CODE_BLOCK,
	ELEMENT_CODE_LINE,
	ELEMENT_CODE_SYNTAX,
	// createTodoListPlugin,
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	ELEMENT_LI,
	ELEMENT_LIC,
	ELEMENT_OL,
	ELEMENT_TODO_LI,
	HotkeyPlugin,
	onKeyDownToggleElement,
	TodoListElement,
} from '@udecode/plate';
import {
	H1,
	H2,
	H3,
	LI,
	NodeLink,
	OL,
	TitleElement,
	UL,
} from '../Elements/Elements';
import {
	createMyPluginFactory,
	createMyPlugins,
	ELEMENT_NODE,
	ELEMENT_NODELINK,
	ELEMENT_TITLE,
} from '../plateTypes';
import { normalizeNodeLink } from './NodeLinkPlugin/normalisenodeLink';
import { withNodeLink } from './NodeLinkPlugin/withNodeLink';

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

const createTitlePlugin = createMyPluginFactory<HotkeyPlugin>({
	key: ELEMENT_TITLE,
	isElement: true,
	isLeaf: false,
	options: {},
	// withOverrides: (editor) => {
	// 	editor.addMark = () => {};
	// 	return editor;
	// },
});

const createNodeLinkPlugin = createMyPluginFactory<HotkeyPlugin>({
	key: ELEMENT_NODELINK,
	isElement: true,
	isLeaf: false,
	withOverrides: withNodeLink,
	options: {},
});

const createListPlugin = createMyPluginFactory<HotkeyPlugin>({
	key: ELEMENT_LI,
	isElement: true,
	isLeaf: false,
	// withOverrides: withNodeLink,
	options: {},
});

const createNumberedListPlugin = createMyPluginFactory<HotkeyPlugin>({
	key: ELEMENT_OL,
	isElement: true,
	isLeaf: false,
	// withOverrides: withNodeLink,
	options: {},
});

const createTodoListPlugin = createMyPluginFactory<HotkeyPlugin>({
	key: ELEMENT_TODO_LI,
	isElement: true,
	isLeaf: false,
	// withOverrides: withNodeLink,
	options: {},
});
// I can try adding a plugin for the fricking paragraph that makes it an inline plugin? I'm not sure

export const BlockPlugins = createMyPlugins(
	[
		createHeadingPlugin(),
		createParagraphPlugin(),
		createNodePlugin(),
		createTitlePlugin(),
		createNodeLinkPlugin(),
		createListPlugin(),
		createNumberedListPlugin(),
		createTodoListPlugin(),
		createCodeBlockPlugin(),
	],
	{
		components: {
			// ...createPlateUI({}),
			[ELEMENT_CODE_BLOCK]: CodeBlockElement,
			[ELEMENT_CODE_LINE]: CodeLineElement,
			[ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
			[ELEMENT_TITLE]: TitleElement,
			[ELEMENT_NODELINK]: NodeLink,
			[ELEMENT_H1]: H1,
			[ELEMENT_H2]: H2,
			[ELEMENT_H3]: H3,
			[ELEMENT_LI]: UL,
			[ELEMENT_OL]: OL,
			[ELEMENT_TODO_LI]: TodoListElement,
			// [ELEMENT_LIC]: LI,
		},
	}
);
