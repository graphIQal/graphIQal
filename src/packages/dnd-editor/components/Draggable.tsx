import React, { useRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import { Value } from '@udecode/plate-core';
import { useDndNode } from '../hooks/useDnDNode';
import { getBlockStyles } from './Draggable.styles';
import { DraggableProps, DragHandleProps } from './Draggable.types';
import { MyValue } from '../../editor/plateTypes';

const DefaultDragHandle = ({ styles, ...props }: DragHandleProps) => (
	<button type='button' {...props} />
);

// So I can either :
// 1. Create a plate plugin like they do, and wrap all of the components in it
// 2. Create a default block and wrap all components in default
// 1 just makes more sense right? Are there any
// Create elements list

export const Draggable = <V extends MyValue>(props: DraggableProps<V>) => {
	const { children, element, componentRef, onRenderDragHandle } = props;

	const DragHandle = onRenderDragHandle ?? DefaultDragHandle;

	const blockRef = useRef<HTMLDivElement>(null);
	const rootRef = useRef<HTMLDivElement>(null);
	const dragWrapperRef = useRef(null);
	const multiRootRef = useMergedRef(componentRef, rootRef);

	const { dropLine, dragRef, isDragging } = useDndNode({
		id: element.id as string,
		nodeRef: rootRef,
		type: 'block',
	});

	const multiDragRef = useMergedRef(dragRef, dragWrapperRef);

	const styles = getBlockStyles({
		...props,
		direction: dropLine,
		isDragging,
	});

	return (
		<div
			style={styles.root.css}
			className={styles.root.className}
			ref={multiRootRef}
		>
			<div
				// style={[
				// 	...(styles.blockAndGutter?.css ?? []),
				// 	...(styles.gutterLeft?.css ?? []),
				// ]}
				// className={styles.gutterLeft?.className}
				contentEditable={false}
			>
				<div
				// style={styles.blockToolbarWrapper?.css}
				// className={styles.blockToolbarWrapper?.className}
				>
					<div
						// style={styles.blockToolbar?.css}
						// className={styles.blockToolbar?.className}
						ref={multiDragRef}
					>
						{/* <DragHandle
							element={element}
							// styles={styles.dragHandle?.css}
							className={styles.dragHandle?.className}
							onMouseDown={(e: any) => e.stopPropagation()}
						/> */}
					</div>
				</div>
			</div>

			<div
				ref={blockRef}
				// style={[
				// 	...(styles.blockAndGutter?.css ?? []),
				// 	...(styles.block?.css ?? []),
				// ]}
			>
				{children}

				{!!dropLine && (
					<div
						style={styles.dropLine?.css}
						className={styles.dropLine?.className}
						contentEditable={false}
					/>
				)}
			</div>
		</div>
	);
};
