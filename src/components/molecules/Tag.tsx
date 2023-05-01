import React, { useContext, useEffect, useState } from 'react';
import { OnHoverMenu } from '../organisms/OnHoverMenu';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../../packages/graph/context/GraphViewContext';

type TagProps = {
  tag: string;
  id: number;
};

export const Tag: React.FC<TagProps> = ({ tag, id }) => {
  const [showMenu, setShowMenu] = useState(false);

  const { setNodeInView } = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;

  const buttonItems = [
    { src: 'spotlight', onClick: () => null },
    { src: 'navigation', onClick: () => setNodeInView(tag) },
  ];
  return (
    <div
      id='tag_box'
      onMouseOver={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
      className={
        ' bg-blue-100 rounded-sm p-2 h-12 flex flex-row min-w-[50px] max-w-[100px] hover:w-auto hover:max-w-[500px] overflow-hidden align-middle items-center gap-x-md transition-width duration-300'
      }
      key={id}
    >
      <div id='tag_title'>{tag}</div>
      {showMenu && <OnHoverMenu buttonItems={buttonItems} />}
    </div>
  );
};