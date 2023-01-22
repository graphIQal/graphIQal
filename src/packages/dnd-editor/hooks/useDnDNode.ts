import { useRef, useState } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useEditorRef } from '@udecode/plate-core';

import { useDragNode, UseDragNodeOptions } from './useDragNode';
import { useDropNode, UseDropNodeOptions } from './useDropNode';
import { DropLineDirection } from '../types';
import { useMyEditorRef, useMyPlateEditorRef } from '../../editor/plateTypes';
import { useEventPlateId } from '@udecode/plate';

export interface UseDndNodeOptions
	extends Pick<UseDropNodeOptions, 'id' | 'nodeRef'>,
		Pick<UseDragNodeOptions, 'type'> {
	drag?: UseDragNodeOptions;
	drop?: UseDropNodeOptions;
	preview?: {
		/**
		 * Whether to disable the preview.
		 */
		disable?: boolean;

		/**
		 * The reference to the preview element.
		 */
		ref?: any;
	};
}

/**
 * {@link useDragNode} and {@link useDropNode} hooks to drag and drop a node from the editor.
 * A default preview is used to show the node being dragged, which can be customized or removed.
 * Returns the drag ref and drop line direction.
 */
export const useDndNode = ({
	id,
	type,
	nodeRef,
	preview: previewOptions = {},
	drag: dragOptions,
	drop: dropOptions,
}: UseDndNodeOptions) => {
	const editor = useMyEditorRef();

	// Maybe this can work? It's fucky but it's possible?
	const sourceEditorId = useEventPlateId();
	const sourceEditor = useMyPlateEditorRef(sourceEditorId);

	// console.log(sourceEditorId, sourceEditor);

	// console.log(editor, id);

	// if (!editor) return {dropLine : false, dragRef : null, isDragging: false }};

	const [dropLine, setDropLine] = useState<DropLineDirection>('');

	const [{ isDragging }, dragRef, preview] = useDragNode(editor, {
		id,
		sourceEditor: editor,
		type,
		...dragOptions,
	});

	const [{ isOver }, drop] = useDropNode(editor, {
		accept: type,
		id,
		nodeRef,
		dropLine,
		onChangeDropLine: setDropLine,
		...dropOptions,
	});

	if (previewOptions.disable) {
		drop(nodeRef);
		preview(getEmptyImage(), { captureDraggingState: true });
	} else if (previewOptions.ref) {
		drop(nodeRef);
		preview(previewOptions.ref);
	} else {
		preview(drop(nodeRef));
	}

	if (!isOver && dropLine) {
		setDropLine('');
	}

	return {
		isDragging,
		isOver,
		dropLine,
		dragRef,
	};
};
