//Node with just its title

import { Cube } from '@styled-icons/boxicons-solid/Cube';
import { useContext, useEffect, useState } from 'react';
import { OnHoverMenu } from './OnHoverMenu';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../../packages/graph/context/GraphViewContext';
import { deleteNode } from '../../helpers/backend/deleteNode';
import IconCircleButton from '../molecules/IconCircleButton';
import { updateNode } from '../../helpers/backend/updateNode';
import { setCollapsedNode } from '../../packages/graph/helpers/setCollapsedNode';
import router from 'next/router';
import ViewContext, { ViewContextInterface } from '../context/ViewContext';
import { Dropdown, ItemProps } from './Dropdown';
import { addNodeToGraph } from '../../helpers/frontend/addNodeToGraph';
import { addExistingNodeToGraph } from '../../helpers/frontend/addExistingNodeToGraph';
import { searchForNode } from '../../backend/functions/general/searchForNode';

const CollapsedGraphNode: React.FC<{
  title: string;
  id: string;
  icon: string;
  color: string;
  toggleDropdown: () => void;
  showSearchDropdown: boolean;
  setShowSearchDropdown: (val: boolean) => void;
  results: ItemProps[];
  setResults: (val: ItemProps[]) => void;
}> = ({
  title,
  id,
  icon,
  color,
  toggleDropdown,
  showSearchDropdown,
  setShowSearchDropdown,
  results,
  setResults,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const graphViewContext = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;
  const viewContext = useContext(ViewContext) as ViewContextInterface;

  // const { setNodeInView } = viewContext;
  const buttonItems = [
    {
      src: 'navigation',
      onClick: () => router.push(`/${viewContext.username}/${id}`, undefined),
    },
    {
      src: 'expand',
      onClick: () => setCollapsedNode(id, graphViewContext),
    },
    {
      src: 'remove',
      onClick: () => deleteNode(id, graphViewContext),
    },
    {
      src: 'spotlight',
      onClick: () =>
        graphViewContext.setnodeInFocusId(
          graphViewContext.nodeInFocusId == id ? viewContext.nodeId : id
        ),
    },
  ];

  return (
    <>
      <div
        onMouseOver={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
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
              defaultValue={title}
              onChange={async (newVal: any) => {
                if (newVal.target.value[0] == '/' && !showSearchDropdown) {
                  setShowSearchDropdown(true);
                }
                if (showSearchDropdown) {
                  if (newVal.target.value.length > 0) {
                    await fetch(
                      `/api/general/search?username=${
                        viewContext.username
                      }&search=${newVal.target.value.substring(1)}`
                    ).then((res) => {
                      res.json().then((json) => {
                        console.log('result ' + JSON.stringify(json));
                        const items: ItemProps[] = json.map(
                          (result: any, i: number) => {
                            return {
                              text: result.n.title,
                              onPress: () => {
                                newVal.target.value = result.n.title;
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
                      });
                    });
                    // items: ItemProps[] = await searchForNode(
                    //   viewContext.username,
                    //   newVal.target.value.substring[1]
                    // ).then((r: any) => {
                    //   return r.map((result: any) => {
                    //     return {
                    //       text: result.n.title,
                    //       onPress: () => {
                    //         newVal.target.value = result.n.title;
                    //         addExistingNodeToGraph(
                    //           graphViewContext,
                    //           viewContext.username,
                    //           id,
                    //           result.n
                    //         );
                    //       },
                    //     };
                    //   });
                    // });
                  }
                } else {
                  updateNode(
                    'title',
                    newVal.target.value,
                    id,
                    graphViewContext
                  );
                }
              }}
              className='bg-transparent border-none outline-none'
            />
          </form>
          {/* <h4 className='text-sm'>{title}</h4> */}
        </div>
        {showMenu && <OnHoverMenu buttonItems={buttonItems} />}
      </div>
    </>
  );
};
export default CollapsedGraphNode;
