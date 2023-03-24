import { CSSProperties, FC, MutableRefObject, useRef } from 'react';
import type { XYCoord } from 'react-dnd';
import { useDragLayer } from 'react-dnd';
import CollapsedGraphNode from '../../../components/organisms/CollapsedGraphNode';
import { GraphNode } from '../components/GraphNode';
import { snapToGrid } from './snapping';

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  let { x, y } = currentOffset;

  x -= initialOffset.x;
  y -= initialOffset.y;
  [x, y] = snapToGrid(x, y);
  x += initialOffset.x;
  y += initialOffset.y;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export interface CustomDragLayerProps {
  parentRef: MutableRefObject<any>;
}

export const BoxDragLayer: FC<CustomDragLayerProps> = ({ parentRef }) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));
  function renderItem() {
    switch (itemType) {
      case 'node':
      // return (
      //   <GraphNode
      //     id={item.id}
      //     left={0}
      //     top={0}
      //     size={[item.width, item.height]}
      //     updateStartPos={() => {
      //       return null;
      //     }}
      //   >
      //     hello
      //   </GraphNode>
      // );
      default:
        return null;
    }
  }
  const infiniteBoard = () => {
    if (!currentOffset || !initialOffset) {
      return;
    }
    const { x, y, width, height } = parentRef.current.getBoundingClientRect();
    if (currentOffset.x + item.width > x + width - 10) {
      //   window.innerWidth += currentOffset.x - initialOffset.x;
      console.log('triggering 1 ' + parentRef.current.style.width);
      //   parentRef.current.style.width += currentOffset.x - initialOffset.x;
      //   parentRef.current.scrollLeft = parentRef.current.scrollWidth;
    } else if (currentOffset.x < x + 10) {
      console.log('triggering 2');
      parentRef.current.scrollLeft = 0;
    } else if (currentOffset.y + item.height > y + height - 10) {
      console.log('triggering 3');
      parentRef.current.scrollBy(0, currentOffset.y - initialOffset.y);
    } else if (currentOffset.y < y + 10) {
      console.log('triggering 4');
      parentRef.current.scrollBy(0, currentOffset.y - initialOffset.y);
    }
  };
  if (isDragging) {
    // console.log('offset ' + JSON.stringify(item));
    // console.log('offset initial ' + JSON.stringify(initialOffset));
    // console.log('offset current ' + JSON.stringify(currentOffset));
    infiniteBoard();
  }
  if (!isDragging) {
    return null;
  }
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
};
