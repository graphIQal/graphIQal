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

const SearchBar: React.FC = () => {
  const graphViewContext = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;
  const viewContext = useContext(ViewContext) as ViewContextInterface;
  const getButtonItems = (id: string) => {
    return [
      {
        src: 'navigation',
        onClick: () => {
          router.push('/' + viewContext.username + '/' + id);
          graphViewContext.setShowSearchBar(false);
        },
      },
      {
        src: 'plus',
        onClick: () => {
          addNodeToGraph(id, graphViewContext);
          graphViewContext.setShowSearchBar(false);
        },
      },
      {
        src: 'spotlight',
        onClick: () => {
          graphViewContext.setnodeInFocus(id);
          graphViewContext.setShowSearchBar(false);
        },
      },
    ];
  };

  const [results, setResults] = useState([
    {
      title: 'Node 1',
      id: 'node1',
    },
  ]);
  return (
    <div className='absolute bottom-0 left-0 min-w-[30%] min-h-[30%] bg-base_white flex flex-col gap-y-2 p-2 rounded-sm shadow-sm z-[100]'>
      <div className='flex flex-row justify-between w-full'>
        <form>
          <input
            type='text'
            name='name'
            id='collapsed_node'
            placeholder='Search for a node...'
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
        {results.map((result, i) => {
          return (
            <div className='flex flex-row gap-x-3 items-center align-middle'>
              <IconCircleButton
                circle={false}
                src='block'
                onClick={() => null}
              />
              <h4 className='text-sm'>{result.title}</h4>
              <OnHoverMenu buttonItems={getButtonItems(result.id)} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SearchBar;
