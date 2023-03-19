import { Position } from 'postcss';
import PropTypes from 'prop-types';
import React, {
  Component,
  PureComponent,
  useEffect,
  useRef,
  useState,
} from 'react';
// import Line from './index.jsx';
const defaultAnchor = { x: 0.5, y: 0.5 };
const defaultBorderStyle = 'solid';
const defaultBorderWidth = 2;

type LineToPropTypes = {
  from: string;
  to: string;
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

    // return () => {
    //     if (this.t) {
    //         clearTimeout(this.t);
    //         this.t = null;
    //       }
    // }
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
    // const a = findElement(from);
    // const b = findElement(to);
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

    return { x0, y0, x1, y1 };
  };
  let points = detect();
  // return <Line {...points} {...props} />;
  return <Arrow {...points} />;
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

type Point = {
  x: number;
  y: number;
};

// type ArrowProps = {
//   startPoint: Point;
//   endPoint: Point;
// };
type ArrowProps = {
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

const calculateControlPoints = ({
  absDx,
  absDy,
  dx,
  dy,
}: {
  absDx: number;
  absDy: number;
  dx: number;
  dy: number;
}): { p1: Point; p2: Point; p3: Point; p4: Point } => {
  let startPointX = 0;
  let startPointY = 0;
  let endPointX = absDx;
  let endPointY = absDy;
  if (dx < 0) [startPointX, endPointX] = [endPointX, startPointX];
  if (dy < 0) [startPointY, endPointY] = [endPointY, startPointY];

  const fixedLineInflectionConstsant = 40;

  const p1 = {
    x: startPointX,
    y: startPointY,
  };
  const p2 = {
    x: startPointX + fixedLineInflectionConstsant,
    y: startPointY,
  };
  const p3 = {
    x: endPointX - fixedLineInflectionConstsant,
    y: endPointY,
  };
  const p4 = {
    x: endPointX,
    y: endPointY,
  };

  return { p1, p2, p3, p4 };
};

const calculateControlPointsWithBuffer = ({
  boundingBoxElementsBuffer,
  absDx,
  absDy,
  dx,
  dy,
}: {
  boundingBoxElementsBuffer: number;
  absDx: number;
  absDy: number;
  dx: number;
  dy: number;
}): {
  p1: Point;
  p2: Point;
  p3: Point;
  p4: Point;
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

const calculateAngle = ({
  p3,
  p4,
}: {
  p3: Point;
  p4: Point;
}): {
  angle: number;
} => {
  const dy = p4.y - p3.y;
  const dx = p4.x - p3.x;

  return { angle: Math.atan(dy / dx) };
};

export const isArrowOnLine = (
  point: Point,
  setArrow: (val: boolean) => void,
  canvasStartPoint: Point,
  canvasEndPoint: Point,
  canvasWidth: number,
  canvasHeight: number
) => {
  if (
    point.x > canvasStartPoint.x &&
    point.x < canvasStartPoint.x + canvasWidth &&
    point.y > canvasStartPoint.y &&
    point.y < canvasStartPoint.y + canvasHeight
  ) {
    setArrow(true);
  }
};

export const Arrow = ({ x0, y0, x1, y1 }: ArrowProps) => {
  console.log('start point ' + x0 + ' ' + y0);
  console.log('end point ' + x1 + ' ' + y1);

  const strokeWidth = 1;
  const arrowHeadEndingSize = 10;

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
    });

  const { canvasWidth, canvasHeight } = calculateCanvasDimensions({
    absDx,
    absDy,
    boundingBoxBuffer,
  });

  const canvasXOffset = Math.min(x0, x1) - boundingBoxBuffer.horizontal;
  const canvasYOffset = Math.min(y0, y1) - boundingBoxBuffer.vertical;

  const { angle } = calculateAngle({ p3, p4 });

  return (
    <svg
      width={canvasWidth}
      height={canvasHeight}
      style={{
        background: '#eee',
        transform: `translate(${canvasXOffset}px, ${canvasYOffset}px)`,
      }}
    >
      <path
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
      <path
        d={`
      M ${(arrowHeadEndingSize / 5) * 2} 0
      L ${arrowHeadEndingSize} ${arrowHeadEndingSize / 2}
      L ${(arrowHeadEndingSize / 5) * 2} ${arrowHeadEndingSize}`}
        fill='none'
        stroke='black'
        style={{
          transform: `translate(${p4.x - arrowHeadEndingSize}px, ${
            p4.y - arrowHeadEndingSize / 2
          }px) rotate(${angle}deg)`,
        }}
      />
    </svg>
  );
};
