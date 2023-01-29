import React, { ReactNode } from 'react';
import Circle from '../atoms/Circle';

type NodeCircleProps = {
  diameter?: number;
  children: ReactNode;
  onClick?: () => void;
  ref?: any;
};
//circle to represent a node with its title inside
//diameter is optional
const NodeCircle: React.FC<NodeCircleProps> = ({
  diameter = 100,
  children,
  onClick,
}) => {
  return (
    <Circle
      diameter={diameter}
      backgroundClass='bg-node'
      children={children}
      onClick={onClick}
    />
  );
};
export default NodeCircle;
