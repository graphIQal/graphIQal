/**
 * Display of nodes and lines connecting them in "mind map" style
 */
import React, { useContext, useEffect } from 'react';
import LineTo from '../../../packages/lineto/LineTo';

import { ItemProps } from '../../../components/organisms/Dropdown';
import {
  changeConnectionType,
  deleteConnection,
} from '../../../helpers/backend/mutateHelpers';
import { ConnectionTypes } from '../../../schemas/Data_structures/DS_schema';
import DrawingContext, {
  DrawingContextInterface,
} from '../context/GraphDrawingContext';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../context/GraphViewContext';
import {
  handleEndPoint,
  useDrawingCanvas,
  useDrawingStart,
} from '../hooks/drawingHooks';
import GraphEditor from './GraphEditor';
import { GraphNode } from './GraphNode';

type MindMapProps = {
  points: any;
  setPoints: (val: any) => void;
  startPos: any;
  translateX: number;
  translateY: number;
  scale: number;
};
export const GraphMindMapView: React.FC<MindMapProps> = ({
  points,
  setPoints,
  startPos,
  translateX,
  translateY,
  scale,
}) => {
  const handleDrawing = useDrawingCanvas();
  const handleStartPoint = useDrawingStart();

  const viewContext = useContext(GraphViewContext) as GraphViewContextInterface;

  const { lines, nodesDisplayed, setLines, nodesVisual, setNodesVisual } =
    viewContext;

  useEffect(() => {
    setLines([...lines]);
  }, [translateX]);

  const getDropdownItems = (from: string, to: string) => {
    const items: ItemProps[] = [];
    Object.keys(ConnectionTypes).map((connection: string, i: number) => {
      items.push({
        text: (ConnectionTypes as any)[connection],
        onPress: () => changeConnectionType(from, to, connection, viewContext),
      });
    });
    items.push({
      text: 'Delete Connection',
      onPress: () => deleteConnection(from, to, viewContext),
      icon: 'remove',
    });

    return items;
  };

  const { startNode, endNode, drawingMode, isDrawing, setIsDrawing } =
    useContext(DrawingContext) as DrawingContextInterface;

  return (
    <div className='relative' id='container'>
      {lines.map(function (line, i) {
        return (
          <div>
            <LineTo
              key={i}
              from={line.start}
              to={line.end}
              id={i}
              arrow={line.arrowStart}
              translateX={translateX ? translateX : 0}
              translateY={translateY ? translateX : 0}
              getDropDownItems={getDropdownItems}
              deleteConnection={(from: string, to: string) =>
                deleteConnection(from, to, viewContext)
              }
            />
          </div>
        );
      })}
      {Object.keys(nodesDisplayed).map((node) => {
        const title = nodesDisplayed[node].title;
        const x = nodesVisual[node].x.low;
        const y = nodesVisual[node].y.low;
        const width = nodesVisual[node].width.low;
        const height = nodesVisual[node].height.low;
        return (
          <div
            className={node}
            key={node}
            onMouseDown={
              drawingMode
                ? (event: any) => handleStartPoint(node)
                : () => {
                    return null;
                  }
            }
            onMouseMove={
              isDrawing && drawingMode
                ? (event: any) => {
                    handleDrawing(event, points, setPoints);
                  }
                : () => {
                    return null;
                  }
            }
            onMouseUp={
              isDrawing && drawingMode
                ? (event: any) =>
                    handleEndPoint(
                      event,
                      node,
                      endNode,
                      setIsDrawing,
                      setPoints
                    )
                : () => {
                    return null;
                  }
            }
          >
            <GraphNode
              title={title}
              key={node}
              left={(x - translateX) * scale}
              top={(y - translateY) * scale}
              id={node}
              size={[width * scale, height * scale]}
              updateStartPos={(val) => (startPos.current = val)}
            >
              <GraphEditor />
            </GraphNode>
          </div>
        );
      })}
    </div>
  );
};
