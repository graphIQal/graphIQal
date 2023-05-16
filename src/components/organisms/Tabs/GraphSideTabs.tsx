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
  const { nodeInFocus } = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;
  const renderConnections = (nodeInFocus_Connections: any) => {
    return (
      <div>
        {nodeInFocus_Connections.map((connection: any, i: number) => (
          <div
            onClick={() => {
              router.push(`/${username}/${connection.c.id}`, undefined);
            }}
            key={i}
          >
            {' '}
            {'Connection ' + (i + 1) + ' : ' + connection.c.title}
          </div>
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
