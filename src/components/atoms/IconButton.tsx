import React from 'react';

type IconButtonProps = {
	src: any;
	onClick?: () => void;
};

//An icon that is clickable
//src can be either an image or another component, in which case onClick should be specified in that component already when passed in
const IconButton: React.FC<IconButtonProps> = ({ src, onClick = () => {} }) => {
	const classes = 'icon_button hover:opacity-50';
	const renderButton = () => {
		if (typeof src == 'string') {
			return <img src={src} className={classes} onClick={onClick} />;
		} else {
			return <div onClick={onClick}>{src}</div>;
		}
	};
	return renderButton();
};
export default IconButton;
