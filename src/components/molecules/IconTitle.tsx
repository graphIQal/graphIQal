import React from 'react';
import IconCircleButton from './IconCircleButton';
import IconButton from '../atoms/IconButton';
import { Icons } from '../icons';

type IconTitleProps = {
	icon: string;
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
		<span className='flex flex-row content-center items-center self-center'>
			{icon in Icons ? (
				React.createElement(Icons[icon], {
					className: 'h-4 w-4',
				})
			) : (
				<span>{icon}</span>
			)}
			<h3 className={'ml-xxs ' + textClasses}>{title}</h3>
		</span>
	);
};
export default IconTitle;
