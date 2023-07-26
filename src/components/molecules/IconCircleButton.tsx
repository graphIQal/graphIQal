import React from 'react';
import Circle from '../atoms/Circle';
import IconButton from '../atoms/IconButton';
import { Plus } from '@styled-icons/fa-solid/Plus';
import { Star } from '@styled-icons/fa-solid/Star';
import { Pencil } from '@styled-icons/bootstrap/Pencil';
import { Cube } from '@styled-icons/boxicons-solid/Cube';
import { Undo } from '@styled-icons/icomoon/Undo';
import { Redo } from '@styled-icons/icomoon/Redo';
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

type NodeButtonProps = {
	onClick: () => void;
	src: string;
	selected?: boolean;
	size?: number;
	circle?: boolean;
	color?: string;
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
}) => {
	const iconSize = size * 0.5;
	const handleClick = (e: any) => {
		e.stopPropagation();
		e.preventDefault();
		onClick();
	};
	const icons: any = {
		plus: (
			<Plus
				color={!selected ? color : 'white'}
				onClick={handleClick}
				size={iconSize}
			/>
		),
		draw: (
			<Pencil
				color={!selected ? color : 'white'}
				onClick={handleClick}
				size={iconSize}
			/>
		),
		undo: (
			<Undo
				color={!selected ? color : 'white'}
				onClick={handleClick}
				size={iconSize}
			/>
		),
		redo: (
			<Redo
				color={!selected ? color : 'white'}
				onClick={handleClick}
				size={iconSize}
			/>
		),
		spotlight: (
			<Flashlight
				color={!selected ? color : 'white'}
				onClick={handleClick}
				size={iconSize}
			/>
		),
		navigation: (
			<Navigation
				color={!selected ? color : 'white'}
				onClick={handleClick}
				size={iconSize}
			/>
		),
		expand: (
			<ArrowsAngleExpand
				color={!selected ? color : 'white'}
				onClick={handleClick}
				size={iconSize}
			/>
		),
		remove: (
			<Trash
				color={!selected ? color : 'white'}
				onClick={handleClick}
				size={iconSize}
			/>
		),
		connection: (
			<Connectdevelop
				color={!selected ? color : 'white'}
				onClick={handleClick}
				size={iconSize}
			/>
		),
		close: (
			<CloseOutline
				color={!selected ? color : 'white'}
				onClick={handleClick}
				size={iconSize}
			/>
		),
		block: (
			<Cube
				size={'1em'}
				color={!selected ? color : 'white'}
				onClick={handleClick}
			/>
		),
		angleRight: (
			<AngleRight
				size={'1em'}
				color={!selected ? color : 'white'}
				onClick={handleClick}
			/>
		),
		angleLeft: (
			<AngleLeft
				size={'1em'}
				color={!selected ? color : 'white'}
				onClick={handleClick}
			/>
		),
		angleDown: (
			<AngleDown
				size={'1em'}
				color={!selected ? color : 'white'}
				onClick={handleClick}
			/>
		),
		save: (
			<Save
				size={'1em'}
				color={!selected ? color : 'white'}
				onClick={handleClick}
			/>
		),
		data: (
			<Data
				size={'1em'}
				color={!selected ? color : 'white'}
				onClick={handleClick}
			/>
		),
		algo: (
			<Thealgorithms
				size={'1em'}
				color={!selected ? color : 'white'}
				onClick={handleClick}
			/>
		),
		checklist: (
			<CardChecklist
				size={'1em'}
				color={!selected ? color : 'white'}
				onClick={handleClick}
			/>
		),
		star: (
			<Star
				size={'1em'}
				color={selected ? color : 'white'}
				onClick={handleClick}
			/>
		),
		menu: (
			<MenuOutline
				size={'1em'}
				color={!selected ? color : 'white'}
				onClick={handleClick}
			/>
		),
		settings: (
			<Settings
				size={'1em'}
				color={!selected ? color : 'white'}
				onClick={handleClick}
			/>
		),
	};

	return (
		<div className='hover:cursor-pointer hover:opacity-80'>
			{circle ? (
				<Circle
					diameter={size}
					children={<IconButton onClick={onClick} src={icons[src]} />}
					backgroundClass={selected ? 'bg-base_black' : 'bg-white'}
				/>
			) : (
				<div
					className='rounded-full bg-opacity-0 hover:bg-opacity-10 bg-black flex align-middle justify-center items-center'
					style={{ width: size + 'px', height: size + 'px' }}
				>
					<IconButton onClick={onClick} src={icons[src]} />
				</div>
			)}
		</div>
	);
};
export default IconCircleButton;
