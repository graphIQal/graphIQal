import React, { useContext, useEffect, useState } from 'react';
import ViewContext, { ViewContextInterface } from '../context/ViewContext';
import { checkIfVisible } from '../../helpers/frontend/checkIfVisible';

type SelectableListProps = {
  listItems: any[];
  onEnter: () => any;
};

export const SelectableList: React.FC<SelectableListProps> = ({
  listItems,
  onEnter,
}) => {
  const [highlighted, setHighlighted] = useState(0);
  const { documentVar, username } = useContext(
    ViewContext
  ) as ViewContextInterface;

  const checkAndScroll = () => {
    const result = checkIfVisible(
      documentVar.getElementById('result' + highlighted),
      documentVar.getElementById('search_container')
    );
    if (result == 'bottom') {
      const scrollOffset = documentVar
        .getElementById('result' + highlighted)
        ?.getBoundingClientRect().height;
      documentVar
        .getElementById('result_container')
        ?.scrollBy(0, scrollOffset ? 3 * scrollOffset : 0);
    } else if (result == 'top') {
      const scrollOffset = documentVar
        .getElementById('result' + highlighted)
        ?.getBoundingClientRect().height;
      documentVar
        .getElementById('result_container')
        ?.scrollBy(0, scrollOffset ? -(3 * scrollOffset) : 0);
    }
  };

  const handleKeys = (event: any) => {
    if (event.keyCode == 40) {
      event.preventDefault();
      if (highlighted < listItems.length - 1) {
        setHighlighted(highlighted + 1);
        // checkAndScroll();
      } else {
        // document.getElementById('result_container')?.scrollTo(0, 0);
        setHighlighted(0);
      }
    } else if (event.keyCode == 38) {
      event.preventDefault();
      if (highlighted > 0) {
        setHighlighted(highlighted - 1);
        // checkAndScroll();
      } else {
        // const elem = documentVar.getElementById('result_container');
        // elem?.scrollTo(0, elem.getBoundingClientRect().height);
        setHighlighted(listItems.length - 1);
      }
    } else if (event.code == 'Enter') {
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', (event: any) => handleKeys(event));

    return () =>
      window.removeEventListener('keydown', (event: any) => handleKeys(event));
  }, []);

  return (
    <div id='tab1' onKeyDown={handleKeys}>
      {listItems.map((item, i) => {
        return (
          <div
            onKeyDown={handleKeys}
            onMouseOver={() => setHighlighted(i)}
            className={highlighted == i ? 'bg-selected_white' : ''}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};
