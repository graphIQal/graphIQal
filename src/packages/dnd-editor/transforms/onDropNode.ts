import { DropTargetMonitor } from 'react-dnd';
import {
	findNode,
	focusEditor,
	moveNodes,
	TReactEditor,
	Value,
} from '@udecode/plate-core';
import { Path } from 'slate';
import { getHoverDirection } from '../../dnd/utils/getHoverDirection';
import { UseDropNodeOptions } from '../hooks/useDropNode';
import { DragItemNode } from '../../dnd/types';
import { MyEditor } from '../../editor/plateTypes';

/**
 * Callback called on drag an drop a node with id.
 */
export const onDropNode = <V extends Value>(
	editor: MyEditor,
	{
		dragItem,
		monitor,
		nodeRef,
		id,
	}: {
		dragItem: DragItemNode;
		monitor: DropTargetMonitor;
	} & Pick<UseDropNodeOptions, 'nodeRef' | 'id'>
) => {
	const direction = getHoverDirection({ dragItem, monitor, nodeRef, id });
	if (!direction) return;

	const dragEntry = findNode(editor, {
		at: [],
		match: { id: dragItem.id },
	});
	if (!dragEntry) return;
	const [, dragPath] = dragEntry;

	focusEditor(editor);

	let dropPath: Path | undefined;
	if (direction === 'bottom') {
		dropPath = findNode(editor, { at: [], match: { id } })?.[1];
		if (!dropPath) return;

		if (Path.equals(dragPath, Path.next(dropPath))) return;
	}

	if (direction === 'top') {
		const nodePath = findNode(editor, { at: [], match: { id } })?.[1];

		if (!nodePath) return;
		dropPath = [
			...nodePath.slice(0, -1),
			nodePath[nodePath.length - 1] - 1,
		];

		if (Path.equals(dragPath, dropPath)) return;
	}

	if (direction) {
		const _dropPath = dropPath as Path;

		const before =
			Path.isBefore(dragPath, _dropPath) &&
			Path.isSibling(dragPath, _dropPath);
		const to = before ? _dropPath : Path.next(_dropPath);

		moveNodes(editor, {
			at: dragPath,
			to,
		});
	}
};
