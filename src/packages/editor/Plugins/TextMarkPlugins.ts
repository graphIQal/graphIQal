import {
	createBoldPlugin,
	createCodePlugin,
	createItalicPlugin,
	createPlateUI,
	createStrikethroughPlugin,
	createSubscriptPlugin,
	createSuperscriptPlugin,
	createUnderlinePlugin,
} from '@udecode/plate';
import { ELEMENT_TITLE, createMyPlugins } from '../plateTypes';

export const TextMarkPlugins = createMyPlugins(
	[
		createBoldPlugin(),
		createCodePlugin(),
		createItalicPlugin(),
		createStrikethroughPlugin(),
		createSubscriptPlugin(),
		createSuperscriptPlugin(),
		createUnderlinePlugin(),
	],
	{
		components: createPlateUI({}),
	}
);
