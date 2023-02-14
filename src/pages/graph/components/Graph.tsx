import React, { LegacyRef, MutableRefObject, RefObject, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BoxDragLayer } from '../helpers/BoxDragLayer';
import { GraphContainer } from './GraphContainer';

const Graph: React.FC = () => {
  const containerRef = useRef(null);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='w-screen h-screen overflow-scroll' ref={containerRef}>
        <GraphContainer hideSourceOnDrag={true} />
        <BoxDragLayer parentRef={containerRef} />
      </div>
    </DndProvider>
  );
};
export default Graph;
