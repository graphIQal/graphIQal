import React from 'react';
import Circle from '../atoms/Circle';

type NodeCircleProps = {
  diameter?: number;
  text: string;
  onClick?: () => void;
};
//circle to represent a node with its title inside
//diameter is optional
const NodeCircle: React.FC<NodeCircleProps> = ({
  diameter = 100,
  text,
  onClick,
}) => {
  return (
    <Circle
      diameter={diameter}
      backgroundClass='bg-node'
      children={<h2>{text}</h2>}
      onClick={onClick}
    />
  );
};
export default NodeCircle;
