import React from 'react';
import IconCircleButton from '../molecules/IconCircleButton';

type OnHoverMenuProps = {
  buttonItems: {
    icon: string;
    buttonText: string;
    onPress: () => void;
    // label?: string;
  }[];
};

export const HoveringToolbar: React.FC<OnHoverMenuProps> = ({
  buttonItems,
}) => {
  return (
    <div className='flex flex-col w-max justify-center z-50 rounded-sm border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'>
      {buttonItems.map((button: any, i: number) => (
        <div
          onClick={button.onPress}
          className='flex flex-row align-middle items-center gap-y-sm gap-x-sm p-1 justify-start hover:bg-selected_white rounded-sm'
        >
          <IconCircleButton
            key={i}
            onClick={button.onPress}
            src={button.icon}
            size={30}
            circle={false}
          />
          <h3 className='text-sm'>{button.buttonText}</h3>
        </div>
      ))}
    </div>
  );
};
