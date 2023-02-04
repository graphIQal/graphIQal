import React, { useEffect, useRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import { Value } from '@udecode/plate-core';
import { useDndNode } from '../hooks/useDnDNode';
import { getBlockStyles } from './Draggable.styles';
import { DraggableProps, DragHandleProps } from './Draggable.types';
import { getMyEditor, MyValue, useMyEditorRef } from '../../editor/plateTypes';
import { deselect } from '@udecode/plate';

const DragHandle = ({ styles, ...props }: DragHandleProps) => {
	return (
		<button type='button'>
			<svg
				viewBox='0 0 10 10'
				className='dragHandle'
				style={{
					width: ' 14px',
					height: ' 14px',
					display: ' block',
					fill: ' inherit',
					flexShrink: ' 0',
					backfaceVisibility: 'hidden',
				}}
			>
				<path d='M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z'></path>
			</svg>
		</button>
	);
};

// So I can either :
// 1. Create a plate plugin like they do, and wrap all of the components in it
// 2. Create a default block and wrap all components in default
// 1 just makes more sense right? Are there any
// Create elements list

export const Draggable = <V extends MyValue>(props: DraggableProps<V>) => {
	const { children, element, componentRef, editor } = props;

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

	const elementId = element.id as string;

	return (
		<div
			// style={stylxes.root.css}
			// className={styles.root.className}
			className={'group relative flex-row flex ' + elementId}
			ref={multiRootRef}
		>
			<div
				// style={[
				// 	...(styles.blockAndGutter?.css ?? []),
				// 	...(styles.gutterLeft?.css ?? []),
				// ]}
				// className={styles.gutterLeft.className}
				className={
					'flex h-full opacity-0 pointer-events-none cursor-text mr-1 group-hover:opacity-70 '
				}
				contentEditable={false}
			>
				<div
					// style={styles.blockToolbarWrapper?.css}
					// className={styles.blockToolbarWrapper?.className}
					className='flex height[1.5em]'
				>
					<div
						// style={styles.blockToolbar?.css}
						// className={styles.blockToolbar?.className}
						className=' mr-1 pointer-events-auto'
						ref={multiDragRef}
						onMouseDown={(e: any) => {
							deselect(editor);
							e.stopPropagation();
						}}
					>
						<DragHandle
							// element={element}
							// className={styles.dragHandle?.className}
							className='p-0 bg-transparent bg-no-repeat cursor-pointer overflow-hidden outline-none border-none minWidth[18px] height[18px]'
							onMouseDown={(e: any) => {
								e.stopPropagation();
							}}
						/>
					</div>
				</div>
			</div>

			<div
				ref={blockRef}
				// style={[
				// 	...(styles.blockAndGutter?.css ?? []),
				// 	...(styles.block?.css ?? []),
				// ]}
				// Add div
				className='w-full relative'
			>
				{children}

				{!!dropLine && (
					<div
						style={styles.dropLine?.css}
						className={styles.dropLine?.className}
						// className='opacity-80 w-full h-2 bg-blue-300'
						contentEditable={false}
					></div>
				)}
			</div>
		</div>
	);
};
