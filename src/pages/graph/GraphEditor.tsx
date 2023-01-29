import React from 'react';
import EditorComponent from '../../packages/editor/EditorComponent';

const GraphEditor: React.FC = () => {
  return (
    <div className='resize overflow-hidden p-sm  border-node border-4'>
      <EditorComponent />
    </div>
  );
};
export default GraphEditor;
