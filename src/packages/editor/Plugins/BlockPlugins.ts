import { LinkElement } from '@/components/plate-ui/link-element';
import { ParagraphElement } from '@/components/plate-ui/paragraph-element';
import { TodoListElement } from '@/components/plate-ui/todo-list-element';
import { withDraggable } from '@/packages/dnd-editor/components/withDraggable';
import {
	createBlockquotePlugin,
	createCodeBlockPlugin,
	createHeadingPlugin,
	// createListPlugin,
	createParagraphPlugin,
	// createPlateUI,
	ELEMENT_BLOCKQUOTE,
	// createTodoListPlugin,
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	ELEMENT_LI,
	ELEMENT_LINK,
	ELEMENT_OL,
	ELEMENT_PARAGRAPH,
	ELEMENT_TODO_LI,
	HotkeyPlugin,
	RenderAfterEditable,
	createLinkPlugin,
	createImagePlugin,
	ELEMENT_IMAGE,
	createMediaEmbedPlugin,
	ELEMENT_MEDIA_EMBED,
	createMentionPlugin,
} from '@udecode/plate';
// import { createLinkPlugin } from '@udecode/plate-link';
import {
	BlockquoteElement,
	CutTextHidden,
	CutTextShown,
	Divider,
	Group,
	H1,
	H2,
	H3,
	Node,
	NodeLink,
	NodeTitle,
	OL,
	TitleElement,
	UL,
} from '../Elements/Elements';
import {
	createMyPluginFactory,
	createMyPlugins,
	ELEMENT_CUT_HIDDEN,
	ELEMENT_CUT_SHOWN,
	ELEMENT_DIVIDER,
	ELEMENT_GROUP,
	ELEMENT_NODE,
	ELEMENT_NODELINK,
	ELEMENT_NODETITLE,
	ELEMENT_TITLE,
	MyValue,
} from '../plateTypes';
import { withNodeLink } from './NodeLinkPlugin/withNodeLink';
import { LinkFloatingToolbar } from '@/components/plate-ui/link-floating-toolbar';
import { ImageElement } from '@/components/plate-ui/image-element';
import { MediaEmbedElement } from '@/components/plate-ui/media-embed-element';
import {
	createColumnParentPlugin,
	createColumnsPlugin,
} from './ColumnsPlugin/ColumnsPlugin';
import { withCutText } from './CutTextPlugin/withCutText';

const createNodePlugin = createMyPluginFactory<HotkeyPlugin>({
	key: ELEMENT_NODE,
	isElement: true,
	isLeaf: false,
	handlers: {
		// onKeyDown: onKeyDownToggleElement,
	},
	options: {
		// hotkey: ['cmd+g'],
	},
});

const createNodeTitlePlugin = createMyPluginFactory<HotkeyPlugin>({
	key: ELEMENT_NODETITLE,
	isElement: true,
	isLeaf: false,
	handlers: {
		// onKeyDown: onKeyDownToggleElement,
	},
	options: {
		// hotkey: ['cmd+g'],
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
	isVoid: false,
	options: {},
});

const createDividerPlugin = createMyPluginFactory<HotkeyPlugin>({
	key: ELEMENT_DIVIDER,
	isElement: true,
	isLeaf: false,
	isVoid: true,
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

const createGroupPlugin = createMyPluginFactory<HotkeyPlugin>({
	key: ELEMENT_GROUP,
	isElement: true,
	isLeaf: false,
	isVoid: false,
	// withOverrides: withNodeLink,
	options: {},
});

// I can try adding a plugin for the fricking paragraph that makes it an inline plugin? I'm not sure

// okay, so there's 2 solutions I can think of for the cut text plugin.
// Because we're saving the content, we need it to be void consistently when invisible.
// So we probably actually have to go through the entire document and then turn them from void to non-void elements.
// Or, we could go through and move them from children to an invisible content uneditable element.
// All in all, this does mean that simply toggling their visibility won't be helpful, because they're still in slate flow.
const cutTextHiddenPlugin = createMyPluginFactory<HotkeyPlugin>({
	key: ELEMENT_CUT_HIDDEN,
	isElement: true,
	isInline: true,
	isVoid: true,
	isLeaf: false,
	component: CutTextHidden,
	// options: {
	// 	hotkey: 'mod+g',
	// },
	// handlers: {
	// 	onKeyDown: (editor) => (event) => {
	// 		if (event.key === 'g' && (event.ctrlKey || event.metaKey)) {
	// 			event.preventDefault();
	// 			const cutTextNode = { type: ELEMENT_CUT, children: [] };
	// 			editor.wrapNodes(cutTextNode, { split: true });
	// 		}
	// 	},
	// },
});

const cutTextShownPlugin = createMyPluginFactory<HotkeyPlugin>({
	key: ELEMENT_CUT_SHOWN,
	component: CutTextShown,
	isElement: true,
	isLeaf: false,
	isInline: true,
	isVoid: false,
	withOverrides: withCutText,
	// options: {
	// 	hotkey: 'mod+g',
	// },
	// handlers: {
	// 	onKeyDown: (editor) => (event) => {
	// 		if (event.key === 'g' && (event.ctrlKey || event.metaKey)) {
	// 			event.preventDefault();
	// 			const cutTextNode = { type: ELEMENT_CUT, children: [] };
	// 			editor.wrapNodes(cutTextNode, { split: true });
	// 		}
	// 	},
	// },
});

export const BlockPlugins = createMyPlugins(
	[
		createNodePlugin(),
		createGroupPlugin(),
		createHeadingPlugin(),
		createParagraphPlugin(),
		createTitlePlugin(),
		createNodeLinkPlugin(),
		createListPlugin(),
		createNumberedListPlugin(),
		createTodoListPlugin(),
		createCodeBlockPlugin(),
		createDividerPlugin(),
		createLinkPlugin({
			renderAfterEditable:
				LinkFloatingToolbar as RenderAfterEditable<MyValue>,
		}),
		createBlockquotePlugin(),
		createNodeTitlePlugin(),
		cutTextHiddenPlugin(),
		cutTextShownPlugin(),
		createImagePlugin(),
		createMediaEmbedPlugin(),
		createColumnParentPlugin(),
		createColumnsPlugin(),
		// createMentionPlugin(),
		// createCaptionPlugin({
		// 	options: { pluginKeys: [ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED] },
		// }),
	],
	{
		components: {
			// ...createPlateUI({}),
			// [ELEMENT_CODE_BLOCK]: CodeBlockElement,
			// [ELEMENT_CODE_LINE]: CodeLineElement,
			// [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
			[ELEMENT_PARAGRAPH]: ParagraphElement,
			[ELEMENT_TITLE]: TitleElement,
			[ELEMENT_NODELINK]: NodeLink,
			[ELEMENT_H1]: H1,
			[ELEMENT_H2]: H2,
			[ELEMENT_H3]: H3,
			[ELEMENT_LI]: UL,
			[ELEMENT_OL]: OL,
			[ELEMENT_TODO_LI]: TodoListElement,
			[ELEMENT_DIVIDER]: Divider,
			[ELEMENT_LINK]: LinkElement,
			[ELEMENT_BLOCKQUOTE]: BlockquoteElement,
			[ELEMENT_NODE]: withDraggable(Node),
			[ELEMENT_NODETITLE]: NodeTitle,
			[ELEMENT_CUT_HIDDEN]: CutTextHidden,
			[ELEMENT_CUT_SHOWN]: CutTextShown,
			[ELEMENT_GROUP]: withDraggable(Group),
			[ELEMENT_IMAGE]: ImageElement,

			// [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
		},
	}
);
