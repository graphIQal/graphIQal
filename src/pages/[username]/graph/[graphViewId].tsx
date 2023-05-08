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
import { TabProps } from '../../../components/context/TabContext';
import GraphSideTabs, {
  SideTabProps,
} from '../../../components/organisms/Tabs/GraphSideTabs';

const Graph2: React.FC<{ viewId: string; title: string }> = ({
  title,
  viewId,
}) => {
  const [windowVar, setWindow] = useState<any>();
  const [documentVar, setDocument] = useState<any>();
  useEffect(() => {
    setWindow(window);
    setDocument(document);
  });

  const [sideTabs, setSideTabs] = useState<SideTabProps[]>([
    {
      label: 'Connections',
      viewType: 'connections',
    },
    {
      label: 'Content',
      viewType: 'content',
    },
    {
      label: 'Shelf',
      viewType: 'shelf',
    },
  ]);

  const [currTab, setCurrTab] = useState(0);
  useEffect(() => {
    console.log('type ' + sideTabs[currTab].viewType);
  }, [sideTabs[currTab].viewType]);

  return (
    <DndProvider backend={HTML5Backend}>
      <SplitPane className='split-pane-row'>
        <SplitPaneLeft>
          <Graph window={windowVar} document={documentVar} viewId={viewId} />
        </SplitPaneLeft>
        <Divider className='separator-col' />
        <SplitPaneRight>
          <GraphSideTabs
            tabs={sideTabs}
            setTabs={setSideTabs}
            currTab={currTab}
            setCurrTab={setCurrTab}
          />
          {sideTabs[currTab].viewType == 'connections' && (
            <EditorComponent textIn={'connections'} />
          )}
          {sideTabs[currTab].viewType == 'content' && (
            <EditorComponent textIn={'content'} />
          )}
          {sideTabs[currTab].viewType == 'shelf' && (
            <Graph window={window} document={document} viewId={''} />
          )}
        </SplitPaneRight>
      </SplitPane>
    </DndProvider>
  );
};

export default Graph2;
