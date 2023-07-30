import { DropTargetMonitor } from 'react-dnd';
import {
	findNode,
	focusEditor,
	moveNodes,
	TReactEditor,
	Value,
} from '@udecode/plate';
import { Path } from 'slate';
import { UseDropNodeOptions } from '../hooks/useDropNode';
// import { DragItemNode } from '../types';
import {
	getMyEditor,
	MyEditor,
	MyValue,
	useMyPlateEditorRef,
} from '../../editor/plateTypes';
import {
	EElement,
	EElementOrText,
	insertNodes,
	removeNodes,
} from '@udecode/plate';
// import { getHoverDirection } from '../../dnd/utils/getHoverDirection';
import { DragItemNode } from '../types';
import { getHoverDirection } from '../utils/getHoverDirection';
// import { DragItemNode } from '../../dnd/types';
// import { getHoverDirection } from '../utils/getHoverDirection';

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

	if (dragItem.sourceEditor.id === editor.id) {
		// same editor
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
	} else {
		// different editors
		const dragEntry = findNode(dragItem.sourceEditor, {
			at: [],
			match: { id: dragItem.id },
		});

		if (!dragEntry) return;
		const [node, dragPath] = dragEntry;

		focusEditor(editor);

		console.log(node, dragEntry);

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
			const _dropPath = Path.next(dropPath as Path);
			console.log(_dropPath);

			// const before =
			// 	Path.isBefore(dragPath, _dropPath) &&
			// 	Path.isSibling(dragPath, _dropPath);

			// const to = before ? _dropPath : Path.next(_dropPath);

			// change moveNodes to delete Notes in original editor and remove it
			removeNodes(dragItem.sourceEditor, { at: dragPath });
			insertNodes(editor, node as EElementOrText<MyValue>, {
				at: _dropPath,
			});
		}
	}
};
