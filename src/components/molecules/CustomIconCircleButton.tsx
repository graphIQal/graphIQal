import React, { ReactElement } from 'react';
import Circle from '../atoms/Circle';
import IconButton from '../atoms/IconButton';

type NodeButtonProps = {
	onClick: () => void;
	icon: ReactElement;
	selected?: boolean;
	size?: number;
	circle?: boolean;
	color?: string;
};

//filled circle button with plus icon button inside
//choose from dictionary of icons by passing in one of these string values as source: 'plus', 'draw'
const CustomIconCircleButton: React.FC<NodeButtonProps> = ({
	onClick,
	icon,
	selected = false,
	size = 30,
	circle = true,
	color = 'black',
}) => {
	const iconSize = size * 0.5;
	const handleClick = (e: any) => {
		e.stopPropagation();
		e.preventDefault();
		onClick();
	};

	return (
		<div className='hover:cursor-pointer hover:opacity-80'>
			{circle ? (
				<Circle
					diameter={size}
					children={
						<IconButton onClick={onClick} src={icon}></IconButton>
					}
					backgroundClass={selected ? 'bg-base_black' : 'bg-white'}
				/>
			) : (
				<div
					className='rounded-full bg-opacity-0 hover:bg-opacity-10 bg-black flex align-middle justify-center items-center'
					style={{ width: size + 'px', height: size + 'px' }}
				>
					<IconButton onClick={onClick} src={icon}></IconButton>
				</div>
			)}
		</div>
	);
};
export default CustomIconCircleButton;
