import React from 'react';
import ButtonText from '../atoms/ButtonText';
import './molecules.css';

export type ToolbarButtonProps = {
  item: {
    buttonText: String;
    icon?: string;
    onPress(params: any): void;
  };
  className?: string;
};

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ item, className }) => {
  const { onPress, buttonText, icon } = item;
  return (
    <div className={className} onClick={onPress}>
      <ButtonText text={buttonText} />
      {icon && icon}
    </div>
  );
};
export default ToolbarButton;
