/**
 * Display of nodes and lines connecting them in "mind map" style
 */
import React, { useContext } from 'react';
import { LineTo } from '../lineto/LineTo';

import { ItemProps } from '../../../components/organisms/Dropdown';
import {
  getConnectionType,
  getIconAndColor,
  isLineDirectional,
} from '../helpers/backend/gettersConnectionInfo';

import { updateConnection } from '../helpers/backend/updateConnection';
import DrawingContext, {
  DrawingContextInterface,
} from '../context/GraphDrawingContext';
import GraphEditor from './GraphEditor';
import { GraphNode } from './GraphNode';
import { deleteConnection } from '../helpers/backend/deleteConnection';
import { useDrawingCanvas } from '../hooks/drawing/useDrawingCanvas';
import { handleEndPoint } from '../hooks/drawing/useDrawingEnd';
import { useDrawingStart } from '../hooks/drawing/useDrawingStart';
import GraphNodeContext from '../context/GraphNodeContext';
import { useGraphViewAPI, useGraphViewData } from '../context/GraphViewContext';
import { KeyedMutator } from 'swr';
import { ConnectionTypes } from '@/backend/schema';

type MindMapProps = {
  points: any;
  setPoints: (val: any) => void;
  startPos: any;
  translateX: number;
  translateY: number;
  scale: number;
  mutateGraphData: KeyedMutator<any>;
};
export const GraphMindMapView: React.FC<MindMapProps> = ({
  points,
  setPoints,
  startPos,
  translateX,
  translateY,
  scale,
  mutateGraphData,
}) => {
  const handleDrawing = useDrawingCanvas();
  const handleStartPoint = useDrawingStart();

  const { nodeData_Graph, nodeVisualData_Graph, addAction, graphViewId, tags } =
    useGraphViewData();

  const { changeNodeData_Graph, changeAlert } = useGraphViewAPI();

  // Types in connection dropdown to select from
  const getDropdownItems = (from: string, to: string) => {
    let activeIndex = 0;
    const items: ItemProps[] = [];
    Object.keys(ConnectionTypes).map((connection: string, i: number) => {
      items.push({
        text: (ConnectionTypes as any)[connection],
        onPress: () =>
          updateConnection(
            'type',
            '',
            {
              start: from,
              end: to,
              newType: connection,
            },
            {
              nodeData_Graph,
              changeNodeData_Graph,
              addAction,
              changeAlert,
            }
          ),
      });
      if (getConnectionType(from, to, { nodeVisualData_Graph }) == connection) {
        activeIndex = i;
      }
    });
    if (
      getConnectionType(from, to, { nodeVisualData_Graph }) !=
      ConnectionTypes.RELATED
    ) {
      items.push({
        text: 'Reverse Connection',
        onPress: () =>
          updateConnection(
            'reverse',
            '',
            {
              arrowStart: to,
              arrowEnd: from,
            },
            {
              nodeData_Graph,
              changeNodeData_Graph,
              addAction,
              changeAlert,
            }
          ),
      });
    }
    items.push({
      text: 'Delete Connection',
      onPress: () =>
        deleteConnection(from, to, {
          changeAlert,
          nodeData_Graph,
          addAction,
          changeNodeData_Graph,
        }),
      icon: 'remove',
    });

    return { items, activeIndex };
  };

  const { endNode, drawingMode, isDrawing, setIsDrawing } = useContext(
    DrawingContext
  ) as DrawingContextInterface;

  return (
    <div className='relative' id={'container' + graphViewId}>
      {Object.keys(nodeData_Graph).map(function (startNode, i) {
        return Object.keys(nodeData_Graph[startNode].connections)
          .filter(
            (endNode) => nodeData_Graph[startNode] && nodeData_Graph[endNode]
          )
          .map((line, j) => {
            return (
              <div key={j}>
                <LineTo
                  key={j}
                  from={startNode}
                  to={line}
                  connectionData={nodeData_Graph[startNode].connections[line]}
                  id={startNode + '_' + line}
                  arrow={isLineDirectional(
                    nodeData_Graph[startNode].connections[line]
                  )}
                  getDropDownItems={getDropdownItems}
                  deleteConnection={(from: string, to: string) =>
                    deleteConnection(from, to, {
                      changeAlert,
                      nodeData_Graph,
                      addAction,
                      changeNodeData_Graph,
                    })
                  }
                  mutateGraphData={mutateGraphData}
                />
              </div>
            );
          });
      })}
      {Object.keys(nodeVisualData_Graph).map((node) => {
        // const title = nodeData_Graph[node].title;
        const x = nodeVisualData_Graph[node].x;
        const y = nodeVisualData_Graph[node].y;
        const width = nodeVisualData_Graph[node].width;
        const height = nodeVisualData_Graph[node].height;

        const { icon, color } = getIconAndColor(
          { nodeVisualData_Graph, nodeData_Graph, tags },
          node
        );
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
            <GraphNodeContext.Provider
              value={{
                // title: title,
                node_data: nodeData_Graph[node],
                id: node,
                icon: icon,
                color: color,
                left: (x - translateX) * scale,
                top: (y - translateY) * scale,
                width: width * scale,
                height: height * scale,
              }}
            >
              <GraphNode updateStartPos={(val) => (startPos.current = val)}>
                <GraphEditor />
              </GraphNode>
            </GraphNodeContext.Provider>
          </div>
        );
      })}
    </div>
  );
};
