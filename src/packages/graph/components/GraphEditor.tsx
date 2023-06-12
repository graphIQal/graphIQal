/**
 * Expanded node view in graph that reveals text
 */
import React from 'react';
import EditorComponent from '../../../packages/editor/EditorComponent';
import { Cube } from '@styled-icons/boxicons-solid/Cube';

const GraphEditor: React.FC = () => {
  return (
    <div className='overflow-hidden p-sm h-full w-full  border-node border-4 flex flex-row'>
      <Cube size={'1.5em'} />
    </div>
  );
};
export default GraphEditor;
