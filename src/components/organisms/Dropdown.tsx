import React from 'react';

export type ItemProps = {
  text: string;
  icon?: string;
  onPress: () => void;
};

export const Dropdown: React.FC<{ items: ItemProps[] }> = ({ items }) => {
  return (
    <div className='absolute w-full shadow-md bg-base_white z-10'>
      {' '}
      {items.map((item, i) => {
        return (
          <div
            key={i}
            className='p-1 border hover:bg-selected_white hover:cursor-pointer'
            onClick={item.onPress}
          >
            {item.text}
          </div>
        );
      })}
    </div>
  );
};
