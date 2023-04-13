/**
 * Display of nodes and lines connecting them in "mind map" style
 */
import React, { useContext } from 'react';
import LineTo from '../../../packages/lineto/LineTo';
import DrawingContext, {
  DrawingContextInterface,
} from '../context/GraphDrawingContext';
import GraphActionContext, {
  GraphActionContextInterface,
} from '../context/GraphActionContext';
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
};
export const GraphMindMapView: React.FC<MindMapProps> = ({
  points,
  setPoints,
  startPos,
}) => {
  const handleDrawing = useDrawingCanvas();
  const handleStartPoint = useDrawingStart();

  //   handleStartPoint,
  const { lines, nodesDisplayed, nodesVisual, allNodes } = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;

  const { startNode, endNode, drawingMode, isDrawing, setIsDrawing } =
    useContext(DrawingContext) as DrawingContextInterface;

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
        const title = allNodes[node].title;
        const { x, y, size } = nodesVisual[node];
        const [width, height] = size;

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
