import {
	createHeadingPlugin,
	createParagraphPlugin,
	createPlateUI,
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	HotkeyPlugin,
	onKeyDownToggleElement,
} from '@udecode/plate';
import { H1, H2, H3, NodeLink, TitleElement } from '../Elements/Elements';
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

// I can try adding a plugin for the fricking paragraph that makes it an inline plugin? I'm not sure

export const BlockPlugins = createMyPlugins(
	[
		createHeadingPlugin(),
		createParagraphPlugin(),
		createNodePlugin(),
		createTitlePlugin(),
		createNodeLinkPlugin(),
	],
	{
		components: {
			// ...createPlateUI({}),
			[ELEMENT_TITLE]: TitleElement,
			[ELEMENT_NODELINK]: NodeLink,
			[ELEMENT_H1]: H1,
			[ELEMENT_H2]: H2,
			[ELEMENT_H3]: H3,
		},
	}
);
