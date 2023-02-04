import React from 'react';
import EditorComponent from '../../packages/editor/EditorComponent';

const GraphEditor: React.FC = () => {
  return (
    <div className='overflow-hidden p-sm h-full w-full  border-node border-4'>
      <EditorComponent />
    </div>
  );
};
export default GraphEditor;
