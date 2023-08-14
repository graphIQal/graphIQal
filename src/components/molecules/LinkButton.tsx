import React, { useState } from 'react';

interface LinkButtonProps {
	onClick: () => void;
	children: JSX.Element;
	className?: string;
}
//filled circle button with plus icon button inside
const LinkButton: React.FC<LinkButtonProps> = ({
	onClick,
	children,
	className,
}) => {
	const [effect, setEffect] = useState(false);

	return (
		<div
			className='text-sm inline-block'
			onClick={() => {
				onClick();
				setEffect(true);
			}}
		>
			<div
				onAnimationEnd={() => setEffect(false)}
				className={`${
					effect && 'animate-wiggle '
				} text-base_black font-semibold p-1 hover:bg-lining rounded-sm focus:outline-none cursor-pointer ${className}`}
			>
				{children}
			</div>
		</div>
	);
};

export default LinkButton;
