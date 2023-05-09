import React from 'react';

export type ItemProps = {
  text: string;
  icon?: string;
  onPress: () => void;
};

export const Dropdown: React.FC<{
  items?: ItemProps[];
  activeIndex: number;
  list?: boolean;
  children?: any;
}> = ({ items, activeIndex, list = true, children }) => {
  return (
    <div className='absolute w-max shadow-md bg-white z-[200]'>
      {' '}
      {list &&
        items &&
        items.map((item, i) => {
          const active = i == activeIndex;
          return (
            <div
              key={i}
              className={
                'p-1 border hover:bg-selected_white hover:cursor-pointer text-sm ' +
                (active && 'bg-blue-50')
              }
              onClick={item.onPress}
            >
              {item.text}
            </div>
          );
        })}
      {!list && children && children}
    </div>
  );
};
