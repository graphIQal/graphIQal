/**
 * Container for node on graph.
 */

import { useRouter } from 'next/router';
import { FC, ReactNode, useContext, useEffect, useState } from 'react';

import IconCircleButton from '../../../components/molecules/IconCircleButton';
import CollapsedGraphNode from '../../../components/organisms/CollapsedGraphNode';
import { Dropdown, ItemProps } from '../../../components/organisms/Dropdown';
import { OnHoverMenu } from '../../../components/organisms/OnHoverMenu';
import { deleteNode } from '../../../helpers/backend/deleteNode';
import { updateNode } from '../../../helpers/backend/updateNode';
import { getTypedConnections } from '../../../helpers/frontend/getTypedConnections';
import { DragHandle } from '../../../packages/dnd-editor/components/Draggable';
import ResizableBox from '../../../packages/resizable/resizableBox';
import { colors } from '../../../theme/colors';
import { iconList } from '../../../theme/iconList';
import GraphActionContext, {
  GraphActionContextInterface,
} from '../context/GraphActionContext';
import DrawingContext, {
  DrawingContextInterface,
} from '../context/GraphDrawingContext';
import GraphNodeContext, {
  GraphNodeContextInterface,
} from '../context/GraphNodeContext';
import { ConnectionTypes } from '../graphTypes';
import { useDragNode } from '../hooks/dragging/useDragNode';
import { OFFSET } from '../hooks/drawing/useDrawingEnd';
import { useToggle } from '../../../helpers/hooks/useToggle';
import { useViewData } from '../../../components/context/ViewContext';
import { useGraphViewAPI, useGraphViewData } from '../context/GraphViewContext';

export interface NodeProps {
  children: ReactNode;
  updateStartPos: (val: { left: number; top: number }) => void;
}
export const GraphNode: FC<NodeProps> = ({
  children,

  updateStartPos,
}) => {
  const nodeInfo = useContext(GraphNodeContext) as GraphNodeContextInterface;
  const { canDrag, setCanDrag, hideSourceOnDrag } = useContext(
    GraphActionContext
  ) as GraphActionContextInterface;

  const { drawingMode, setDrawingMode } = useContext(
    DrawingContext
  ) as DrawingContextInterface;

  const { windowVar, documentVar, username, nodeId } = useViewData();
  if (!windowVar || !documentVar) return <div></div>;

  const { nodeInFocusId, nodeVisualData_Graph, addAction, nodeData_Graph } =
    useGraphViewData();
  const {
    changeNodeInFocusId,
    changeAlert,
    changeNodeData_Graph,
    changeVisualData_Graph,
  } = useGraphViewAPI();

  const [showEditDropdown, setshowEditDropdown] = useState(false);

  // Visual information: background and collapsed
  const backgroundClass =
    nodeInFocusId == nodeInfo.id
      ? 'bg-opacity-30 bg-' + nodeInfo.color
      : 'bg-base_white';
  const collapsed = nodeVisualData_Graph[nodeInfo.id].collapsed;

  //disables dragging if we're drawing
  useEffect(() => {
    if (drawingMode) {
      setCanDrag(false);
    } else {
      setCanDrag(true);
    }
  }, [drawingMode]);

  const { value: showSearchDropdown, toggle: setShowSearchDropdown } =
    useToggle(true);
  const [searchResults, setSearchResults] = useState<ItemProps[]>([]);

  // On hover menu
  const router = useRouter();
  const { toggle: setShowMenu } = useToggle();
  const buttonItems = [
    {
      src: 'navigation',
      onClick: () => router.push(`/${username}/${nodeInfo.id}`, undefined),
    },
    {
      src: 'expand',
      onClick: () => null,
    },

    {
      src: 'spotlight',
      onClick: () =>
        changeNodeInFocusId(
          nodeInFocusId == nodeInfo.id ? nodeId : nodeInfo.id
        ),
    },
    {
      src: 'remove',
      onClick: () =>
        deleteNode(nodeInfo.id, {
          changeAlert,
          addAction,
          changeNodeData_Graph,
          changeVisualData_Graph,
        }),
    },
  ];

  // key event: slash to trigger search
  useEffect(() => {
    const listenForSlash = (event: any) => {
      if (event.keyCode == 220) {
        setShowSearchDropdown(true);
      }
    };
    if (nodeInfo.title == '') {
      // documentVar.getElementById('node_title')?.focus();
      documentVar
        .getElementById('node_title')
        ?.addEventListener('keydown', listenForSlash);
    }

    return documentVar
      .getElementById('node_title')
      ?.removeEventListener('keydown', listenForSlash);
  });

  //DND dragging hook
  const [{ isDragging }, drag, preview] = useDragNode(
    nodeInfo.id,
    nodeInfo.left,
    nodeInfo.top,
    nodeInfo.width,
    nodeInfo.height,
    canDrag
  );

  if (isDragging && hideSourceOnDrag) {
    return (
      <div
        style={{
          left: nodeInfo.left,
          top: nodeInfo.top,
        }}
        className='absolute'
      />
    );
  }

  return (
    <div>
      <div
        className=' h-[30px] w-[30px] absolute z-10'
        style={{
          left: nodeInfo.left - OFFSET / 2,
          top: nodeInfo.top - OFFSET / 2,
        }}
        onMouseDown={() => {
          updateStartPos({ left: nodeInfo.left, top: nodeInfo.top });
          setDrawingMode(false);
        }}
        ref={drag}
      >
        <DragHandle />
      </div>
      <div
        className='z-30 flex flex-row absolute min-w-[30px] max-w-[30px] hover:w-auto hover:max-w-[400px] transition-width duration-300 overflow-hidden  '
        style={{
          minWidth: 40,
          minHeight: 40,
          left: nodeInfo.left + nodeInfo.width,
          top: nodeInfo.top,
        }}
      >
        <IconCircleButton src='angleRight' onClick={() => null} />
        <OnHoverMenu buttonItems={buttonItems} />
      </div>
      {/* This div and the resizable box must remain siblings for the line drawing */}
      <div
        onMouseOver={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
        className='absolute flex flex-row justify-center align-middle items-center hover:bg-selected_white pointer-pencil rounded-md'
        style={{
          left: nodeInfo.left - OFFSET / 2,
          top: nodeInfo.top - OFFSET / 2,
          width: nodeInfo.width + OFFSET,
          height: nodeInfo.height + OFFSET,
        }}
        ref={preview}
        id={nodeInfo.id}
      ></div>
      <ResizableBox
        classes={
          'p-sm overflow-hidden h-full w-full h-12 rounded-sm border-grey border-[1px] flex flex-row items-center align-middle z-10 p-3 gap-x-3 border-l-[3px] ' +
          backgroundClass
        }
        style={{
          width: nodeInfo.width,
          height: nodeInfo.height,
          borderLeftColor: nodeInfo.color,
          left: nodeInfo.left,
          top: nodeInfo.top,
        }}
        id={nodeInfo.id}
      >
        {/* {collapsed ? ( */}
        <CollapsedGraphNode
          toggleDropdown={() => setshowEditDropdown(!showEditDropdown)}
          setResults={setSearchResults}
          showSearchDropdown={showSearchDropdown}
          setShowSearchDropdown={setShowSearchDropdown}
        />
        {/* ) : (
          <div>
            {getTypedConnections(
              viewContext,
              nodeInfo.id,
              ConnectionTypes.HAS
            )?.map((nodeID, i) => {
              let { icon, color } = viewContext.nodeData_Graph[nodeID];
              let childTitle = viewContext.nodeData_Graph[nodeID].title;

              return (
                <div key={i} className=' bg-opacity-50'>
                  <h3
                    className={
                      'absolute top-0 left-0 text-white p-1 bg-' + color
                    }
                  >
                    {nodeInfo.title}
                  </h3>
                  <div className='mt-8'>
                    <CollapsedGraphNode
                      id={nodeID}
                      title={childTitle}
                      icon={icon}
                      color={color}
                      toggleDropdown={() =>
                        setshowEditDropdown(!showEditDropdown)
                      }
                      results={searchResults}
                      setResults={setSearchResults}
                      showSearchDropdown={showSearchDropdown}
                      setShowSearchDropdown={setShowSearchDropdown}
                      showMenu={showMenu}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )} */}
      </ResizableBox>
      {/* Search dropdown and Icon/color dropdown */}
      {showSearchDropdown && (
        <div
          className='absolute'
          style={{
            left: nodeInfo.left,
            top: nodeInfo.top + (2 * nodeInfo.height) / 3,
          }}
        >
          <Dropdown
            windowVar={windowVar}
            activeIndex={-1}
            items={searchResults}
            showDropdown={showSearchDropdown}
            setShowDropdown={setShowSearchDropdown}
          />
        </div>
      )}
      {showEditDropdown && (
        <div
          className='w-full absolute'
          style={{
            left: nodeInfo.left,
            top: nodeInfo.top + (2 * nodeInfo.height) / 3,
          }}
        >
          <Dropdown
            activeIndex={0}
            list={false}
            windowVar={windowVar}
            setShowDropdown={setshowEditDropdown}
            showDropdown={showEditDropdown}
          >
            <div>
              <div className='gap-x-0 grid grid-cols-4'>
                {colors.map((color, i) => {
                  return (
                    <div
                      className={
                        'w-[40px] h-[40px] m-1 break-inside-avoid hover:opacity-70 hover: cursor-pointer'
                      }
                      style={{ backgroundColor: color }}
                      onClick={() =>
                        updateNode('color', color, nodeInfo.id, {
                          addAction,
                          changeVisualData_Graph,
                          nodeVisualData_Graph,
                          nodeData_Graph,
                          changeNodeData_Graph,
                        })
                      }
                    ></div>
                  );
                })}
              </div>
              <div className='columns-4 gap-x-0'>
                {iconList.map((icon, i) => {
                  return (
                    <div className='p-2 hover:bg-gray-100 flex justify-center align-middle items-center'>
                      <IconCircleButton
                        src={icon}
                        circle={false}
                        size={40}
                        onClick={() =>
                          updateNode('icon', icon, nodeInfo.id, {
                            addAction,
                            changeVisualData_Graph,
                            nodeVisualData_Graph,
                            nodeData_Graph,
                            changeNodeData_Graph,
                          })
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </Dropdown>
        </div>
      )}
    </div>
  );
};
