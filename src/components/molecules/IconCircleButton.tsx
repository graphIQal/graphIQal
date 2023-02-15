import React from 'react';
import Circle from '../atoms/Circle';
import IconButton from '../atoms/IconButton';
import { Plus } from '@styled-icons/fa-solid/Plus';
import { Pencil } from '@styled-icons/bootstrap/Pencil';
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
  const size = '2em';
  const icons: any = {
    plus: (
      <Plus
        color={selected ? 'white' : 'black'}
        onClick={onClick}
        size={size}
      />
    ),
    draw: (
      <Pencil
        color={selected ? 'white' : 'black'}
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
        backgroundClass={selected ? 'bg-connection' : 'bg-node'}
      />
    </div>
  );
};
export default IconCircleButton;
