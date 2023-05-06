import React from 'react';

export type ItemProps = {
  text: string;
  icon?: string;
  onPress: () => void;
};

export const Dropdown: React.FC<{
  items: ItemProps[];
  activeIndex: number;
}> = ({ items, activeIndex }) => {
  return (
    <div className='absolute w-max shadow-md bg-white z-20'>
      {' '}
      {items.map((item, i) => {
        const active = i == activeIndex;
        return (
          <div
            key={i}
            className={
              'p-1 border hover:bg-selected_white hover:cursor-pointer ' +
              (active && 'bg-blue-50')
            }
            onClick={item.onPress}
          >
            {item.text}
          </div>
        );
      })}
    </div>
  );
};
