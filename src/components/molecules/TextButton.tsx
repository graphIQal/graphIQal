import React from 'react';
type NodeButtonProps = {
	onClick: () => void;
	text: string;
};

//filled circle button with plus icon button inside
const TextButton: React.FC<NodeButtonProps> = ({ onClick, text }) => {
	return (
		<div className='bg-action text-base-blue' onClick={onClick}>
			<div>{text}</div>
		</div>
	);
};

export default TextButton;
