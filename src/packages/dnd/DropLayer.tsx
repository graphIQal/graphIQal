import React from 'react';
import { useDrop } from 'react-dnd';

const DropLayer: React.FC = () => {
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: 'box',
		drop: () => ({ name: 'Dustbin' }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}));

	const isActive = canDrop && isOver;
	let backgroundColor = 'red';
	if (isActive) {
		backgroundColor = 'darkgreen';
	} else if (canDrop) {
		backgroundColor = 'darkkhaki';
	}

	return (
		<div ref={drop} style={{ borderWidth: 5, backgroundColor }}>
			<h1>other box</h1>
		</div>
	);
};

export default DropLayer;
