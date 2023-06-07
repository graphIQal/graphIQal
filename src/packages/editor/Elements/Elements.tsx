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
	console.log('title rendered ');

	return <h1 className='text-xl font-bold'>{props.children}</h1>;
};

export const H1 = (props: any) => {
	// const plateUI = createPlateUI({})[ELEMENT_H1];
	// return plateUI[ELEMENT_H1];

	console.log('h1');
	return <h1 className='text-lg'>{props.children}</h1>;
};

export const H2 = (props: any) => {
	// return createPlateUI({})[ELEMENT_H2];
	// return plateUI[ELEMENT_H2];

	console.log('h2');
	return <h2 className='text-md'>{props.children}</h2>;
};

export const H3 = (props: any) => {
	const plateUI = createPlateUI({})[ELEMENT_H3];
	// return plateUI[ELEMENT_H1];

	console.log('h3');
	return <h3 className='text-md'>{props.children}</h3>;
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
