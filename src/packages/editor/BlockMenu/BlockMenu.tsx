import React from 'react';
import './BlockMenu.css';

type BlockMenuItem = {
  title: string;
  onPress(params: any): void;
  className: string;
};

type BlockMenuProps = {
  items: BlockMenuItem[];
  className: string;
};

//
const BlockMenu: React.FC<BlockMenuProps> = ({ items, className }) => {
  const renderButtons = () => {
    return items.map((item, i) => (
      <div className={item.className} onClick={item.onPress} key={i}>
        {item.title}
      </div>
    ));
  };

  return <div className={className}>{renderButtons()}</div>;
};

export default BlockMenu;
