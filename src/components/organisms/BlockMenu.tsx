import React from 'react';
import ToolbarButton from '../molecules/ToolbarButton';

type ToolbarButtonProps = {
  buttonText: String;
  icon?: string;
  onPress(params: any): void;
};

type BlockMenuProps = {
  items?: ToolbarButtonProps[];
};

const BlockMenu: React.FC<BlockMenuProps> = ({ items }) => {
  const renderButtons = () => {
    return items?.map((item, i) => {
      const { buttonText, icon, onPress } = item;
      const it = { buttonText, icon, onPress };
      return (
        <ToolbarButton
          key={i}
          className='menu_item first:rounded-l-text_box last:rounded-r-text_box'
          item={it}
        />
      );
    });
  };
  return <div className='menu'>{renderButtons()}</div>;
};

export default BlockMenu;
