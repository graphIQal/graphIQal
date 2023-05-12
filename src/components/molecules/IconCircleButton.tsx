import React from 'react';
import Circle from '../atoms/Circle';
import IconButton from '../atoms/IconButton';
import { Plus } from '@styled-icons/fa-solid/Plus';
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
        <IconButton onClick={onClick} src={icons[src]} />
      )}
    </div>
  );
};
export default IconCircleButton;
