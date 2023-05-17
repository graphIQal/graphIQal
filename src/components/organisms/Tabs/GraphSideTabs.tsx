import React, { useContext, useEffect, useState } from 'react';
import EditorComponent from '../../../packages/editor/EditorComponent';
import Graph from '../../../packages/graph/components/GraphPage';
import { Tab } from '../../atoms/Tab';
import { Tabs } from './Tabs';
import ViewContext, { ViewContextInterface } from '../../context/ViewContext';
import SearchBar from '../SearchBar';
import router from 'next/router';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../../../packages/graph/context/GraphViewContext';
import { SidePanel } from '../../layouts/SidePanel';

import { addNodeToGraph } from '../../../helpers/frontend/addNodeToGraph';
import ConnectionListItem from '../ConnectionListItem';
import {
  connectedNode_type,
  getNodeData_type,
} from '../../../backend/functions/node/query/getNodeData';

export type SideTabProps = {
  label: string;
  viewType: 'connections' | 'content' | 'shelf';
  component: any;
};

const GraphSideTabs: React.FC<{ nodeInFocus_data: getNodeData_type }> = ({
  nodeInFocus_data,
}) => {
  const viewContext = useContext(ViewContext) as ViewContextInterface;
  const { username, currNode_data, nodeId } = viewContext;

  const graphViewContext = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;

  const getButtonItems = (result: any) => {
    return [
      {
        //this button should navigate to the views of the clicked node
        src: 'navigation',
        onClick: () => {
          router.push(`/${viewContext.username}/${result.id}`, undefined);
        },
      },
      {
        //this button should add the selected node to the graph
        src: 'plus',
        onClick: () => {
          addNodeToGraph(result, graphViewContext, viewContext.username);
        },
      },
      {
        //this button should put the selected node in focus
        src: 'spotlight',
        onClick: () => {
          graphViewContext.setnodeInFocusId(result.id);
        },
      },
    ];
  };

  const [highlightedConnection, setHighlightedConnection] = useState(0);
  const renderConnections = (connectedNodes: connectedNode_type[]) => {
    return (
      <div>
        {/* {nodeInFocus_Connections.map((connection: any, i: number) => (
          <div
            onClick={() => {
              router.push(`/${username}/${connection.c.id}`, undefined);
            }}
            key={i}
          >
            {' '}
            {connection.c.title}
          </div>
        ))} */}
        {connectedNodes.map((connection: any, i: number) => (
          <ConnectionListItem
            highlighted={highlightedConnection}
            setHighlighted={setHighlightedConnection}
            title={connection.connected_node.title}
            id={connection.connected_node.id}
            index={i}
            buttonItems={getButtonItems(connection.connected_node)}
            url={connection.connected_node.url}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    console.log('nodeInFocus_data');
    console.log(nodeInFocus_data);
    let newTabs = [...tabs];
    newTabs[0].component = (
      <SidePanel title={'All Connections for ' + nodeInFocus_data.n.title}>
        {renderConnections(nodeInFocus_data.connectedNodes)}
      </SidePanel>
    );

    const mainNodeConnections = {};

    console.log('currNode_data');
    console.log(currNode_data);

    currNode_data.connectedNodes.map((connection) => {
      (mainNodeConnections as any)[connection.connected_node.id] = connection;
    });

    newTabs[1].component = (
      <SidePanel
        title={
          'Focused Connections between ' +
          currNode_data.n.title +
          ' and ' +
          nodeInFocus_data.n.title
        }
      >
        {renderConnections(
          nodeInFocus_data.connectedNodes.filter(
            ({ r, connected_node }: any) =>
              connected_node.id in mainNodeConnections
          )
        )}
      </SidePanel>
    );

    setTabs(newTabs);
  }, [nodeInFocus_data, currNode_data]);

  const [tabs, setTabs] = useState<SideTabProps[]>([
    {
      label: 'All Connections',
      viewType: 'connections',
      // component: <EditorComponent textIn={renderConnections()} />,
      component: (
        <div>{renderConnections(nodeInFocus_data.connectedNodes)}</div>
      ),
    },
    {
      label: 'Focused Connections',
      viewType: 'content',
      component: <EditorComponent textIn={'content'} />,
    },
    // {
    //   label: 'Shelf',
    //   viewType: 'shelf',
    //   component: <div />,
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
              display: i == currTab ? 'block' : 'none',
            }}
          >
            {tab.component}
          </div>
        );
      })}
    </>
  );
};
export default GraphSideTabs;
