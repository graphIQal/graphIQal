import React, { forwardRef, useMemo } from 'react';
// import {
// 	createNodesWithHOC,
// 	findNodePath,
// 	PlateRenderElementProps,
// 	Value,
// } from '@udecode/plate';
import { useReadOnly } from 'slate-react';
import { Draggable } from './Draggable';
import { DraggableProps } from './Draggable.types';
import { MyEditor, MyValue } from '../../editor/plateTypes';
import { PlateRenderElementProps, findNodePath } from '@udecode/plate-common';

export interface WithDraggableOptions<V extends MyValue = MyValue>
	extends Pick<
		DraggableProps<V>,
		'styles' | 'level' | 'filter' | 'allowReadOnly'
	> {}

export const withDraggable = <V extends MyValue>(
	Component: any,
	{
		styles,
		level = 0,
		filter,
		allowReadOnly = false,
	}: WithDraggableOptions<V> = {}
) => {
	return forwardRef((props: PlateRenderElementProps<V>, ref) => {
		const { attributes, element, editor } = props;

		const readOnly = useReadOnly();

		const path = useMemo(
			() => findNodePath(editor, element),
			[editor, element]
		);

		const filteredOut = useMemo(
			() =>
				path &&
				((Number.isInteger(level) &&
					level !== path.length - 1 &&
					false) ||
					(filter && filter(editor as MyEditor, path))),
			// This might be a problem
			[path, editor]
		);

		if (filteredOut || (!allowReadOnly && readOnly)) {
			return <Component {...props} />;
		}

		return (
			<Draggable
				editor={editor}
				attributes={attributes}
				element={element}
				componentRef={ref}
				styles={styles}
			>
				<Component {...props} />
			</Draggable>
		);
	});
};
