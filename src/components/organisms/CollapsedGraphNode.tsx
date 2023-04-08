import IconButton from '../atoms/IconButton';
import { Cube } from '@styled-icons/boxicons-solid/Cube';

const CollapsedGraphNode: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className='w-full h-full flex items-center content-center flex-row justify-between bg-base_white'>
      <h3>{title}</h3>
      <Cube size={'1.5em'} />
    </div>
  );
};
export default CollapsedGraphNode;
