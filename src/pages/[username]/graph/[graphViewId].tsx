/**
 * Main Graph component
 * Creates and sets all the global props that go into Context wrappers
 */

import React, { useEffect, useState } from 'react';
import Graph from '../../../packages/graph/components/Graph';
import SplitPane, {
  Divider,
  SplitPaneLeft,
  SplitPaneRight,
} from '../../../components/organisms/split-pane/SplitPane';
import EditorComponent from '../../../packages/editor/EditorComponent';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GraphSideTabs, {
  SideTabProps,
} from '../../../components/organisms/Tabs/GraphSideTabs';

const Graph2: React.FC<{ viewId: string; title: string }> = ({
  title,
  viewId,
}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <SplitPane className='split-pane-row'>
        <SplitPaneLeft>
          <Graph viewId={viewId} />
        </SplitPaneLeft>
        <Divider className='separator-col' />
        <SplitPaneRight>
          <GraphSideTabs />
        </SplitPaneRight>
      </SplitPane>
    </DndProvider>
  );
};

export default Graph2;
