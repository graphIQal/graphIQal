import React from 'react';
import Circle from '../atoms/Circle';

type NodeCircleProps = {
  diameter?: number;
  text: string;
};
//circle to represent a node with its title inside
//diameter is optional
const NodeCircle: React.FC<NodeCircleProps> = ({ diameter = 100, text }) => {
  return (
    <Circle
      diameter={100}
      backgroundClass='bg-node'
      children={<h2>{text}</h2>}
    />
  );
};
export default NodeCircle;
