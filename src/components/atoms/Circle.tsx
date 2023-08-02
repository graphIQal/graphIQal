import React from 'react';

type CircleProps = {
	diameter: number | string;
	children?: any;
	backgroundClass: string;
	onClick: (e: any) => void;
	ref?: any;
};

//an empty circle that can contain any children
//the background color should be passed in as a class name (using tailwind)
const Circle: React.FC<CircleProps> = ({
	diameter,
	children,
	backgroundClass,
	onClick,
	ref,
}) => {
	const widthMinClass = 'min-w-[' + diameter + 'px]';
	const widthMaxClass = 'max-w-[' + diameter + 'px]';
	const heightMaxClass = 'max-h-[' + diameter + 'px]';
	const heightMinClass = 'min-h-[' + diameter + 'px]';

	const className = `${widthMaxClass} ${widthMinClass} ${heightMinClass} ${heightMaxClass} ${backgroundClass} rounded-full flex items-center justify-center mx-1 shadow-md`;

	return (
		<div
			style={{
				maxHeight: diameter,
				minHeight: diameter,
				minWidth: diameter,
				maxWidth: diameter,
			}}
			ref={ref}
			onClick={onClick}
			className={className}
		>
			{children}
		</div>
	);
};
export default Circle;
