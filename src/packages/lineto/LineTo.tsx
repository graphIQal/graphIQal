/**
 * Index file for the Lines that are drawn between nodes
 * Main components: LineTo -> calculates the information of the line being drawn including anchors
 *                  Arrow -> handles rendering of the lines as well as arrow drawing/rendering
 */

import { shift } from '@floating-ui/core';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  calculateControlPointsWithBuffer,
  calculateDeltas,
  calculateTransformArrow,
  useNumPointsInTriangle,
} from './arrowHelpers';
import { calculateCanvasDimensions, useIsPointInCanvas } from './canvasHelpers';
import { calcAnchor, findElement, parseAnchor } from './lineHelpers';
import DrawingContext, {
  DrawingContextInterface,
} from '../graph/context/GraphDrawingContext';
import { Coord } from '../graph/hooks/drawingHooks';
import { useVerticalOffset } from '../graph/hooks/useVerticalOffset';
import { Dropdown, ItemProps } from '../../components/organisms/Dropdown';
import { ConnectionTypes } from '../../schemas/Data_structures/DS_schema';
import IconCircleButton from '../../components/molecules/IconCircleButton';
import { deleteConnection } from '../../helpers/backend/mutateHelpers';

// Default styling stuff
const defaultAnchor = { x: 0.5, y: 0.5 };
const strokeWidth = 2;
const arrowHeadEndingSize = 15;

type LineToPropTypes = {
  id: any;
  from: string;
  to: string;
  arrow: boolean;
  getDropDownItems: (
    from: string,
    to: string
  ) => { items: ItemProps[]; activeIndex: number };
  deleteConnection: (from: string, to: string) => void;
  fromAnchor?: any;
  toAnchor?: any;
  delay?: any;
  borderColor?: string;
  borderStyle?: string;
  borderWidth?: number;
  className?: string;
  zIndex?: number;
};

export const LineTo: React.FC<LineToPropTypes> = (props) => {
  if (props.from == props.to) return <div></div>;
  const [fromAnchor, setFromAnchor] = useState<any>();
  const [toAnchor, setToAnchor] = useState<any>();
  useEffect(() => {
    setFromAnchor(parseAnchor(props.fromAnchor, defaultAnchor));
    setToAnchor(parseAnchor(props.toAnchor, defaultAnchor));
  }, []);

  const detect = () => {
    const { from, to } = props;

    const a = findElement(from)?.nextElementSibling;
    const b = findElement(to)?.nextElementSibling;
    if (!a || !b) {
      return false;
    }

    let anchor0 = fromAnchor;
    let anchor1 = toAnchor;

    if (!anchor0 || !anchor1) {
      const anchors = calcAnchor(a, b);
      if (!anchors) return;
      anchor0 = parseAnchor(anchors.fromAnchor, defaultAnchor);
      anchor1 = parseAnchor(anchors.toAnchor, defaultAnchor);
    }
    const box0 = a.getBoundingClientRect();
    const box1 = b.getBoundingClientRect();

    const x0 = box0.left + box0.width * anchor0.x;
    const x1 = box1.left + box1.width * anchor1.x;
    const y0 = box0.top + box0.height * anchor0.y;
    const y1 = box1.top + box1.height * anchor1.y;
    return {
      x0: x0,
      y0: y0 + useVerticalOffset(),
      x1: x1,
      y1: y1 + useVerticalOffset(),
      anchor0,
      anchor1,
    };
  };

  let points = detect();
  if (!points) {
    return <div></div>;
  }

  return (
    <Arrow
      id={props.id}
      arrow={props.arrow}
      {...points}
      getDropdownItems={() => props.getDropDownItems(props.from, props.to)}
      deleteConnection={() => props.deleteConnection(props.from, props.to)}
    />
  );
};
export default LineTo;

type ArrowProps = {
  id: any;
  x0?: any;
  y0?: any;
  x1?: any;
  y1?: any;
  arrow: boolean;
  getDropdownItems: () => { items: ItemProps[]; activeIndex: number };
  deleteConnection: () => void;
  anchor0?: any;
  anchor1?: any;
  borderColor?: string | undefined;
  borderStyle?: string | undefined;
  borderWidth?: number | undefined;
  className?: string | undefined;
  zIndex?: number | undefined;
};

export const Arrow = ({
  x0,
  y0,
  x1,
  y1,
  anchor0,
  anchor1,
  id,
  arrow,
  getDropdownItems,
  deleteConnection,
}: ArrowProps) => {
  const { isPointInCanvasFuncs, numPointsInTriangleFuncs } = useContext(
    DrawingContext
  ) as DrawingContextInterface;

  const boundingBoxElementsBuffer = strokeWidth + arrowHeadEndingSize;
  // Getting info about SVG canvas
  const canvasStartPoint = {
    x: Math.min(x0, x1),
    y: Math.min(y0, y1),
  };

  const { absDx, absDy, dx, dy } = calculateDeltas(x0, y0, x1, y1);

  const { p1, p2, p3, p4, boundingBoxBuffer } =
    calculateControlPointsWithBuffer({
      boundingBoxElementsBuffer,
      dx,
      dy,
      absDx,
      absDy,
      anchor0,
      anchor1,
    });

  let { canvasWidth, canvasHeight } = calculateCanvasDimensions({
    absDx,
    absDy,
    boundingBoxBuffer,
  });

  canvasWidth = Number.isFinite(canvasWidth) ? canvasWidth : 0;
  canvasHeight = Number.isFinite(canvasHeight) ? canvasHeight : 0;

  let canvasXOffset = Math.min(x0, x1) - boundingBoxBuffer.horizontal;
  let canvasYOffset = Math.min(y0, y1) - boundingBoxBuffer.vertical;

  const { angle, x, y } = calculateTransformArrow({
    p3,
    p4,
    arrowHeadEndingSize,
  });

  //creates functions specific to each line to detect: if what is drawn is in the line's canvas and the number of points on the line that intersect the arrow's triangle
  const isPointInCanvasCallback = useCallback(
    (point: Coord) => {
      //   console.log(
      //     'x ' + canvasStartPoint.x + ' ' + (canvasStartPoint.x + canvasWidth)
      //   );
      //   console.log(
      //     'y ' + canvasStartPoint.y + ' ' + (canvasStartPoint.y + canvasHeight)
      //   );
      //   console.log(JSON.stringify(point));
      return useIsPointInCanvas(
        point,
        canvasStartPoint,
        canvasWidth,
        canvasHeight
      );
    },
    [canvasStartPoint, canvasWidth, canvasHeight]
  );

  (isPointInCanvasFuncs.current as any)[id] = isPointInCanvasCallback;
  let points: Coord[] = [];
  let numPointsInTriangleCallback = useCallback(
    (a: Coord, b: Coord, c: Coord) => useNumPointsInTriangle(a, b, c, points),
    [points]
  );

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    var path = document.getElementById('line' + id) as HTMLElement &
      SVGPathElement;
    var pathLength = Math.floor(path.getTotalLength());
    points = [];

    for (let i = 0; i < 100; ++i) {
      let percent = (i * pathLength) / 100;
      let pt = path.getPointAtLength(percent);
      pt.x += canvasXOffset;
      pt.y += canvasYOffset;
      points.push(pt);
    }
    (numPointsInTriangleFuncs.current as any)[id] = numPointsInTriangleCallback;
  }, []);

  return (
    <div className='relative'>
      <div
        className='absolute w-max z-30'
        style={{
          left: (p1.x + p4.x) / 2 + canvasXOffset - 15,
          top: (p1.y + p4.y) / 2 + canvasYOffset - 15,
        }}
      >
        <IconCircleButton
          selected={showDropdown}
          onClick={() => setShowDropdown(!showDropdown)}
          src='connection'
        />
        {showDropdown && (
          <Dropdown
            items={getDropdownItems().items}
            activeIndex={getDropdownItems().activeIndex}
          />
        )}
      </div>

      <svg
        width={canvasWidth}
        id='svg'
        height={canvasHeight}
        style={{
          transform: `translate(${canvasXOffset}px, ${canvasYOffset}px)`,
          position: 'absolute',
          zIndex: -1,
          //   backgroundColor: 'gray',
        }}
      >
        <path
          id={'line' + id}
          style={{ zIndex: 100 }}
          onMouseOver={() => setShowDropdown(true)}
          stroke='black'
          strokeWidth={strokeWidth}
          fill='none'
          d={`
      M 
        ${p1.x}, ${p1.y} 
      C 
        ${p2.x}, ${p2.y} 
        ${p3.x}, ${p3.y} 
        ${p4.x}, ${p4.y} 
      `}
        />
        {arrow && (
          <path
            d={`
      M ${(arrowHeadEndingSize / 5) * 2} 0
      L ${arrowHeadEndingSize} ${arrowHeadEndingSize / 2}
      L ${(arrowHeadEndingSize / 5) * 2} ${arrowHeadEndingSize}`}
            fill='none'
            stroke='black'
            strokeWidth={strokeWidth}
            style={{
              transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
            }}
          />
        )}
      </svg>
    </div>
  );
};
