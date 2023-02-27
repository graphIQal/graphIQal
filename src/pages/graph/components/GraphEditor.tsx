import React from 'react';
import EditorComponent from '../../../packages/editor/EditorComponent';
import { Cube } from '@styled-icons/boxicons-solid/Cube';

const GraphEditor: React.FC = () => {
  return (
    <div className='overflow-hidden p-sm h-full w-full  border-node border-4 flex flex-row'>
      <EditorComponent />
      <Cube size={'1.5em'} />
    </div>
  );
};
export default GraphEditor;
