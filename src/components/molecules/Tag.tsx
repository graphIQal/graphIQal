import React, { useContext, useEffect, useState } from 'react';
import { OnHoverMenu } from '../organisms/OnHoverMenu';
import { useViewAPI, useViewData } from '../context/ViewContext';
import {
  useGraphViewAPI,
  useGraphViewData,
} from '../../packages/graph/context/GraphViewContext';

type TagProps = {
  tag: string;
  id: string;
};

export const Tag: React.FC<TagProps> = ({ tag, id }) => {
  const [showMenu, setShowMenu] = useState(false);

  const { nodeId } = useViewData();
  const { changeNodeId } = useViewAPI();
  const { nodeInFocusId } = useGraphViewData();
  const { changeNodeInFocusId } = useGraphViewAPI();

  const buttonItems = [
    { src: 'navigation', onClick: () => changeNodeId(id) },
    { src: 'spotlight', onClick: () => changeNodeInFocusId(id) },
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
