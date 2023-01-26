import { DropTargetMonitor } from 'react-dnd';
import {
	collapseSelection,
	focusEditor,
	isExpanded,
	TReactEditor,
	Value,
} from '@udecode/plate-core';
import { MyEditor, MyValue } from '../../editor/plateTypes';
import { DragItemNode } from '../types';
import { UseDropNodeOptions } from '../hooks/useDropNode';
import { getHoverDirection } from '../utils/getHoverDirection';
import { getNewDirection } from '../utils/getNewDirection';
import { deselect } from '@udecode/plate';

/**
 * Callback called when dragging a node and hovering nodes.
 */
export const onHoverNode = <V extends MyValue>(
	editor: MyEditor,
	{
		dragItem,
		monitor,
		nodeRef,
		onChangeDropLine,
		dropLine,
		id,
	}: {
		dragItem: DragItemNode;
		monitor: DropTargetMonitor;
	} & Pick<
		UseDropNodeOptions,
		'nodeRef' | 'onChangeDropLine' | 'id' | 'dropLine'
	>
) => {
	const direction = getHoverDirection({
		dragItem,
		monitor,
		nodeRef,
		id,
	});

	const dropLineDir = getNewDirection(dropLine, direction);
	if (dropLineDir) onChangeDropLine(dropLineDir);

	if (direction && isExpanded(editor.selection)) {
		focusEditor(editor);
		collapseSelection(editor);
	}
};
