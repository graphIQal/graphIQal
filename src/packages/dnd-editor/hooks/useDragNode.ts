import { DragSourceHookSpec, useDrag } from 'react-dnd';
// import { dndStore } from '../dndStore';

import {
	collapseSelection,
	deselect,
	deselectEditor,
	isCollapsed,
} from '@udecode/plate';
import { MyEditor, MyValue } from '../../editor/plateTypes';
import { DragItemNode } from '../types';
export interface UseDragNodeOptions
	extends DragSourceHookSpec<DragItemNode, unknown, { isDragging: boolean }> {
	id: string;
	sourceEditor: MyEditor;
}

/**
 * `useDrag` hook to drag a node from the editor. `item` with `id` is required.
 *
 * On drag start:
 * - set `editor.isDragging` to true
 * - add `dragging` class to `body`
 *
 * On drag end:
 * - set `editor.isDragging` to false
 * - remove `dragging` class to `body`
 *
 * Collect:
 * - isDragging: true if mouse is dragging the block
 */
export const useDragNode = (
	editor: MyEditor,
	{ id, item, sourceEditor, ...options }: UseDragNodeOptions
) => {
	return useDrag<DragItemNode, unknown, { isDragging: boolean }>(
		() => ({
			item(monitor) {
				// dndStore.set.isDragging(true);
				editor.isDragging = true;

				document.body.classList.add('dragging');

				const _item = typeof item === 'function' ? item(monitor) : item;

				return {
					id,
					sourceEditor,
					..._item,
				};
			},
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
			end: () => {
				// dndStore.set.isDragging(false);
				editor.isDragging = false;
				document.body.classList.remove('dragging');
			},
			...options,
		}),
		[]
	);
};
