import { HotkeyPlugin } from '@udecode/plate';
import { withDraggable } from '../../../dnd-editor/components/withDraggable';
import { Block, Column, ColumnParent } from '../../Elements/Elements';
import {
	ELEMENT_COLUMN,
	ELEMENT_COLUMN_PARENT,
	createMyPluginFactory,
} from '../../plateTypes';
import { withColumns } from './withColumns';

export const createColumnParentPlugin = createMyPluginFactory<HotkeyPlugin>({
	key: ELEMENT_COLUMN_PARENT,
	component: withDraggable(ColumnParent),
	isElement: true,
	withOverrides: withColumns,
	deserializeHtml: {
		rules: [
			{
				validNodeName: 'P',
			},
		],
		query: (el) => el.style.fontFamily !== 'Consolas',
	},
});

export const createColumnsPlugin = createMyPluginFactory<HotkeyPlugin>({
	key: ELEMENT_COLUMN,
	component: Column,
	isElement: true,
	withOverrides: withColumns,
	deserializeHtml: {
		rules: [
			{
				validNodeName: 'P',
			},
		],
		query: (el) => el.style.fontFamily !== 'Consolas',
	},
});
