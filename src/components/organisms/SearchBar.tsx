import React, { useContext, useEffect, useRef, useState } from 'react';
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
import { checkIfVisible } from '../../helpers/frontend/checkIfVisible';

const SearchBar: React.FC = () => {
  const graphViewContext = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;
  const viewContext = useContext(ViewContext) as ViewContextInterface;
  const { documentVar } = viewContext;
  const getButtonItems = (result: any) => {
    return [
      {
        //this button should navigate to the views of the clicked node
        src: 'navigation',
        onClick: () => {
          router.push(`/${viewContext.username}/${result.id}`, undefined);
          viewContext.setShowSearchBar(false);
        },
      },
      {
        //this button should add the selected node to the graph
        src: 'plus',
        onClick: () => {
          addNodeToGraph(result, graphViewContext, viewContext.username);
          viewContext.setShowSearchBar(false);
        },
      },
      {
        //this button should put the selected node in focus
        src: 'spotlight',
        onClick: () => {
          graphViewContext.setnodeInFocusId(result.id);
          viewContext.setShowSearchBar(false);
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
  const plusKeyPressed = useRef<boolean>(false);
  const pKeyPressed = useRef<boolean>(false);

  const checkAndScroll = () => {
    const result = checkIfVisible(
      documentVar.getElementById('result' + highlighted),
      documentVar.getElementById('search_container')
    );
    if (result == 'bottom') {
      const scrollOffset = documentVar
        .getElementById('result' + highlighted)
        ?.getBoundingClientRect().height;
      documentVar
        .getElementById('result_container')
        ?.scrollBy(0, scrollOffset ? 3 * scrollOffset : 0);
    } else if (result == 'top') {
      const scrollOffset = documentVar
        .getElementById('result' + highlighted)
        ?.getBoundingClientRect().height;
      documentVar
        .getElementById('result_container')
        ?.scrollBy(0, scrollOffset ? -(3 * scrollOffset) : 0);
    }
  };

  // key events: handling search bar keys
  const handleKeys = (event: any) => {
    if (event.key == '=') {
      event.preventDefault();
      plusKeyPressed.current = true;
    }
    if (event.code == 'KeyP') {
      event.preventDefault();
      pKeyPressed.current = true;
    }
    if (
      (event.metaKey || event.ctrlKey) &&
      plusKeyPressed.current &&
      pKeyPressed.current
    ) {
      event.stopPropagation();
      event.preventDefault();
      viewContext.setShowSearchBar(false);
    }
    if (event.keyCode == 40) {
      event.preventDefault();
      if (highlighted < results.length - 1) {
        setHighlighted(highlighted + 1);
        checkAndScroll();
      } else {
        document.getElementById('result_container')?.scrollTo(0, 0);
        setHighlighted(0);
      }
    } else if (event.keyCode == 38) {
      event.preventDefault();
      if (highlighted > 0) {
        setHighlighted(highlighted - 1);
        checkAndScroll();
      } else {
        const elem = documentVar.getElementById('result_container');
        elem?.scrollTo(0, elem.getBoundingClientRect().height);
        setHighlighted(results.length - 1);
      }
    } else if (event.code == 'Enter') {
      router.push(
        `/${viewContext.username}/${results[highlighted].n.id}`,
        undefined
      );
      viewContext.setShowSearchBar(false);
    } else if (event.keyCode == 27) {
      viewContext.setShowSearchBar(false);
    }
  };

  return (
    <div
      className=' fixed top-[10%] left-[50%] translate-x-[-50%] w-[40%] min-h-[30%] bg-base_white flex flex-col gap-y-2 p-2 rounded-sm shadow-sm z-[100]'
      onKeyDown={handleKeys}
      onKeyUp={() => {
        plusKeyPressed.current = false;
        pKeyPressed.current = false;
      }}
      id='search_container'
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
              if (newVal.target.value.length > 0)
                // jesse
                await fetch(
                  `/api/general/search?username=${viewContext.username}&search=${newVal.target.value}`
                ).then((res) => {
                  res.json().then((json) => {
                    setResults(json);
                  });
                });
            }}
          />
        </form>
        <IconCircleButton
          circle={false}
          src={'close'}
          onClick={() => viewContext.setShowSearchBar(false)}
        />
      </div>

      <div id='result_container' className='overflow-scroll max-h-[70vh]'>
        {results.map((result, i) => {
          return (
            <div
              key={i}
              id={'result' + i}
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
