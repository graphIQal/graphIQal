/**
 * Display of nodes and lines connecting them in "mind map" style
 */
import React, { useContext, useEffect, useRef } from 'react';
import LineTo from '../../../packages/lineto/LineTo';

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
import { usePanAndZoom } from '../hooks/zoomingHooks';
import DrawingContext, {
  DrawingContextInterface,
} from '../context/GraphDrawingContext';

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

  const { lines, nodesDisplayed, nodesVisual, allNodes, setLines } = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;

  useEffect(() => {
    setLines([...lines]);
  }, [translateX]);

  const { startNode, endNode, drawingMode, isDrawing, setIsDrawing } =
    useContext(DrawingContext) as DrawingContextInterface;
  return (
    <div className='relative' id='container'>
      {lines.map(function (line, i) {
        return (
          <LineTo
            key={i}
            from={line.start}
            to={line.end}
            id={i}
            arrow={line.arrowStart}
            translateX={translateX ? translateX : 0}
            translateY={translateY ? translateX : 0}
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
