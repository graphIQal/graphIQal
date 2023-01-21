import {
	createPlateUI,
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	useEditorRef,
} from '@udecode/plate';
import { CSSProperties, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import Handle from '../../../components/atoms/Handle';
import { DropLineDirection, ItemTypes } from '../../dnd-editor/types';
import { useMyEditorRef } from '../plateTypes';
import '../editor.css';
import { Draggable } from '../../dnd-editor/components/Draggable';

// ELEMENTS
// Define a React component renderer for our code blocks.

//Question: do we want to drag multiple blocks at the same time?
export const CodeElement = (props: any) => {
	return (
		<pre {...props.attributes}>
			<code>{props.children}</code>
		</pre>
	);
};

export const Block = (props: any) => {
	const editor = useMyEditorRef();

	const [dropLine, setDropLine] = useState<DropLineDirection>('');

	const blockRef = useRef<HTMLDivElement>(null);
	const rootRef = useRef<HTMLDivElement>(null);

	const [{ opacity }, drag, preview] = useDrag(() => ({
		type: ItemTypes.block,
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.4 : 1,
		}),
	}));

	return (
		<div
			ref={preview}
			style={{ opacity }}
			className='text_box' /**{...props.attributes}**/
		>
			{props.children}
		</div>
	);
};

export const NodeBlock = (props: any) => {
	return (
		<Block>
			<div className='bg-base_white'>{props.children}</div>
		</Block>
	);
};

export const H1 = (props: any) => {
	// const plateUI = createPlateUI({})[ELEMENT_H1];
	// return plateUI[ELEMENT_H1];

	return <Block>{props.children}</Block>;
};

export const H2 = (props: any) => {
	const plateUI = createPlateUI({})[ELEMENT_H2];
	// return plateUI[ELEMENT_H1];

	return <h2>{props.children}</h2>;
};

export const H3 = (props: any) => {
	const plateUI = createPlateUI({})[ELEMENT_H3];
	// return plateUI[ELEMENT_H1];

	return <h3>{props.children}</h3>;
};

export const Leaf = (props: any) => {
	if (props.leaf.italics) {
		return (
			<span
				{...props.attributes}
				className={
					props.leaf.text_type + ' ' + props.leaf.bold
						? 'font-bold'
						: ''
				}
			>
				<em>{props.children}</em>
			</span>
		);
	}

	return (
		<span
			{...props.attributes}
			className={
				props.leaf.text_type + ' ' + props.leaf.bold ? 'font-bold' : ''
			}
		>
			{props.children}
		</span>
	);
};
