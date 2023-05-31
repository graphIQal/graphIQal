//Node with just its title

import { useContext, useEffect, useRef, useState } from 'react';
import { updateNode } from '../../helpers/backend/updateNode';
import { addExistingNodeToGraph } from '../../helpers/frontend/addExistingNodeToGraph';
import GraphNodeContext, {
  GraphNodeContextInterface,
} from '../../packages/graph/context/GraphNodeContext';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../../packages/graph/context/GraphViewContext';
import ViewContext, { ViewContextInterface } from '../context/ViewContext';
import IconCircleButton from '../molecules/IconCircleButton';
import { ItemProps } from './Dropdown';
import useSWR from 'swr';
import { fetcher, fetcherAll } from '../../backend/driver/fetcher';

const CollapsedGraphNode: React.FC<{
  toggleDropdown: () => void;
  showSearchDropdown: boolean;
  setShowSearchDropdown: (val: boolean) => void;
  setResults: (val: ItemProps[]) => void;
}> = ({
  toggleDropdown,
  showSearchDropdown,
  setShowSearchDropdown,
  setResults,
}) => {
  const { title, id, icon } = useContext(
    GraphNodeContext
  ) as GraphNodeContextInterface;

  const graphViewContext = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;

  const viewContext = useContext(ViewContext) as ViewContextInterface;

  const [searchVal, setSearchVal] = useState<string>('');

  const { data: searchResult } = useSWR(
    [
      searchVal.length > 0
        ? `/api/general/search?username=${viewContext.username}&search=${searchVal}`
        : null,
    ],
    fetcherAll
  );

  const formRef = useRef<any>(null);
  useEffect(() => {
    if (searchResult && searchResult[0]) {
      const items: ItemProps[] = searchResult[0].map(
        (result: any, i: number) => {
          return {
            text: result.n.title,
            onPress: () => {
              formRef.current.value = result.n.title;
              addExistingNodeToGraph(
                graphViewContext,
                viewContext.username,
                id,
                result.n
              );
            },
          };
        }
      );
      setResults(items);
    } else {
      setResults([]);
    }
  }, [searchResult && searchResult[0]]);

  return (
    <>
      <div
        className={
          'w-full h-full flex items-center content-center justify-items-stretch flex-row '
        }
      >
        <div className='flex flex-row gap-x-3 items-center'>
          <IconCircleButton
            src={icon ? icon : 'block'}
            onClick={toggleDropdown}
            circle={false}
          />
          <form>
            <input
              type='text'
              name='name'
              id='node_title'
              placeholder='Type title or press /'
              // defaultValue={title}
              value={title}
              ref={formRef}
              autoComplete='off'
              onChange={async (newVal: any) => {
                updateNode('title', newVal.target.value, id, graphViewContext);
                if (newVal.target.value[0] == '/' && !showSearchDropdown) {
                  setShowSearchDropdown(true);
                }
                if (showSearchDropdown) {
                  if (newVal.target.value.length > 0) {
                    setSearchVal(newVal.target.value.substring(1));
                  }
                }
              }}
              className='bg-transparent border-none outline-none'
            />
          </form>
        </div>
      </div>
    </>
  );
};
export default CollapsedGraphNode;
