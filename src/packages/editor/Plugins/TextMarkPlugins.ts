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
	MARK_CUT,
	createMyPluginFactory,
	createMyPlugins,
} from '../plateTypes';

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
	],
	{
		components: createPlateUI({}),
	}
);
