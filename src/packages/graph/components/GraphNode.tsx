/**
 * Container for node on graph.
 */

import { FC, ReactNode, useContext, useEffect, useState } from 'react';
import CollapsedGraphNode from '../../../components/organisms/CollapsedGraphNode';
import { DragHandle } from '../../../packages/dnd-editor/components/Draggable';
import ResizableBox from '../../../packages/resizable/resizableBox';
import DrawingContext, {
  DrawingContextInterface,
} from '../context/GraphDrawingContext';
import GraphActionContext, {
  GraphActionContextInterface,
} from '../context/GraphActionContext';
import { OFFSET } from '../hooks/drawing/useDrawingEnd';
import { Dropdown } from '../../../components/organisms/Dropdown';
import IconButton from '../../../components/atoms/IconButton';
import { updateNode } from '../../../helpers/backend/updateNode';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../context/GraphViewContext';
import IconCircleButton from '../../../components/molecules/IconCircleButton';
import { iconList } from '../../../theme/iconList';
import { colors } from '../../../theme/colors';
import ViewContext, {
  ViewContextInterface,
} from '../../../components/context/ViewContext';
import { useDragNode } from '../hooks/dragging/useDragNode';
import { getTypedConnections } from '../../../helpers/frontend/getTypedConnections';

export interface NodeProps {
  id: any;
  left: number;
  top: number;
  size: number[];
  children: ReactNode;
  title: string;
  icon: string;
  color: string;
  updateStartPos: (val: { left: number; top: number }) => void;
}
export const GraphNode: FC<NodeProps> = ({
  id,
  left,
  top,
  size,
  title,
  children,
  icon,
  color,
  updateStartPos,
}) => {
  const {
    canDrag,
    setCanDrag,
    hideSourceOnDrag,

    // addAction,
  } = useContext(GraphActionContext) as GraphActionContextInterface;

  const { drawingMode, setDrawingMode } = useContext(
    DrawingContext
  ) as DrawingContextInterface;

  const { windowVar, documentVar } = useContext(
    ViewContext
  ) as ViewContextInterface;

  const viewContext = useContext(GraphViewContext) as GraphViewContextInterface;
  const { nodeInFocus } = viewContext;
  const [showDropdown, setShowDropdown] = useState(false);
  const collapsed = viewContext.nodeVisualData_Graph[id].collapsed;
  //disables dragging if we're drawing
  useEffect(() => {
    if (drawingMode) {
      setCanDrag(false);
    } else {
      setCanDrag(true);
    }
  }, [drawingMode]);

  //DND dragging hook
  const [{ isDragging }, drag, preview] = useDragNode(
    id,
    left,
    top,
    size[0],
    size[1],
    canDrag
  );

  if (isDragging && hideSourceOnDrag) {
    return (
      <div
        style={{
          left,
          top,
        }}
        className='absolute'
      />
    );
  }
  const backgroundClass =
    nodeInFocus == id ? 'bg-opacity-30 bg-' + color : 'bg-base_white';
  return (
    <div>
      <div
        className=' h-[30px] w-[30px] absolute z-10'
        style={{ left: left - OFFSET / 2, top: top - OFFSET / 2 }}
        onMouseDown={() => {
          updateStartPos({ left, top });
          setDrawingMode(false);
        }}
        ref={drag}
      >
        <DragHandle />
      </div>
      {/* This div and the resizable box must remain siblings for the line drawing */}
      <div
        className='absolute flex flex-row justify-center align-middle items-center hover:bg-selected_white pointer-pencil rounded-md'
        style={{
          left: left - OFFSET / 2,
          top: top - OFFSET / 2,
          width: size[0] + OFFSET,
          height: size[1] + OFFSET,
        }}
        ref={preview}
        id={id}
      ></div>
      <ResizableBox
        classes={
          'p-sm overflow-hidden h-full w-full h-12 rounded-sm border-grey border-[1px] flex flex-row items-center align-middle z-10 p-3 gap-x-3 border-l-[3px] ' +
          backgroundClass
        }
        style={{
          width: size[0],
          height: size[1],
          borderLeftColor: color,
          left,
          top,
        }}
        id={id}
      >
        {/* {size[0] > 205 || size[1] > 80 ? (
          <div className='bg-base_white h-full'>
            <EditorComponent />
            <Cube className='absolute right-sm top-sm' size={'1.5em'} />
          </div>
        ) : ( */}
        {collapsed ? (
          <CollapsedGraphNode
            toggleDropdown={() => setShowDropdown(!showDropdown)}
            title={title}
            id={id}
            icon={icon}
            color={color}
          />
        ) : (
          <div>
            {getTypedConnections(viewContext, id, 'HAS')?.map((nodeID, i) => {
              let { icon, color } = viewContext.nodeData_Graph[nodeID];
              let childTitle = viewContext.nodeData_Graph[nodeID].title;

              return (
                <div key={i} className=' bg-opacity-50'>
                  <h3
                    className={
                      'absolute top-0 left-0 text-white p-1 bg-' + color
                    }
                  >
                    {title}
                  </h3>
                  <div className='mt-8'>
                    <CollapsedGraphNode
                      id={nodeID}
                      title={childTitle}
                      icon={icon}
                      color={color}
                      toggleDropdown={() => setShowDropdown(!showDropdown)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ResizableBox>
      {showDropdown && (
        <div
          className='w-full absolute'
          style={{ left: left, top: top + (2 * size[1]) / 3 }}
        >
          <Dropdown
            activeIndex={0}
            list={false}
            windowVar={windowVar}
            setShowDropdown={setShowDropdown}
            showDropdown={showDropdown}
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
                        updateNode('color', color, id, viewContext)
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
                          updateNode('icon', icon, id, viewContext)
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
