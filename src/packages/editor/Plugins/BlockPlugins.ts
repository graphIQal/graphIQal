import {
	createBoldPlugin,
	createCodeBlockPlugin,
	createHeadingPlugin,
	createParagraphPlugin,
	createPlateUI,
	ELEMENT_H1,
	ELEMENT_PARAGRAPH,
} from '@udecode/plate';
import { Block, H1 } from '../Elements/Elements';
import { createMyPlugins } from '../plateTypes';

const plateUI = createPlateUI({});

console.log(plateUI[ELEMENT_H1]);

export const BlockPlugins = createMyPlugins(
	[createCodeBlockPlugin(), createHeadingPlugin(), createParagraphPlugin()],
	{
		components: {
			...createPlateUI({}),
			[ELEMENT_PARAGRAPH]: Block,
			[ELEMENT_H1]: H1,
		},
	}
);
