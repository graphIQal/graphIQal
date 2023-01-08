import { DropTargetMonitor } from 'react-dnd';
import {
	collapseSelection,
	focusEditor,
	isExpanded,
	TReactEditor,
	Value,
} from '@udecode/plate-core';
import { getHoverDirection } from '../../dnd/utils/getHoverDirection';
import { getNewDirection } from '../../dnd/utils/getNewDirection';
import { MyValue } from '../../editor/plateTypes';
import { DragItemNode } from '../../dnd/types';
import { UseDropNodeOptions } from '../hooks/useDropNode';

/**
 * Callback called when dragging a node and hovering nodes.
 */
export const onHoverNode = <V extends MyValue>(
	editor: TReactEditor<V>,
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
