//Node with just its title

import { Cube } from '@styled-icons/boxicons-solid/Cube';
import { useContext, useState } from 'react';
import { OnHoverMenu } from './OnHoverMenu';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../../packages/graph/context/GraphViewContext';
import { deleteNode } from '../../helpers/backend/deleteNode';
import IconCircleButton from '../molecules/IconCircleButton';
import { updateNode } from '../../helpers/backend/updateNode';
import { setCollapsedNode } from '../../packages/graph/helpers/setCollapsedNode';
import router from 'next/router';
import ViewContext, { ViewContextInterface } from '../context/ViewContext';

const CollapsedGraphNode: React.FC<{
  title: string;
  id: string;
  icon: string;
  color: string;
  toggleDropdown: () => void;
}> = ({ title, id, icon, color, toggleDropdown }) => {
  const [showMenu, setShowMenu] = useState(false);

  const graphViewContext = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;
  const viewContext = useContext(ViewContext) as ViewContextInterface;

  // const { setNodeInView } = viewContext;
  const buttonItems = [
    {
      src: 'navigation',
      onClick: () => router.push(`/${viewContext.username}/${id}`, undefined),
    },
    {
      src: 'expand',
      onClick: () => setCollapsedNode(id, graphViewContext),
    },
    {
      src: 'remove',
      onClick: () => deleteNode(id, graphViewContext),
    },
  ];
  return (
    <div
      onMouseOver={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
      className='w-full h-full flex items-center content-center justify-items-stretch flex-row bg-base_white '
    >
      <div className='flex flex-row gap-x-3 items-center'>
        <IconCircleButton src={icon} onClick={toggleDropdown} circle={false} />
        <form>
          <input
            type='text'
            name='name'
            id='collapsed_node'
            defaultValue={title}
            onChange={(newVal: any) =>
              updateNode('title', newVal.target.value, id, graphViewContext)
            }
          />
        </form>
        {/* <h4 className='text-sm'>{title}</h4> */}
      </div>
      {showMenu && <OnHoverMenu buttonItems={buttonItems} />}
    </div>
  );
};
export default CollapsedGraphNode;
