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
};

//filled circle button with plus icon button inside
//choose from dictionary of icons by passing in one of these string values as source: 'plus', 'draw'
const IconCircleButton: React.FC<NodeButtonProps> = ({
  onClick,
  src,
  selected = false,
  size = 30,
  circle = true,
}) => {
  const iconSize = size * 0.5;
  const icons: any = {
    plus: (
      <Plus
        color={!selected ? 'black' : 'white'}
        onClick={onClick}
        size={iconSize}
      />
    ),
    draw: (
      <Pencil
        color={!selected ? 'black' : 'white'}
        onClick={onClick}
        size={iconSize}
      />
    ),
    node: <Cube color={'blue'} size={size} onClick={onClick} />,
    undo: (
      <Undo
        color={!selected ? 'black' : 'white'}
        onClick={onClick}
        size={iconSize}
      />
    ),
    redo: (
      <Redo
        color={!selected ? 'black' : 'white'}
        onClick={onClick}
        size={iconSize}
      />
    ),
    spotlight: (
      <Flashlight
        color={!selected ? 'black' : 'white'}
        onClick={onClick}
        size={iconSize}
      />
    ),
    navigation: (
      <Navigation
        color={!selected ? 'black' : 'white'}
        onClick={onClick}
        size={iconSize}
      />
    ),
    expand: (
      <ArrowsAngleExpand
        color={!selected ? 'black' : 'white'}
        onClick={onClick}
        size={iconSize}
      />
    ),
    remove: (
      <Trash
        color={!selected ? 'black' : 'white'}
        onClick={onClick}
        size={iconSize}
      />
    ),
    connection: (
      <Connectdevelop
        color={!selected ? 'black' : 'white'}
        onClick={onClick}
        size={iconSize}
      />
    ),
    close: (
      <CloseOutline
        color={!selected ? 'black' : 'white'}
        onClick={onClick}
        size={iconSize}
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
