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
	return <div className='' /**{...props.attributes}**/>{props.children}</div>;
};

export const NodeBlock = (props: any) => {
	return (
		<Block>
			<div className=''>{props.children}</div>
		</Block>
	);
};

export const TitleElement = (props: any) => {
	// if (
	// 	props.element.children[0].text.length === 0 ||
	// 	props.element.children[0].text === 'Untitled'
	// ) {
	// 	return (
	// 		<div className='ml-[14px]'>
	// 			<h1 className='ml-1 text-3xl font-extrabold opacity-80'>
	// 				Untitled
	// 			</h1>
	// 		</div>
	// 	);
	// }

	return (
		<div className='ml-[14px]'>
			<h1 className='ml-1 text-3xl font-extrabold mb-3'>
				{props.children}
			</h1>
		</div>
	);
};

export const H1 = (props: any) => {
	return <h1 className='text-xl font-bold'>{props.children}</h1>;
};

export const H2 = (props: any) => {
	return <h2 className='text-lg font-bold'>{props.children}</h2>;
};

export const H3 = (props: any) => {
	return <h3 className='text-md font-semibold'>{props.children}</h3>;
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
