import React from 'react';
import Circle from '../atoms/Circle';
import IconButton from '../atoms/IconButton';
import { Plus } from '@styled-icons/fa-solid/Plus';
import { Pencil } from '@styled-icons/bootstrap/Pencil';
import { Cube } from '@styled-icons/boxicons-solid/Cube';
import { Undo } from '@styled-icons/icomoon/Undo';
import { Redo } from '@styled-icons/icomoon/Redo';

type NodeButtonProps = {
  onClick: () => void;
  src: string;
  selected?: boolean;
};

//filled circle button with plus icon button inside
//choose from dictionary of icons by passing in one of these string values as source: 'plus', 'draw'
const IconCircleButton: React.FC<NodeButtonProps> = ({
  onClick,
  src,
  selected = false,
}) => {
  const size = '1.5em';
  const icons: any = {
    plus: (
      <Plus
        color={!selected ? 'white' : 'white'}
        onClick={onClick}
        size={size}
      />
    ),
    draw: (
      <Pencil
        color={!selected ? 'white' : 'white'}
        onClick={onClick}
        size={size}
      />
    ),
    node: <Cube color={'blue'} size={size} onClick={onClick} />,
    undo: (
      <Undo
        color={!selected ? 'white' : 'white'}
        onClick={onClick}
        size={size}
      />
    ),
    redo: (
      <Redo
        color={!selected ? 'white' : 'white'}
        onClick={onClick}
        size={size}
      />
    ),
  };
  return (
    <div className='hover:cursor-pointer hover:opacity-80'>
      <Circle
        children={<IconButton onClick={onClick} src={icons[src]} />}
        diameter={50}
        backgroundClass={selected ? 'bg-base_black' : 'bg-connection'}
      />
    </div>
  );
};
export default IconCircleButton;
