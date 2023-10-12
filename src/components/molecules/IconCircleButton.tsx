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
import { Icons } from '../icons';
import { cn } from '@/lib/utils';

type NodeButtonProps = {
	onClick: (e?: any) => void;
	src: string;
	selected?: boolean;
	size?: number;
	circle?: boolean;
	color?: string;
	hoverText?: string;
	className?: string;
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
	className = '',
}) => {
	const iconSize = size * 0.5;

	const icons: { [key: string]: JSX.Element } = {
		plus: <Plus color={!selected ? color : 'white'} size={iconSize} />,
		draw: <Pencil color={!selected ? color : 'white'} size={iconSize} />,
		undo: <Undo color={!selected ? color : 'white'} size={iconSize} />,
		redo: <Redo color={!selected ? color : 'white'} size={iconSize} />,
		spotlight: (
			<Flashlight color={!selected ? color : 'white'} size={iconSize} />
		),
		navigation: (
			<Navigation color={!selected ? color : 'white'} size={iconSize} />
		),
		expand: (
			<ArrowsAngleExpand
				color={!selected ? color : 'white'}
				size={iconSize}
			/>
		),
		remove: <Trash color={!selected ? color : 'white'} size={iconSize} />,
		connection: (
			<Connectdevelop
				color={!selected ? color : 'white'}
				size={iconSize}
			/>
		),
		close: (
			<CloseOutline color={!selected ? color : 'white'} size={iconSize} />
		),
		block: <Cube size={'1em'} color={!selected ? color : 'white'} />,
		graph: (
			<CircularGraph size={'1em'} color={!selected ? color : 'white'} />
		),
		angleRight: (
			<AngleRight size={'1em'} color={!selected ? color : 'white'} />
		),
		angleLeft: (
			<AngleLeft size={'1em'} color={!selected ? color : 'white'} />
		),
		angleDown: (
			<AngleDown size={'1em'} color={!selected ? color : 'white'} />
		),
		save: <Save size={'1em'} color={!selected ? color : 'white'} />,
		data: <Data size={'1em'} color={!selected ? color : 'white'} />,
		algo: (
			<Thealgorithms size={'1em'} color={!selected ? color : 'white'} />
		),
		checklist: (
			<CardChecklist size={'1em'} color={!selected ? color : 'white'} />
		),
		star: selected ? (
			<Star size={'1em'} color={color} />
		) : (
			<HollowStar size={'1em'} />
		),
		menu: (
			<MenuOutline size={iconSize} color={!selected ? color : 'white'} />
		),
		settings: (
			<Settings size={iconSize} color={!selected ? color : 'white'} />
		),
		search: <Search size={iconSize} color={color} />,
		ArrowLeft: <ArrowLeft size={iconSize} color={color} />,
		ArrowRight: <ArrowRight size={iconSize} color={color} />,
		Cut: <Cut size={iconSize} color={selected ? color : 'black'} />,
		node: <CircularGraph size={iconSize} color={'black'} />,
	};

	const handleClick = (e: any) => {
		console.log('handleClick');
		e.stopPropagation();
		e.preventDefault();
		onClick(e);
	};

	return (
		<div
			className={cn(
				'hover:cursor-pointer hover:opacity-80 inline-block h-4 w-4 rounded-full ml-1 mr-1',
				className
			)}
			title={hoverText}
			onClick={handleClick}
		>
			{circle ? (
				<Circle
					// onClick={handleClick}
					diameter={size}
					children={<IconButton src={src} onClick={handleClick} />}
					backgroundClass={selected ? 'bg-base_black' : 'bg-white'}
				/>
			) : (
				<div
					className='rounded-full bg-opacity-0 hover:bg-opacity-10 bg-black flex align-middle justify-center items-center'
					// style={{
					// 	width: size + 'px',
					// 	height: size + 'px',
					// }}
				>
					{src in icons ? (
						icons[src]
					) : src in Icons ? (
						React.createElement(Icons[src], {})
					) : (
						<span>{src}</span>
					)}
				</div>
			)}
		</div>
	);
};
export default IconCircleButton;
