//Node with just its title

import { Cube } from '@styled-icons/boxicons-solid/Cube';
import { useContext, useState } from 'react';
import { OnHoverMenu } from './OnHoverMenu';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../../packages/graph/context/GraphViewContext';

const CollapsedGraphNode: React.FC<{ title: string; id: string }> = ({
  title,
  id,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const { setNodeInView } = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;
  const buttonItems = [
    {
      src: 'navigation',
      onClick: () => setNodeInView(id),
    },
    {
      src: 'expand',
      onClick: () => setNodeInView(id),
    },
  ];
  return (
    <div
      onMouseOver={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
      className='w-full h-full flex items-center content-center justify-items-stretch flex-row bg-base_white'
    >
      <div className='flex flex-row gap-x-3 items-center'>
        <Cube size={'1em'} />
        <h4 className='text-sm'>{title}</h4>
      </div>
      {showMenu && <OnHoverMenu buttonItems={buttonItems} />}
    </div>
  );
};
export default CollapsedGraphNode;
