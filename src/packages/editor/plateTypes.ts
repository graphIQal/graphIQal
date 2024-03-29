import { ConnectionTypes } from '@/backend/schema';
import {
	AutoformatRule,
	createPlateEditor,
	CreatePlateEditorOptions,
	createPluginFactory,
	createPlugins,
	createTEditor,
	EDescendant,
	EElement,
	EElementEntry,
	EElementOrText,
	ELEMENT_BLOCKQUOTE,
	ELEMENT_CODE_BLOCK,
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	ELEMENT_IMAGE,
	ELEMENT_LI,
	ELEMENT_LIC,
	ELEMENT_LINK,
	ELEMENT_MENTION,
	ELEMENT_MENTION_INPUT,
	ELEMENT_OL,
	ELEMENT_PARAGRAPH,
	ELEMENT_TODO_LI,
	EMarks,
	ENode,
	ENodeEntry,
	EText,
	ETextEntry,
	getTEditor,
	KeyboardHandler,
	NoInfer,
	OnChange,
	OverrideByKey,
	PlateEditor,
	PlateId,
	PlatePlugin,
	PlatePluginComponent,
	PlatePluginInsertData,
	PlatePluginProps,
	PlateProps,
	PluginOptions,
	SerializeHtml,
	TCommentText,
	TElement,
	TLinkElement,
	TMentionElement,
	TMentionInputElement,
	TNodeEntry,
	TText,
	useEditorRef,
	useEditorState,
	usePlateActions,
	usePlateEditorRef,
	usePlateEditorState,
	usePlateSelectors,
	usePlateStates,
	WithOverride,
} from '@udecode/plate';
// import {
//   ELEMENT_EXCALIDRAW,
//   TExcalidrawElement,
// } from '@udecode/plate-ui-excalidraw';
import { CSSProperties } from 'styled-components';
import { v4 } from 'uuid';

export const ELEMENT_BLOCK = 'block';
export const ELEMENT_TITLE = 'title';
export const ELEMENT_NODELINK = 'nodelink';
export const ELEMENT_NODE = 'node';
export const ELEMENT_NODETITLE = 'nodeTitle';
export const ELEMENT_CONNECTION = 'connection';
export const ELEMENT_DIVIDER = 'divider';
export const ELEMENT_GROUP = 'group';
export const ELEMENT_COLUMN_PARENT = 'column_parent';
export const ELEMENT_COLUMN = 'column';

export const COMMAND_NEST = 'nested';
export const COMMAND_TEST = 'test';

// marks
export const ELEMENT_CUT_SHOWN = 'cut_show';
export const ELEMENT_CUT_HIDDEN = 'cut_hide';
export const MARK_COLOUR = 'colour';

export type MyDraggableElement =
	| typeof ELEMENT_BLOCK
	| typeof ELEMENT_NODE
	| typeof ELEMENT_GROUP
	| typeof ELEMENT_DIVIDER;

export const BlockLevelElements = {
	[ELEMENT_NODE]: true,
	[ELEMENT_BLOCK]: true,
	[ELEMENT_GROUP]: true,
	[ELEMENT_COLUMN_PARENT]: true,
};
export const BlockwrappedElements = {
	[ELEMENT_PARAGRAPH]: true,
	// [ELEMENT_GROUP]: true,
	[ELEMENT_H1]: true,
	[ELEMENT_H2]: true,
	[ELEMENT_H3]: true,
	[ELEMENT_BLOCKQUOTE]: true,
	[ELEMENT_CODE_BLOCK]: true,
	// [ELEMENT_LIC]: true,
	[ELEMENT_LI]: true,
	[ELEMENT_OL]: true,
	[ELEMENT_TODO_LI]: true,
	[ELEMENT_NODELINK]: true,
	[ELEMENT_DIVIDER]: true,
	[ELEMENT_IMAGE]: true,
	[ELEMENT_NODETITLE]: true,
	// [ELEMENT_UL]: true,
	// [ELEMENT_TABLE]: true,
	// [ELEMENT_TH]: true,
	// [ELEMENT_TR]: true,
	// [ELEMENT_TD]: true,
	// [ELEMENT_VIDEO]: true,
	// [ELEMENT_AUDIO]: true,
	// [ELEMENT_IFRAME]: true,
};

export const NoMarkElements = {
	[ELEMENT_H1]: true,
	[ELEMENT_H2]: true,
	[ELEMENT_H3]: true,
	[ELEMENT_TITLE]: true,
	[ELEMENT_NODELINK]: true,
};

export const HeaderElements = {
	[ELEMENT_H1]: true,
	[ELEMENT_H2]: true,
	[ELEMENT_H3]: true,
};

/**
 * Text
 */

export type EmptyText = {
	text: '';
};

export type PlainText = {
	text: string;
};

export interface RichText extends TText, TCommentText {
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	code?: boolean;
	kbd?: boolean;
	subscript?: boolean;
	backgroundColor?: CSSProperties['backgroundColor'];
	fontFamily?: CSSProperties['fontFamily'];
	color?: CSSProperties['color'];
	fontSize?: CSSProperties['fontSize'];
	fontWeight?: CSSProperties['fontWeight'];
}

/**
 * Inline Elements
 */

export interface MyLinkElement extends TLinkElement {
	type: typeof ELEMENT_LINK;
	children: RichText[];
}

export interface MyMentionInputElement extends TMentionInputElement {
	type: typeof ELEMENT_MENTION_INPUT;
	children: [PlainText];
}

export interface MyMentionElement extends TMentionElement {
	type: typeof ELEMENT_MENTION;
	children: [EmptyText];
}

export type InlineElements =
	| MyLinkElement
	| MyMentionElement
	| MyMentionInputElement
	| RichText;

/**
 * Block props
 */

export interface MyIndentProps {
	indent?: number;
}

export interface MyIndentListProps extends MyIndentProps {
	listStart?: number;
	listRestart?: number;
	listStyleType?: string;
}

export interface MyLineHeightProps {
	lineHeight?: CSSProperties['lineHeight'];
}

export interface MyAlignProps {
	align?: CSSProperties['textAlign'];
}

export interface BlockElements
	extends TElement,
		MyIndentListProps,
		MyLineHeightProps {
	id: PlateId;
	type: string;
	[key: string]: any;
	// children: InlineElements[] | BlockElements[];
}

/**
 * Blocks
 */

export interface MyBlockElement extends BlockElements {
	type: typeof ELEMENT_BLOCK;
	children: BlockElements[];
	id: string;
}

type Node = {
	id: string;
	title: string;
	icon: string;
	document: string;
	[key: string]: any; // This allows for any other properties
};

export interface MyGroupElement extends BlockElements {
	type: typeof ELEMENT_GROUP;
	children: InlineElements[];
	filters: {
		[key in ConnectionTypes]?: { type: ConnectionTypes; nodes: Node[] };
	};
	id: string;
}

export interface MyTitleElement extends BlockElements {
	type: typeof ELEMENT_TITLE;
	children: InlineElements[];
}

export interface MyNodeLinkElement extends BlockElements {
	type: typeof ELEMENT_NODELINK;
	nodeId: string;
	routeString: string;
	icon?: string;
	children: InlineElements[];
}

// Everything below

export interface MyParagraphElement extends BlockElements {
	type: typeof ELEMENT_PARAGRAPH;
	children: InlineElements[];
}

export interface MyNodeElement extends BlockElements {
	type: typeof ELEMENT_NODE;
	nodeId: string;
	routeString: string;
	icon?: string;
	children: InlineElements[] | BlockElements[];
	id: string;
}

export interface MyConnectionElement extends BlockElements {
	type: typeof ELEMENT_NODE;
	children: InlineElements[] | BlockElements[];
}

export interface MyH1Element extends BlockElements {
	type: typeof ELEMENT_H1;
	children: InlineElements[];
}

export interface MyH2Element extends BlockElements {
	type: typeof ELEMENT_H2;
	children: InlineElements[];
}

export interface MyH3Element extends BlockElements {
	type: typeof ELEMENT_H3;
	children: InlineElements[];
}

export type MyBlock = Exclude<MyElement, InlineElements>;
export type MyBlockEntry = TNodeEntry<MyBlock>;

export type Block =
	| MyBlockElement
	| MyTitleElement
	| MyNodeLinkElement
	| MyNodeElement
	| MyConnectionElement
	| MyParagraphElement
	| MyH1Element
	| MyH2Element
	| MyH3Element;

export type MyValue = Block[];

/**
 * Editor types
 */

export type MyEditor = PlateEditor<MyValue> & { isDragging?: boolean };
export type MyNode = ENode<MyValue>;
export type MyNodeEntry = ENodeEntry<MyValue>;
export type MyElement = EElement<MyValue>;
export type MyElementEntry = EElementEntry<MyValue>;
export type MyText = EText<MyValue>;
export type MyTextEntry = ETextEntry<MyValue>;
export type MyElementOrText = EElementOrText<MyValue>;
export type MyDescendant = EDescendant<MyValue>;
export type MyMarks = EMarks<MyValue>;
export type MyMark = keyof MyMarks;

/**
 * Plate types
 */

export type MyKeyboardHandler<P = PluginOptions> = KeyboardHandler<
	P,
	MyValue,
	MyEditor
>;
export type MyOnChange<P = PluginOptions> = OnChange<P, MyValue, MyEditor>;
export type MyOverrideByKey = OverrideByKey<MyValue, MyEditor>;
export type MyPlatePlugin<P = PluginOptions> = PlatePlugin<
	P,
	MyValue,
	MyEditor
>;
export type MyPlatePluginInsertData = PlatePluginInsertData<MyValue>;
export type MyPlatePluginProps = PlatePluginProps<MyValue>;
export type MyPlateProps = PlateProps<MyValue, MyEditor>;
export type MySerializeHtml = SerializeHtml<MyValue>;
export type MyWithOverride<P = PluginOptions> = WithOverride<
	P,
	MyValue,
	MyEditor
>;

/**
 * Plate store, Slate context
 */

export const getMyEditor = (editor: MyEditor) =>
	getTEditor<MyValue, MyEditor>(editor);
export const useMyEditorRef = () => useEditorRef<MyValue, MyEditor>();
export const useMyEditorState = () => useEditorState<MyValue, MyEditor>();
export const useMyPlateEditorRef = (id?: PlateId) =>
	usePlateEditorRef<MyValue, MyEditor>(id);
export const useMyPlateEditorState = (id?: PlateId) =>
	usePlateEditorState<MyValue, MyEditor>(id);
export const useMyPlateSelectors = (id?: PlateId) =>
	usePlateSelectors<MyValue, MyEditor>(id);
export const useMyPlateActions = (id?: PlateId) =>
	usePlateActions<MyValue, MyEditor>(id);
export const useMyPlateStates = (id?: PlateId) =>
	usePlateStates<MyValue, MyEditor>(id);

/**
 * Utils
 */
export const createMyEditor = () => createTEditor() as MyEditor;
export const createMyPlateEditor = (
	options: CreatePlateEditorOptions<MyValue, MyEditor> = {}
) => createPlateEditor<MyValue, MyEditor>(options);
export const createMyPluginFactory = <P = PluginOptions>(
	defaultPlugin: PlatePlugin<NoInfer<P>, MyValue, MyEditor>
) => createPluginFactory(defaultPlugin);

export const createMyPlugins = (
	plugins: MyPlatePlugin[],
	options?: {
		components?: Record<string, PlatePluginComponent>;
		overrideByKey?: MyOverrideByKey;
	}
) => createPlugins<MyValue, MyEditor>(plugins, options);

export type MyAutoformatRule = AutoformatRule<MyValue, MyEditor>;

export const defaultDocument = `
[
	{
		"type": "block",
		"id": "${v4()}",
		"children": [
			{ "type": "p", "id": "${v4()}", "children": [{ "text": "" }] }
		]
	}
]`;
