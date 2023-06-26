import React, { useContext, useEffect, useState } from 'react';
import EditorComponent from '../../../packages/editor/EditorComponent';
import ShelfEditor from '../../../packages/shelf-editor/ShelfEditor';
import Tab from '../../atoms/Tab';
import { Tabs } from './Tabs';
import ConnectionListItem from '../ConnectionListItem';
import { connectedNode_type } from '../../../backend/functions/node/query/useGetNodeData';
import { useViewData } from '../../context/ViewContext';
import { SelectableList } from '../../templates/SelectableList';
import { useRouter } from 'next/router';
import { Divider } from '../split-pane/SplitPane';
import LoadingContext, {
  LoadingContextInterface,
} from '../../context/LoadingContext';
import { LoadingSpinner } from '../../layouts/LoadingSpinner';
import { SidePanel } from '../../templates/SidePanel';

export type SideTabPropsDoc = {
  label: string;
  viewType: 'connections' | 'shelf' | 'content';
  component: any;
};

type DocumentSideTabsInput = {
  editorComponent: JSX.Element;
};

const DocumentSideTabs: React.FC<DocumentSideTabsInput> = ({
  editorComponent,
}) => {
  const { username, currNode_data, nodeId } = useViewData();
  const router = useRouter();

  const getButtonItems = (result: any) => {
    return [
      {
        //this button should navigate to the views of the clicked node
        src: 'navigation',
        onClick: () => {
          router.push(`/${username}/${result.id}`, undefined);
        },
      },
      {
        //this button should put the selected node in focus
        src: 'spotlight',
        onClick: () => {
          //   changeNodeInFocusId(result.id);
        },
      },
    ];
  };

  const renderConnections = (connectedNodes: connectedNode_type[]) => {
    const items: any[] = [];
    connectedNodes.map((connection: any, i: number) => {
      items.push(
        <ConnectionListItem
          title={connection.connected_node.title}
          id={connection.connected_node.id}
          index={i}
          buttonItems={getButtonItems(connection.connected_node)}
          url={connection.connected_node.url}
        />
      );
    });
    return items;
  };
  const { loading } = useContext(LoadingContext) as LoadingContextInterface;

  useEffect(() => {
    if (!currNode_data) return;
    let newTabs = [...tabs];
    newTabs[0].component = (
      <SidePanel title={'All Connections for ' + currNode_data.n.title}>
        {renderConnections(currNode_data.connectedNodes)}
        {/* <Divider className='separator-row' /> */}
        {/* <div className='py-4 px-2 '>
					<div className='ml-[14px]'>
						<h2 className='font-bold ml-1 text-md'>Shelf</h2>
					</div> */}
        {/* <ShelfEditor /> */}
        {/* {editorComponent} */}
        {/* </div> */}
      </SidePanel>
    );

    const mainNodeConnections = {};

    currNode_data.connectedNodes.map((connection: any) => {
      (mainNodeConnections as any)[connection.connected_node.id] = connection;
    });

    setTabs(newTabs);
  }, [currNode_data]);

  const [tabs, setTabs] = useState<SideTabPropsDoc[]>([
    {
      label: 'Connections',
      viewType: 'connections',
      component: <div>{editorComponent}</div>,
    },
    // {
    // 	label: 'Content',
    // 	viewType: 'content',
    // 	component: <EditorComponent value={[]} />,
    // },
  ]);

  const [currTab, setCurrTab] = useState(0);

  return (
    <>
      <Tabs>
        {tabs.map((tab, index) => {
          return (
            <div key={index}>
              <Tab
                label={tab.label}
                selected={index == currTab}
                index={index}
                currTab={currTab}
                setCurrTab={setCurrTab}
                tabs={tabs}
                setTabs={setTabs}
              />
            </div>
          );
        })}
      </Tabs>
      {tabs.map((tab, i) => {
        return (
          <div
            key={i}
            style={{
              display: currTab == i ? 'block' : 'none',
            }}
          >
            {tab.component}
          </div>
        );
      })}
    </>
  );
};
export default DocumentSideTabs;
