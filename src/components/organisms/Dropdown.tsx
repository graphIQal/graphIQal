import React, { useContext, useEffect } from 'react';
import ViewContext, { ViewContextInterface } from '../context/ViewContext';
import { SelectableList } from '../templates/SelectableList';

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
  showDropdown: boolean;
  setShowDropdown: (val: boolean) => any;
  windowVar: Window;
}> = ({
  items,
  activeIndex,
  list = true,
  children,
  showDropdown,
  setShowDropdown,
}) => {
  const { windowVar } = useContext(ViewContext) as ViewContextInterface;

  useEffect(() => {
    windowVar.addEventListener('click', (e: any) => {
      e.stopPropagation();
      setShowDropdown(false);
    });

    return windowVar.removeEventListener('click', () => (e: any) => {
      e.stopPropagation();
      setShowDropdown(false);
    });
  }, [showDropdown]);
  return (
    <div className='absolute w-max shadow-md bg-white z-[200]'>
      {' '}
      {list && items && (
        <SelectableList
          onEnter={() => null}
          listItems={items.map((item, i) => {
            return (
              <div
                key={i}
                className={
                  'p-1 border hover:bg-selected_white hover:cursor-pointer text-sm '
                }
                onClick={item.onPress}
              >
                {item.text}
              </div>
            );
          })}
        />
      )}
      {!list && children && children}
    </div>
  );
};
