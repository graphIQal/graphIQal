import { CSSProperties } from 'react';
import { useDrag } from 'react-dnd';
import Handle from '../../../components/atoms/Handle';
import { ItemTypes } from '../../dnd/types';

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

export const DefaultElement = (props: any) => {
	const [{ opacity }, drag, preview] = useDrag(() => ({
		type: ItemTypes.block,
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.4 : 1,
		}),
	}));

	const handleStyle: CSSProperties = {
		backgroundColor: 'green',
		width: '1rem',
		height: '1rem',
		display: 'inline-block',
		marginRight: '0.75rem',
		cursor: 'move',
	};

	const style: CSSProperties = {
		border: '1px dashed gray',
		padding: '0.5rem 1rem',
		marginBottom: '.5rem',
		backgroundColor: 'white',
		width: '20rem',
	};

	return (
		<div
			ref={preview}
			style={{ ...style, opacity }} /**{...props.attributes}**/
		>
			<span ref={drag}>
				<Handle></Handle>
			</span>
			{/*  */}
			{props.children}
		</div>
	);
};

export const Leaf = (props: any) => {
	if (props.leaf.italics) {
		console.log('leaf', props);
		return (
			<span
				{...props.attributes}
				className={props.leaf.text_type}
				style={{
					fontWeight: props.leaf.bold ? 'bold' : 'normal',
				}}
			>
				<em>{props.children}</em>
			</span>
		);
	}

	return (
		<span
			{...props.attributes}
			className={props.leaf.text_type}
			style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
		>
			{props.children}
		</span>
	);
};
