//Node with just its title

import { Cube } from '@styled-icons/boxicons-solid/Cube';

const CollapsedGraphNode: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className='w-full h-full flex items-center content-center flex-row gap-x-3 bg-base_white'>
      <Cube size={'1em'} />
      <h4 className='text-sm'>{title}</h4>
    </div>
  );
};
export default CollapsedGraphNode;
