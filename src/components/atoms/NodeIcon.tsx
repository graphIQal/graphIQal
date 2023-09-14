import React from 'react';
import { Icons } from '../icons';

interface NodeIconProps {
	icon: string | undefined;
	size?: number;
}

const NodeIcon: React.FC<NodeIconProps> = ({ icon }) => {
	return icon ? (
		icon in Icons ? (
			React.createElement(Icons[icon], {
				className: 'h-4 w-4 inline-block inline mr-1',
			})
		) : (
			<span className='mr-1'>{icon}</span>
		)
	) : (
		<Icons.node className='h-4 w-4 inline-block mr-1' />
	);
};

export default NodeIcon;
