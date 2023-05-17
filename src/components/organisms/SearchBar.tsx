import React, { useContext, useEffect, useState } from 'react';
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
import { NodeData } from '../../packages/graph/graphTypes';

const SearchBar: React.FC = () => {
  const graphViewContext = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;
  const viewContext = useContext(ViewContext) as ViewContextInterface;
  const getButtonItems = (result: any) => {
    return [
      {
        //this button should navigate to the views of the clicked node
        src: 'navigation',
        onClick: () => {
          router.push(`/${viewContext.username}/${result.id}`, undefined);
          graphViewContext.setShowSearchBar(false);
        },
      },
      {
        //this button should add the selected node to the graph
        src: 'plus',
        onClick: () => {
          addNodeToGraph(result, graphViewContext, viewContext.username);
          graphViewContext.setShowSearchBar(false);
        },
      },
      {
        //this button should put the selected node in focus
        src: 'spotlight',
        onClick: () => {
          graphViewContext.setnodeInFocusId(result.id);
          graphViewContext.setShowSearchBar(false);
        },
      },
    ];
  };

  //state to hold the results from the search
  const [results, setResults] = useState<{ n: any }[]>([]);

  useEffect(() => {
    document.getElementById('search_bar')?.focus();
  }, []);

  //navigating from keyboard
  const [highlighted, setHighlighted] = useState(0);

  //Hot keys for escape
  const [plusKeyPressed, setPlusKeyPressed] = useState(false);
  const [pKeyPressed, setPKeyPressed] = useState(false);

  const handleKeys = (event: any) => {
    if (event.key == '=') {
      event.preventDefault();
      setPlusKeyPressed(true);
    }
    if (event.code == 'KeyP') {
      event.preventDefault();
      setPKeyPressed(true);
    }
    if ((event.metaKey || event.ctrlKey) && plusKeyPressed && pKeyPressed) {
      event.stopPropagation();
      event.preventDefault();
      graphViewContext.setShowSearchBar(false);
    }
    if (event.keyCode == 40) {
      event.preventDefault();
      if (highlighted < results.length - 1) setHighlighted(highlighted + 1);
    } else if (event.keyCode == 38) {
      event.preventDefault();
      if (highlighted > 0) setHighlighted(highlighted - 1);
    } else if (event.code == 'Enter') {
      router.push(
        `/${viewContext.username}/${results[highlighted].n.id}`,
        undefined
      );
      graphViewContext.setShowSearchBar(false);
    } else if (event.keyCode == 27) {
      graphViewContext.setShowSearchBar(false);
    }
  };

  return (
    <div
      className=' fixed top-[10%] left-[50%] translate-x-[-50%] w-[40%] min-h-[30%] bg-base_white flex flex-col gap-y-2 p-2 rounded-sm shadow-sm z-[100]'
      onKeyDown={handleKeys}
      onKeyUp={() => {
        setPlusKeyPressed(false);
        setPKeyPressed(false);
      }}
    >
      <div className='flex flex-row justify-between w-full align-middle items-center'>
        <form className='bg-base_white w-full p-1'>
          <input
            autoComplete='off'
            type='text'
            name='name'
            id='search_bar'
            placeholder='Search for a node...'
            className='bg-base_white w-full outline-none border-none'
            onChange={async (newVal: any) => {
              console.log('search ' + JSON.stringify(newVal.target.value));
              if (newVal.target.value.length > 0)
                await fetch(
                  `/api/general/search?username=${viewContext.username}&search=${newVal.target.value}`
                ).then((res) => {
                  res.json().then((json) => {
                    console.log('result ' + JSON.stringify(json));
                    setResults(json);
                  });
                });
            }}
          />
        </form>
        <IconCircleButton
          circle={false}
          src={'close'}
          onClick={() => graphViewContext.setShowSearchBar(false)}
        />
      </div>

      <div className='overflow-scroll max-h-[70vh]'>
        {results.map((result, i) => {
          return (
            <div
              key={i}
              className={
                'flex flex-row gap-x-3 justify-between items-center align-middle hover:cursor-pointer p-2 border-y-[0.5px]  border-base_black border-opacity-10 ' +
                (i == highlighted ? 'bg-selected_white' : '')
              }
              onMouseOver={() => setHighlighted(i)}
            >
              <div className='flex flex-row items-center align-middle'>
                <IconCircleButton
                  circle={false}
                  src='block'
                  onClick={() => null}
                />
                <h4 className='text-sm'>{result.n.title}</h4>
              </div>
              <OnHoverMenu buttonItems={getButtonItems(result.n)} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SearchBar;
