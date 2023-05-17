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

export type SideTabProps = {
  label: string;
  viewType: 'connections' | 'content' | 'shelf';
  component: any;
};

const GraphSideTabs: React.FC<{ nodeInFocus_Connections: any }> = ({
  nodeInFocus_Connections,
}) => {
  const viewContext = useContext(ViewContext) as ViewContextInterface;
  const { username, currNodeConnections, nodeId } = viewContext;
  const graphViewContext = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;

  const { nodeInFocus, setnodeInFocus } = graphViewContext;

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
          setnodeInFocus(result.id);
        },
      },
    ];
  };

  const [highlightedConnection, setHighlightedConnection] = useState(0);
  const renderConnections = (nodeInFocus_Connections: any) => {
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
        {nodeInFocus_Connections.map((connection: any, i: number) => (
          <ConnectionListItem
            highlighted={highlightedConnection}
            setHighlighted={setHighlightedConnection}
            title={connection.c.title}
            id={connection.c.id}
            index={i}
            buttonItems={getButtonItems(connection.c)}
            url={connection.c.url}
          />
        ))}
      </div>
    );

    // {nodeInFocus_Connections
    //   ? nodeInFocus_Connections.map((el) => (
    //       <TextButton
    //         key={el.c.id}
    //         text={el.c.title}
    //         onClick={() => {
    //           router.push(
    //             `/${username}/${el.c.id}`,
    //             undefined
    //           );
    //         }}
    //       />
    //     ))
    //   : null}
  };

  useEffect(() => {
    let newTabs = [...tabs];
    newTabs[0].component = (
      <SidePanel title={'All Connections for ' + nodeInFocus}>
        {renderConnections(nodeInFocus_Connections)}
      </SidePanel>
    );
    const mainNodeConnections = {};
    currNodeConnections.map((connection) => {
      (mainNodeConnections as any)[connection.c.id] = connection;
    });
    newTabs[1].component = (
      <SidePanel
        title={'Focused Connections between ' + nodeId + ' and ' + nodeInFocus}
      >
        {renderConnections(
          nodeInFocus_Connections.filter(
            (connection: any) => connection.c.id in mainNodeConnections
          )
        )}
      </SidePanel>
    );

    setTabs(newTabs);
  }, [nodeInFocus_Connections, currNodeConnections]);

  const [tabs, setTabs] = useState<SideTabProps[]>([
    {
      label: 'All Connections',
      viewType: 'connections',
      // component: <EditorComponent textIn={renderConnections()} />,
      component: <></>,
    },
    {
      label: 'Focused Connections',
      viewType: 'content',
      component: <div></div>,
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
