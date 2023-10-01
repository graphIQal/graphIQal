import React from 'react';
import IconCircleButton from './IconCircleButton';
import IconButton from '../atoms/IconButton';
import { Icons } from '../icons';

type IconTitleProps = {
	icon: string | undefined;
	title: string;
	onClick?: () => void;
	textClasses?: any;
};

//title with icon on its left
//if you want icon to be clickable, put this in the component
const IconTitle: React.FC<IconTitleProps> = ({
	icon,
	title,
	onClick,
	textClasses = '',
}) => {
	return (
		<span className='flex flex-row content-center items-center self-center ml-1'>
			{icon ? (
				icon in Icons ? (
					React.createElement(Icons[icon], {
						className: 'h-4 w-4',
					})
				) : (
					<span>{icon}</span>
				)
			) : (
				<Icons.node className='h-4 w-4' />
			)}
			<h3 className={'ml-xxs ' + textClasses}>{title}</h3>
		</span>
	);
};
export default IconTitle;
