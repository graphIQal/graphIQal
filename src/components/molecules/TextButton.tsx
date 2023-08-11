import React, { useState } from 'react';

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
	const [effect, setEffect] = useState(false);

	return (
		<div
			className='text-sm'
			onClick={() => {
				onClick();
				setEffect(true);
			}}
		>
			<div
				onAnimationEnd={() => setEffect(false)}
				className={`${
					effect && 'animate-wiggle '
				} text-base_black border-base_black font-semibold border transition-transform transform-gpu hover:scale-105 rounded-full px-4 py-2 focus:outline-none ${className}`}
			>
				{text}
			</div>
		</div>
	);
};

export default TextButton;
