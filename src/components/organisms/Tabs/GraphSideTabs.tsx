import React, { useContext, useEffect, useState } from 'react';
import EditorComponent from '../../../packages/editor/EditorComponent';
import Graph from '../../../packages/graph/components/GraphPage';
import { Tab } from '../../atoms/Tab';
import { Tabs } from './Tabs';
import ViewContext, { ViewContextInterface } from '../../context/ViewContext';
import SearchBar from '../SearchBar';
import router from 'next/router';

export type SideTabProps = {
  label: string;
  viewType: 'connections' | 'content' | 'shelf';
  component: any;
};

const GraphSideTabs: React.FC<{ nodeInFocus_Connections: any }> = ({
  nodeInFocus_Connections,
}) => {
  const viewContext = useContext(ViewContext) as ViewContextInterface;
  const { username } = viewContext;
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
    newTabs[0].component = renderConnections(nodeInFocus_Connections);
    setTabs(newTabs);
  }, [nodeInFocus_Connections]);

  const [tabs, setTabs] = useState<SideTabProps[]>([
    {
      label: 'Connections',
      viewType: 'connections',
      // component: <EditorComponent textIn={renderConnections()} />,
      component: <div>{renderConnections(nodeInFocus_Connections)}</div>,
    },
    {
      label: 'Content',
      viewType: 'content',
      component: <EditorComponent textIn={'content'} />,
    },
    {
      label: 'Shelf',
      viewType: 'shelf',
      component: <div />,
    },
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
