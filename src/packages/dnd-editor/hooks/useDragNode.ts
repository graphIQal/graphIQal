import { DragSourceHookSpec, useDrag } from 'react-dnd';
import { TEditor, Value } from '@udecode/plate-core';
// import { dndStore } from '../dndStore';
// import { DragItemNode } from '../types';

import { MyEditor, MyValue } from '../../editor/plateTypes';
import { collapseSelection, deselect } from '@udecode/plate';
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
export const useDragNode = <V extends MyValue>(
	editor: MyEditor,
	{ id, item, sourceEditor, ...options }: UseDragNodeOptions
) => {
	return useDrag<DragItemNode, unknown, { isDragging: boolean }>(
		() => ({
			item(monitor) {
				// dndStore.set.isDragging(true);
				editor.isDragging = true;
				deselect(editor);
				collapseSelection(editor);
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
