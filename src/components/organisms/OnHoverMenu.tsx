import React from 'react';
import IconCircleButton from '../molecules/IconCircleButton';

type OnHoverMenuProps = {
  buttonItems: {
    src: string;
    onClick: () => void;
  }[];
};

export const OnHoverMenu: React.FC<OnHoverMenuProps> = ({ buttonItems }) => {
  return (
    <div className='flex flex-row'>
      {buttonItems.map((button: any, i: number) => (
        <IconCircleButton
          key={i}
          onClick={button.onClick}
          src={button.src}
          size={30}
          circle={false}
        />
      ))}
    </div>
  );
};
