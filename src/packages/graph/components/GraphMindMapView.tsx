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
import {
  getConnectionInfo,
  getConnectionType,
  isLineDirectional,
} from '../../../helpers/backend/getHelpers';
import GraphActionContext, {
  GraphActionContextInterface,
} from '../context/GraphActionContext';

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

  const { nodeData_Graph, nodeVisualData_Graph, setnodeVisualData_Graph } =
    viewContext;

  const getDropdownItems = (from: string, to: string) => {
    let activeIndex = 0;
    const items: ItemProps[] = [];
    Object.keys(ConnectionTypes).map((connection: string, i: number) => {
      items.push({
        text: (ConnectionTypes as any)[connection],
        onPress: () => changeConnectionType(from, to, connection, viewContext),
      });
      if (getConnectionType(from, to, viewContext) == connection) {
        activeIndex = i;
      }
    });
    items.push({
      text: 'Delete Connection',
      onPress: () => deleteConnection(from, to, viewContext),
      icon: 'remove',
    });

    return { items, activeIndex };
  };

  const { startNode, endNode, drawingMode, isDrawing, setIsDrawing } =
    useContext(DrawingContext) as DrawingContextInterface;

  return (
    <div className='relative' id='container'>
      {Object.keys(nodeData_Graph).map(function (node, i) {
        return Object.keys(nodeData_Graph[node].connections).map((line, i) => {
          return (
            <div>
              <LineTo
                key={i}
                from={node}
                to={line}
                id={node + '_' + line}
                arrow={isLineDirectional(
                  nodeData_Graph[node].connections[line]
                )}
                getDropDownItems={getDropdownItems}
                deleteConnection={(from: string, to: string) =>
                  deleteConnection(from, to, viewContext)
                }
              />
            </div>
          );
        });
      })}
      {Object.keys(nodeData_Graph).map((node) => {
        const title = nodeData_Graph[node].title;
        const x = nodeVisualData_Graph[node].x.low;
        const y = nodeVisualData_Graph[node].y.low;
        const width = nodeVisualData_Graph[node].width.low;
        const height = nodeVisualData_Graph[node].height.low;
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
