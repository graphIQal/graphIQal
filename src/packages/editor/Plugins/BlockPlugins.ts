import {
	createBoldPlugin,
	createCodeBlockPlugin,
	createHeadingPlugin,
	createParagraphPlugin,
	createPlateUI,
	ELEMENT_PARAGRAPH,
} from '@udecode/plate';
import { Block } from '../Elements/Elements';
import { createMyPlugins } from '../plateTypes';

// const plateUI = createPlateUI({});
// for(const key in plateUI) {
// 	console.log(key)
// 	plateUI[key] = Block({child: key})
// }

export const BlockPlugins = createMyPlugins(
	[createCodeBlockPlugin(), createHeadingPlugin(), createParagraphPlugin()],
	{
		components: {
			...createPlateUI({}),
			[ELEMENT_PARAGRAPH]: Block,
		},
	}
);
