import {
	createPlateUI,
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	PlateRenderElementProps,
	useEditorRef,
} from '@udecode/plate';
import { CSSProperties, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import Handle from '../../../components/atoms/Handle';
import { DropLineDirection, ItemTypes } from '../../dnd-editor/types';
import { MyTitleElement, MyValue, useMyEditorRef } from '../plateTypes';
import { Draggable } from '../../dnd-editor/components/Draggable';
import { useRouter } from 'next/router';

// ELEMENTS
// Define a React component renderer for our code blocks.

//Question: do we want to drag multiple blocks at the same time?
export const CodeElement = (props: PlateRenderElementProps) => {
	return (
		<pre {...props.attributes}>
			<code>{props.children}</code>
		</pre>
	);
};

export const Block = (props: PlateRenderElementProps) => {
	return (
		<div className='decoration-[0.1px] ' /**{...props.attributes}**/>
			{props.children}
		</div>
	);
};

export const NodeLink = (props: any) => {
	// console.log('rendering nodeLink');
	// console.log(props);

	const router = useRouter();

	return (
		<div
			className='bg-node cursor-pointer hover:opacity-80 font-semibold underline-offset-2 decoration-lining truncate'
			onClick={() => {
				// Navigate to node
				router.push(props.element.routeString, undefined);
			}}
		>
			{props.children}
		</div>
	);
};

export const NodeBlock = (props: PlateRenderElementProps) => {
	return (
		<Block>
			<div>{props.children}</div>
		</Block>
	);
};

export const TitleElement = (props: any) => {
	// Showing untitled if title is empty.

	return (
		<div className='ml-[14px]'>
			<h1 className={'ml-1 text-3xl font-extrabold mb-3'}>
				<div
					className={
						props.element.children[0].text.length === 0
							? 'before:content-["Untitled"] before:ml-0.5 before:block before:absolute before:cursor-text before:opacity-80'
							: ''
					}
				>
					{props.children}
				</div>
			</h1>
		</div>
	);
};

export const H1 = (props: PlateRenderElementProps) => {
	return <h1 className='text-xl font-bold'>{props.children}</h1>;
};

export const LI = (props: PlateRenderElementProps) => {
	return <li className=''>{props.children}</li>;
};

export const H2 = (props: PlateRenderElementProps) => {
	return <h2 className='text-lg font-bold'>{props.children}</h2>;
};

export const H3 = (props: PlateRenderElementProps) => {
	return <h3 className='text-md font-bold'>{props.children}</h3>;
};

export const OL = (props: PlateRenderElementProps) => {
	return (
		<ol className='list-decimal list-outside pl-4'>
			<li className=''>{props.children}</li>
		</ol>
	);
};
export const UL = (props: PlateRenderElementProps) => {
	return (
		<ul className='list-disc list-outside pl-4'>
			<li className=''>{props.children}</li>
		</ul>
	);
};
