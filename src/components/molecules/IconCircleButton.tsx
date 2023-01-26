import React from 'react';
import Circle from '../atoms/Circle';
import IconButton from '../atoms/IconButton';
import { Plus } from '@styled-icons/fa-solid/Plus';
type NodeButtonProps = {
  onClick: () => void;
};

//filled circle button with plus icon button inside
const IconCircleButton: React.FC<NodeButtonProps> = ({ onClick }) => {
  return (
    <Circle
      children={
        <IconButton
          onClick={onClick}
          src={<Plus onClick={onClick} size='2em' />}
        />
      }
      diameter={50}
      backgroundClass='bg-node'
    />
  );
};
export default IconCircleButton;
