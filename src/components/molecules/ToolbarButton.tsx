import React from 'react';

export type ToolbarButtonProps = {
	item: {
		buttonText: String;
		icon?: string;
		onPress(params: any): void;
	};
	className?: string;
};

//Button for formatting/adding stuff for toolbars
const ToolbarButton: React.FC<ToolbarButtonProps> = ({ item, className }) => {
	const { onPress, buttonText, icon } = item;

	return (
		<div className={className} onClick={onPress}>
			<p className='button_text'>{buttonText}</p>
			{icon && icon}
		</div>
	);
};
export default ToolbarButton;
