import { AutoformatRule } from '@udecode/plate-autoformat';
import {
	ELEMENT_LI,
	ELEMENT_OL,
	ELEMENT_TODO_LI,
	ELEMENT_UL,
	TTodoListItemElement,
} from '@udecode/plate-list';
import { preFormat, formatList } from './autoformatUtils';
import { setNodes, isBlock } from '@udecode/plate';

// import { formatList, preFormat } from '@/lib/plate/autoformatUtils';

export const autoformatLists: AutoformatRule[] = [
	{
		mode: 'block',
		type: ELEMENT_LI,
		match: ['* ', '- '],
		// preFormat,
		format: (editor) => formatList(editor, ELEMENT_LI),
	},
	{
		mode: 'block',
		type: ELEMENT_OL,
		match: ['1. ', '1) '],
		// preFormat,
		format: (editor) => formatList(editor, ELEMENT_OL),
	},
	{
		mode: 'block',
		type: ELEMENT_TODO_LI,
		match: '[] ',
	},
	{
		mode: 'block',
		type: ELEMENT_TODO_LI,
		match: '[x] ',
		format: (editor) =>
			setNodes<TTodoListItemElement>(
				editor,
				{ type: ELEMENT_TODO_LI, checked: true },
				{
					match: (n) => isBlock(editor, n),
				}
			),
	},
];
