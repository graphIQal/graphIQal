import React from 'react';
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

type NodeButtonProps = {
	onClick: (e?: any) => void;
	src: string;
	selected?: boolean;
	size?: number;
	color?: string;
	hoverText?: string;
};

const IconButton: React.FC<NodeButtonProps> = ({
	onClick,
	src,
	selected = false,
	size = 30,
	color = 'black',
	hoverText = '',
}) => {
	const iconSize = size * 0.5;

	const handleClick = (e: any) => {
		e.stopPropagation();
		e.preventDefault();
		onClick(e);
	};

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

	return (
		<div
			className='hover:cursor-pointer hover:opacity-80 inline-block'
			title={hoverText}
			onClick={handleClick}
		>
			<div
				className='rounded-md bg-opacity-0 hover:bg-opacity-10 bg-black flex align-middle justify-center items-center'
				style={{
					width: size + 'px',
					height: size + 'px',
				}}
			>
				{src in icons ? (
					icons[src]
				) : src in Icons ? (
					React.createElement(Icons[src], {
						className: 'h-4 w-4',
					})
				) : (
					<span>{src}</span>
				)}
			</div>
		</div>
	);
};
export default IconButton;
