import {
	HotkeyPlugin,
	MARK_BOLD,
	MARK_ITALIC,
	MARK_STRIKETHROUGH,
	MARK_SUBSCRIPT,
	MARK_SUPERSCRIPT,
	MARK_UNDERLINE,
	PlateLeaf,
	createBoldPlugin,
	createCodePlugin,
	createItalicPlugin,
	// createPlateUI,
	createStrikethroughPlugin,
	createSubscriptPlugin,
	createSuperscriptPlugin,
	createUnderlinePlugin,
	withProps,
} from '@udecode/plate';
import {
	MARK_COLOUR,
	createMyPluginFactory,
	createMyPlugins,
} from '../plateTypes';

const createColourTextPlugin = createMyPluginFactory<HotkeyPlugin>({
	key: MARK_COLOUR,
	isElement: false,
	isLeaf: true,
	options: {
		hotkey: 'mod+g',
	},
	component: (props) => {
		return <span className='text-yellow'>{props.children}</span>;
	},
});

export const TextMarkPlugins = createMyPlugins(
	[
		createBoldPlugin(),
		createCodePlugin(),
		createItalicPlugin(),
		createStrikethroughPlugin(),
		createSubscriptPlugin(),
		createSuperscriptPlugin(),
		createUnderlinePlugin(),
		createCodePlugin(),
		createColourTextPlugin(),
	],
	{
		components: {
			[MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
			[MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
			[MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
			[MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
			[MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
			[MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
			// [MARK_CODE]: CodeLeaf,
			// [MARK_HIGHLIGHT]: HighlightLeaf,
			// [MARK_KBD]: KbdLeaf,
			// [MARK_COMMENT]: CommentLeaf,
		},
	}
);
