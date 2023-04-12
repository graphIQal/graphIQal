import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Coord } from '../../pages/graph/helpers/drawing';
import GraphActionContext, {
  GraphActionContextInterface,
} from '../../pages/graph/GraphActionContext';
import DrawingContext, {
  DrawingContextInterface,
} from '../../pages/graph/DrawingContext';

const defaultAnchor = { x: 0.5, y: 0.5 };
const defaultBorderStyle = 'solid';
const defaultBorderWidth = 2;

type LineToPropTypes = {
  id: any;
  from: string;
  to: string;
  arrow: string | null;
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
  const [fromAnchor, setFromAnchor] = useState<any>();
  const [toAnchor, setToAnchor] = useState<any>();
  useEffect(() => {
    setFromAnchor(parseAnchor(props.fromAnchor));
    setToAnchor(parseAnchor(props.toAnchor));
  }, []);

  const parseAnchorPercent = (value: string) => {
    const percent = parseFloat(value) / 100;
    if (isNaN(percent) || !isFinite(percent)) {
      throw new Error(`LinkTo could not parse percent value "${value}"`);
    }
    return percent;
  };

  const parseAnchorText = (value: string) => {
    // Try to infer the relevant axis.
    switch (value) {
      case 'top':
        return { y: 0 };
      case 'left':
        return { x: 0 };
      case 'middle':
        return { y: 0.5 };
      case 'center':
        return { x: 0.5 };
      case 'bottom':
        return { y: 1 };
      case 'right':
        return { x: 1 };
    }
    return null;
  };

  const calcAnchor = (a: Element, b: Element) => {
    // const first = a.querySelector('.resizable');
    // const second = b.querySelector('.resizable');
    const first = a;
    const second = b;
    if (!first || !second) return;
    const box0 = first.getBoundingClientRect();
    const box1 = second.getBoundingClientRect();

    let fromAnchor = '';
    let toAnchor = '';
    if (box0.top + box0.height < box1.top) {
      fromAnchor += 'bottom';
      toAnchor += 'top';
    } else if (box1.top + box1.height < box0.top) {
      fromAnchor += 'top';
      toAnchor += 'bottom';
    } else {
      fromAnchor += 'center';
      toAnchor += 'center';
    }

    if (box0.left + box0.width < box1.left) {
      fromAnchor += ' right';
      toAnchor += ' left';
    } else if (box1.left + box1.width < box0.left) {
      fromAnchor += ' left';
      toAnchor += ' right';
    } else {
      fromAnchor += ' center';
      toAnchor += ' center';
    }

    return { fromAnchor: fromAnchor, toAnchor: toAnchor };
  };

  const parseAnchor = (value: string) => {
    if (!value) {
      return false;
    }
    const parts = value.split(' ');
    if (parts.length > 2) {
      throw new Error('LinkTo anchor format is "<x> <y>"');
    }
    const [x, y] = parts;
    return Object.assign(
      {},
      defaultAnchor,
      x ? parseAnchorText(x) || { x: parseAnchorPercent(x) } : {},
      y ? parseAnchorText(y) || { y: parseAnchorPercent(y) } : {}
    );
  };

  const findElement = (id: string) => {
    return document.getElementById(id);
  };

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
      anchor0 = parseAnchor(anchors.fromAnchor);
      anchor1 = parseAnchor(anchors.toAnchor);
    }
    const box0 = a.getBoundingClientRect();
    const box1 = b.getBoundingClientRect();

    let offsetX = window.pageXOffset;
    let offsetY = window.pageYOffset;

    const x0 = box0.left + box0.width * anchor0.x;
    const x1 = box1.left + box1.width * anchor1.x;
    const y0 = box0.top + box0.height * anchor0.y;
    const y1 = box1.top + box1.height * anchor1.y;

    return { x0, y0, x1, y1, anchor0, anchor1 };
  };
  let points = detect();
  return <Arrow id={props.id} arrow={props.arrow} {...points} />;
};
export default LineTo;

type LineProps = {
  x0?: any;
  y0?: any;
  x1?: any;
  y1?: any;
  borderColor?: string | undefined;
  borderStyle?: string | undefined;
  borderWidth?: number | undefined;
  className?: string | undefined;
  zIndex?: number | undefined;
};

const Line: React.FC<LineProps> = (props) => {
  const el = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (el.current != null) {
      document.body.appendChild(el.current);
    }

    return () => {
      if (el.current) document.body.removeChild(el.current);
    };
  }, []);
  const { x0, y0, x1, y1 } = props;

  const dy = y1 - y0;
  const dx = x1 - x0;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  const length = Math.sqrt(dx * dx + dy * dy);
  const positionStyle = {
    top: `${y0}px`,
    left: `${x0}px`,
    width: `${length}px`,
    zIndex: Number.isFinite(props.zIndex) ? String(props.zIndex) : '1',
    transform: `rotate(${angle}deg)`,
    // Rotate around (x0, y0)
    transformOrigin: '0 0',
    borderTopStyle: props.borderStyle || (defaultBorderStyle as any),
    borderTopWidth: props.borderWidth || defaultBorderWidth,
  };

  const elProps = {
    className: props.className + ' border-base_black absolute',
  };

  // We need a wrapper element to prevent an exception when then
  // React component is removed. This is because we manually
  // move the rendered DOM element after creation.
  return (
    <div className='react-lineto-placeholder'>
      <div ref={el} style={positionStyle} {...elProps} />
    </div>
  );
};

type ArrowProps = {
  id: any;
  x0?: any;
  y0?: any;
  x1?: any;
  y1?: any;
  arrow: string | null;
  anchor0?: any;
  anchor1?: any;
  borderColor?: string | undefined;
  borderStyle?: string | undefined;
  borderWidth?: number | undefined;
  className?: string | undefined;
  zIndex?: number | undefined;
};

const calculateDeltas = (
  x0: number,
  y0: number,
  x1: number,
  y1: number
): {
  dx: number;
  dy: number;
  absDx: number;
  absDy: number;
} => {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  return { dx, dy, absDx, absDy };
};

//calculating control points
const calculateControlPoints = ({
  absDx,
  absDy,
  dx,
  dy,
  anchor0,
  anchor1,
}: {
  absDx: number;
  absDy: number;
  dx: number;
  dy: number;
  anchor0: any;
  anchor1: any;
}): { p1: Coord; p2: Coord; p3: Coord; p4: Coord } => {
  let startPointX = 0;
  let startPointY = 0;
  let endPointX = absDx;
  let endPointY = absDy;
  if (dx < 0) [startPointX, endPointX] = [endPointX, startPointX];
  if (dy < 0) [startPointY, endPointY] = [endPointY, startPointY];
  if (anchor0 == undefined) {
    return {
      p1: { x: 0, y: 0 },
      p2: { x: 0, y: 0 },
      p3: { x: 0, y: 0 },
      p4: { x: 0, y: 0 },
    };
  }

  const fixedLineInflectionConstsant = 40;

  const p1 = {
    x: startPointX,
    y: startPointY,
  };
  const p2 = {
    x: startPointX,
    y: startPointY,
  };
  const p3 = {
    x: endPointX,
    y: endPointY,
  };
  const p4 = {
    x: endPointX,
    y: endPointY,
  };

  const offsetY = anchor0.y == 0.5 ? 0 : fixedLineInflectionConstsant;
  const offsetX = anchor0.y == 0.5 ? fixedLineInflectionConstsant : 0;
  if (dy >= 0) {
    p2.y += offsetY;
    p3.y -= offsetY;
  } else {
    p2.y -= offsetY;
    p3.y += offsetY;
  }

  if (dx >= 0) {
    p2.x += offsetX;
    p3.x -= offsetX;
  } else {
    p2.x -= offsetX;
    p3.x += offsetX;
  }

  return { p1, p2, p3, p4 };
};

const calculateControlPointsWithBuffer = ({
  boundingBoxElementsBuffer,
  absDx,
  absDy,
  dx,
  dy,
  anchor0,
  anchor1,
}: {
  boundingBoxElementsBuffer: number;
  absDx: number;
  absDy: number;
  dx: number;
  dy: number;
  anchor0: any;
  anchor1: any;
}): {
  p1: Coord;
  p2: Coord;
  p3: Coord;
  p4: Coord;
  boundingBoxBuffer: {
    vertical: number;
    horizontal: number;
  };
} => {
  const { p1, p2, p3, p4 } = calculateControlPoints({
    absDx,
    absDy,
    dx,
    dy,
    anchor0,
    anchor1,
  });

  const topBorder = Math.min(p1.y, p2.y, p3.y, p4.y);
  const bottomBorder = Math.max(p1.y, p2.y, p3.y, p4.y);
  const leftBorder = Math.min(p1.x, p2.x, p3.x, p4.x);
  const rightBorder = Math.max(p1.x, p2.x, p3.x, p4.x);

  const verticalBuffer =
    (bottomBorder - topBorder - absDy) / 2 + boundingBoxElementsBuffer;
  const horizontalBuffer =
    (rightBorder - leftBorder - absDx) / 2 + boundingBoxElementsBuffer;

  const boundingBoxBuffer = {
    vertical: verticalBuffer,
    horizontal: horizontalBuffer,
  };

  return {
    p1: {
      x: p1.x + horizontalBuffer,
      y: p1.y + verticalBuffer,
    },
    p2: {
      x: p2.x + horizontalBuffer,
      y: p2.y + verticalBuffer,
    },
    p3: {
      x: p3.x + horizontalBuffer,
      y: p3.y + verticalBuffer,
    },
    p4: {
      x: p4.x + horizontalBuffer,
      y: p4.y + verticalBuffer,
    },
    boundingBoxBuffer,
  };
};

const calculateCanvasDimensions = ({
  absDx,
  absDy,
  boundingBoxBuffer,
}: {
  absDx: number;
  absDy: number;
  boundingBoxBuffer: { vertical: number; horizontal: number };
}): {
  canvasWidth: number;
  canvasHeight: number;
} => {
  const canvasWidth = absDx + 2 * boundingBoxBuffer.horizontal;
  const canvasHeight = absDy + 2 * boundingBoxBuffer.vertical;

  return { canvasWidth, canvasHeight };
};

//calculating translation and rotation of arrow
const calculateTransformArrow = ({
  p3,
  p4,
  arrowHeadEndingSize,
}: {
  p3: Coord;
  p4: Coord;
  arrowHeadEndingSize: number;
}): {
  angle: number;
  x: number;
  y: number;
} => {
  const dy = p4.y - p3.y;
  const dx = p4.x - p3.x;

  let angle = (Math.atan(dy / dx) * 180) / Math.PI;
  if (p3.x > p4.x) {
    angle = 180;
  }
  let x;
  let y;
  if (angle == 0) {
    x = p4.x - arrowHeadEndingSize;
    y = p4.y - arrowHeadEndingSize / 2;
  } else if (angle == -90) {
    x = p4.x - arrowHeadEndingSize / 2;
    y = p4.y + arrowHeadEndingSize;
  } else if (angle == 180) {
    x = p4.x + arrowHeadEndingSize;
    y = p4.y + arrowHeadEndingSize / 2;
  } else {
    x = p4.x + arrowHeadEndingSize / 2;
    y = p4.y - arrowHeadEndingSize;
  }

  return { angle: angle, x: x, y: y };
};

//detection for which line the arrow was drawn on
export const isPointInCanvas = (
  point: Coord,
  canvasStartPoint: Coord,
  canvasWidth: number,
  canvasHeight: number
) => {
  if (
    point.x > canvasStartPoint.x &&
    point.x < canvasStartPoint.x + canvasWidth &&
    point.y > canvasStartPoint.y &&
    point.y < canvasStartPoint.y + canvasHeight
  ) {
    return true;
  }
};

export const numPointsInTriangle = (
  a: Coord,
  b: Coord,
  c: Coord,
  points: Coord[]
) => {
  const AB = { x: b.x - a.x, y: b.y - a.y };
  const AC = { x: c.x - a.x, y: c.y - a.y };
  const BC = { x: c.x - b.x, y: c.y - b.y };
  let numPoints = 0;
  for (let p in points) {
    let point = points[p];
    const AP = { x: point.x - a.x, y: point.y - a.y };
    const thirdTermABxAPisPositive = AB.x * AP.y - AB.y * AP.x > 0;
    const thirdTermACxAPisPositive = AC.x * AP.y - AC.y * AP.x > 0;

    if (thirdTermACxAPisPositive == thirdTermABxAPisPositive) continue;

    const BP = { x: point.x - b.x, y: point.y - b.y };
    const thirdTermBCxBPisPositive = BC.x * BP.y - BC.y * BP.x > 0;

    if (thirdTermBCxBPisPositive != thirdTermABxAPisPositive) continue;

    ++numPoints;
  }
  return numPoints;
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
}: ArrowProps) => {
  const { isPointInCanvasFuncs, numPointsInTriangleFuncs } = useContext(
    DrawingContext
  ) as DrawingContextInterface;

  const strokeWidth = 2;
  const arrowHeadEndingSize = 15;

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

  const { canvasWidth, canvasHeight } = calculateCanvasDimensions({
    absDx,
    absDy,
    boundingBoxBuffer,
  });

  const canvasXOffset = Math.min(x0, x1) - boundingBoxBuffer.horizontal;
  const canvasYOffset = Math.min(y0, y1) - boundingBoxBuffer.vertical;

  const { angle, x, y } = calculateTransformArrow({
    p3,
    p4,
    arrowHeadEndingSize,
  });

  //creates functions specific to each line to detect: if what is drawn is in the line's canvas and the number of points on the line that intersect the arrow's triangle
  const isPointInCanvasCallback = useCallback(
    (point: Coord) =>
      isPointInCanvas(point, canvasStartPoint, canvasWidth, canvasHeight),
    [canvasStartPoint, canvasWidth, canvasHeight]
  );

  (isPointInCanvasFuncs.current as any)[id] = isPointInCanvasCallback;
  let points: Coord[] = [];
  let numPointsInTriangleCallback = useCallback(
    (a: Coord, b: Coord, c: Coord) => numPointsInTriangle(a, b, c, points),
    [points]
  );

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
    <div id='container'>
      <svg
        width={canvasWidth}
        id='svg'
        height={canvasHeight}
        style={{
          transform: `translate(${canvasXOffset}px, ${canvasYOffset}px)`,
          position: 'absolute',
          zIndex: -1,
        }}
      >
        <path
          id={'line' + id}
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
        {arrow != null && (
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
