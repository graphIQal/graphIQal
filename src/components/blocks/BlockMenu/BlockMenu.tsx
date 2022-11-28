import React from 'react';
import './BlockMenu.css';

type BlockMenuItem = {
	title: string;
	onPress(params: any): void;
};

type BlockMenuProps = {
	items: BlockMenuItem[];
};

//
const BlockMenu: React.FC<BlockMenuProps> = ({ items }) => {
	const renderButtons = () => {
		return items.map((item, i) => (
			<div className='block_item' onClick={item.onPress} key={i}>
				{item.title}
			</div>
		));
	};

	return <div className='block_menu'>{renderButtons()}</div>;
};

export default BlockMenu;
