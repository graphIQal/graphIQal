import React, { CSSProperties } from 'react';

const handleStyle: CSSProperties = {
	backgroundColor: 'green',
	width: '1rem',
	height: '1rem',
	display: 'inline-block',
	marginRight: '0.75rem',
	cursor: 'move',
};

type HandleProps = {
	ref: any;
};

const Handle: React.FC = () => {
	return <div style={handleStyle}></div>;
};

export default Handle;
