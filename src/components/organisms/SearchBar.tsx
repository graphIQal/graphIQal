import React, { useContext, useState } from 'react';
import IconTitle from '../molecules/IconTitle';
import TextButton from '../molecules/TextButton';
import IconCircleButton from '../molecules/IconCircleButton';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../../packages/graph/context/GraphViewContext';
import { GraphNode } from '../../packages/graph/components/GraphNode';
import CollapsedGraphNode from './CollapsedGraphNode';
import { OnHoverMenu } from './OnHoverMenu';
import ViewContext, { ViewContextInterface } from '../context/ViewContext';
import router from 'next/router';
import { addNodeToGraph } from '../../helpers/frontend/addNodeToGraph';

const SearchBar: React.FC<{
  connections: {
    r: any;
    c: any;
  }[];
}> = ({ connections }) => {
  const graphViewContext = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;
  const viewContext = useContext(ViewContext) as ViewContextInterface;
  const getButtonItems = (id: string) => {
    return [
      {
        //this button should navigate to the views of the clicked node
        src: 'navigation',
        onClick: () => {
          router.push(`/${viewContext.username}/${id}`, undefined);
          graphViewContext.setShowSearchBar(false);
        },
      },
      {
        //this button should add the selected node to the graph
        src: 'plus',
        onClick: () => {
          addNodeToGraph(id, graphViewContext);
          graphViewContext.setShowSearchBar(false);
        },
      },
      {
        //this button should put the selected node in focus
        src: 'spotlight',
        onClick: () => {
          graphViewContext.setnodeInFocus(id);
          graphViewContext.setShowSearchBar(false);
        },
      },
    ];
  };

  //state to hold the results from the search
  const [results, setResults] = useState([
    {
      title: 'Node 1',
      id: 'node1',
    },
  ]);
  return (
    <div className='absolute bottom-0 left-0 min-w-[30%] min-h-[30%] bg-base_white flex flex-col gap-y-2 p-2 rounded-sm shadow-sm z-[100]'>
      <div className='flex flex-row justify-between w-full align-middle items-center'>
        <form className='bg-base_white w-full p-1'>
          <input
            type='text'
            name='name'
            id='collapsed_node'
            placeholder='Search for a node...'
            className='bg-base_white'
            onChange={(newVal: any) =>
              console.log('search ' + JSON.stringify(newVal.target.value))
            }
          />
        </form>
        <IconCircleButton
          circle={false}
          src={'close'}
          onClick={() => graphViewContext.setShowSearchBar(false)}
        />
      </div>
      {/* <div className='flex flex-row gap-x-2'>
        <TextButton
          text='Navigate to Node'
          onClick={() => console.log('navigate')}
        />
        <TextButton
          text='Open in focus'
          onClick={() => console.log('focu s')}
        />
        <TextButton text='Add to graph' onClick={() => console.log('add')} />
      </div> */}
      <div>
        {connections.map((result, i) => {
          return (
            <div
              key={i}
              className='flex flex-row gap-x-3 items-center align-middle'
            >
              <IconCircleButton
                circle={false}
                src='block'
                onClick={() => null}
              />
              <h4 className='text-sm'>{result.c.title}</h4>
              <OnHoverMenu buttonItems={getButtonItems(result.c.id)} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SearchBar;
