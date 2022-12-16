import {
	createBoldPlugin,
	createCodeBlockPlugin,
	createHeadingPlugin,
	createParagraphPlugin,
	ELEMENT_PARAGRAPH,
} from '@udecode/plate';
import { Block } from '../Elements/Elements';
import { createMyPlugins } from '../plateTypes';

export const BlockPlugins = createMyPlugins(
	[createCodeBlockPlugin(), createHeadingPlugin(), createParagraphPlugin()],
	{
		components: {
			[ELEMENT_PARAGRAPH]: Block,
		},
	}
);
