import {
	HotkeyPlugin,
	createBoldPlugin,
	createCodePlugin,
	createItalicPlugin,
	createPlateUI,
	createStrikethroughPlugin,
	createSubscriptPlugin,
	createSuperscriptPlugin,
	createUnderlinePlugin,
} from '@udecode/plate';
import {
	ELEMENT_TITLE,
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
		components: createPlateUI({}),
	}
);
