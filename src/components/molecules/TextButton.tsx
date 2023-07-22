import React from 'react';

interface TextButtonProps {
	onClick: () => void;
	text: string;
	className?: string;
}
//filled circle button with plus icon button inside
const TextButton: React.FC<TextButtonProps> = ({
	onClick,
	text,
	className,
}) => {
	return (
		<div className='text-sm' onClick={onClick}>
			<div
				className={`text-base_black border-base_black hover:text-lining font-semibold border transition-transform transform-gpu hover:scale-105 rounded-full px-4 py-2 focus:outline-none ${className}`}
			>
				{text}
			</div>
		</div>
	);
};

export default TextButton;
