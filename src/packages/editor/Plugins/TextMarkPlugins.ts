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
import { Leaf } from '../Elements/Elements';
import { createMyPlugins } from '../plateTypes';

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
