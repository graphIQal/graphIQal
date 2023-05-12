import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import SplitPane, {
// 	Divider,
// 	SplitPaneBottom,
// 	SplitPaneLeft,
// 	SplitPaneRight,
// 	SplitPaneTop,
// } from '../../src/components/organisms/split-pane/SplitPane';
// import Document from '../../src/pages/document/Document';

import { useRouter } from 'next/router';
import ShelfEditor from '../shelf-editor/ShelfEditor';
import SplitPane, {
  Divider,
  SplitPaneBottom,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneTop,
} from '../../components/organisms/split-pane/SplitPane';
import EditorComponent from '../editor/EditorComponent';
import { getDocument } from '../../backend/functions/getDocument';
import TextButton from '../../components/molecules/TextButton';
import useSWR from 'swr';
import { fetcher } from '../../backend/driver/fetcher';
import DocumentSideTabs, {
  SideTabPropsDoc,
} from '../../components/organisms/Tabs/DocumentSideTabs';

const SplitPaneWrapper: React.FC<{ viewId: string }> = ({ viewId }) => {
  const router = useRouter();
  const { username, nodeId } = router.query;
  const [nodeData, setnodeData] = useState();

  return (
    <DndProvider backend={HTML5Backend}>
      <SplitPane className='split-pane-row'>
        <SplitPaneLeft>
          <EditorComponent textIn={'Showing content of ' + nodeId} />
        </SplitPaneLeft>
        <Divider className='separator-col' />
        <SplitPaneRight>
          <DocumentSideTabs />
        </SplitPaneRight>
      </SplitPane>
    </DndProvider>
  );
};
export default SplitPaneWrapper;
