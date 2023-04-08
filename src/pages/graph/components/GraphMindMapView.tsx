import React, { useContext } from 'react';
import LineTo from '../../../packages/lineto';
import {
  graphNodes,
  nodesData,
} from '../../../schemas/Data_structures/DS_schema';
import GraphContext, { GraphContextInterface } from '../GraphContext';
import {
  handleDrawing,
  handleEndPoint,
  handleStartPoint,
} from '../helpers/drawing';
import GraphEditor from './GraphEditor';
import { GraphNode } from './GraphNode';

type MindMapProps = {
  isDrawing: boolean;
  setIsDrawing: (val: boolean) => void;
  points: any;
  setPoints: (val: any) => void;
  startPos: any;
};
export const GraphMindMapView: React.FC<MindMapProps> = ({
  isDrawing,
  setIsDrawing,
  points,
  setPoints,
  startPos,
}) => {
  const {
    drawingMode,
    lines,
    startNode,
    endNode,
    nodesDisplayed,
    nodesVisual,
  } = useContext(GraphContext) as GraphContextInterface;
  return (
    <div>
      {lines.map(function (line, i) {
        return (
          <LineTo
            key={i}
            from={line.start}
            to={line.end}
            id={i}
            arrow={line.arrowStart}
          />
        );
      })}
      {Object.keys(nodesDisplayed).map((node) => {
        const id = node;
        const title = nodesData[node].title;
        const { x, y, size } = nodesVisual[node];
        const [width, height] = size;
        // const width = node. ? node.graphNode.size[0] : 100;
        // const height = node.graphNode ? node.graphNode.size[1] : 100;
        // const x = node.graphNode?.x == undefined ? 0 : node.graphNode?.x;
        // const y = node.graphNode?.y == undefined ? 0 : node.graphNode?.y;

        return (
          <div
            className={node}
            key={node}
            onMouseDown={
              drawingMode
                ? (event: any) =>
                    handleStartPoint(node, startNode, setIsDrawing)
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
              left={x}
              top={y}
              id={node}
              size={[width, height]}
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
