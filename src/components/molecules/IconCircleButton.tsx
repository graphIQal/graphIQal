import React from 'react';
import Circle from '../atoms/Circle';
import IconButton from '../atoms/IconButton';
import { Plus } from '@styled-icons/fa-solid/Plus';
import { Star } from '@styled-icons/fa-solid/Star';
import { Star as HollowStar } from '@styled-icons/fa-regular/Star';
import { Pencil } from '@styled-icons/bootstrap/Pencil';
import { Cube } from '@styled-icons/boxicons-solid/Cube';
import { Undo } from '@styled-icons/icomoon/Undo';
import { Redo } from '@styled-icons/icomoon/Redo';
import { Search } from '@styled-icons/feather/Search';
import { Flashlight } from '@styled-icons/fluentui-system-filled/Flashlight';
import { Navigation } from '@styled-icons/boxicons-regular/Navigation';
import { ArrowsAngleExpand } from '@styled-icons/bootstrap/ArrowsAngleExpand';
import { Trash } from '@styled-icons/bootstrap/Trash';
import { Connectdevelop } from '@styled-icons/fa-brands/Connectdevelop';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import { AngleDown } from '@styled-icons/fa-solid/AngleDown';
import { AngleRight } from '@styled-icons/fa-solid/AngleRight';
import { AngleLeft } from '@styled-icons/fa-solid/AngleLeft';
import { Save } from '@styled-icons/boxicons-regular/Save';
import { Data } from '@styled-icons/boxicons-solid/Data';
import { Thealgorithms } from '@styled-icons/simple-icons/Thealgorithms';
import { CardChecklist } from '@styled-icons/bootstrap/CardChecklist';
import { MenuOutline } from '@styled-icons/evaicons-outline/MenuOutline';
import { Settings } from '@styled-icons/material/Settings';
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft';
import { ArrowRight } from '@styled-icons/fa-solid/ArrowRight';
import { CircularGraph } from '@styled-icons/entypo/CircularGraph';
import { Cut } from '@styled-icons/ionicons-sharp/Cut';

type NodeButtonProps = {
	onClick: (e?: any) => void;
	src: string;
	selected?: boolean;
	size?: number;
	circle?: boolean;
	color?: string;
	hoverText?: string;
};

//filled circle button with plus icon button inside
//choose from dictionary of icons by passing in one of these string values as source: 'plus', 'draw'
const IconCircleButton: React.FC<NodeButtonProps> = ({
	onClick,
	src,
	selected = false,
	size = 30,
	circle = true,
	color = 'black',
	hoverText = '',
}) => {
	const iconSize = size * 0.5;

	const handleClick = (e: any) => {
		console.log('handleClick');
		e.stopPropagation();
		e.preventDefault();
		onClick(e);
	};

	return (
		<div
			className='hover:cursor-pointer hover:opacity-80 inline-block'
			title={hoverText}
			onClick={handleClick}
		>
			{circle ? (
				<Circle
					// onClick={handleClick}
					diameter={size}
					children={<IconButton src={src} onClick={() => {}} />}
					backgroundClass={selected ? 'bg-base_black' : 'bg-white'}
				/>
			) : (
				<div
					className='rounded-full bg-opacity-0 hover:bg-opacity-10 bg-black flex align-middle justify-center items-center'
					style={{
						width: size + 'px',
						height: size + 'px',
					}}
				>
					<IconButton src={src} onClick={() => {}} />
				</div>
			)}
		</div>
	);
};
export default IconCircleButton;
