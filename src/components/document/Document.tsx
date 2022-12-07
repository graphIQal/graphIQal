import React from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DropLayer from '../DropLayer';

// TypeScript users only add this code
import EditorComponent from '../blocks/EditorComponent';

const Document: React.FC = () => {
  return (
    <div className='container'>
      <DndProvider backend={HTML5Backend}>
        <EditorComponent></EditorComponent>
        <DropLayer />
      </DndProvider>
    </div>
  );
};

export default Document;
