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
const defaultBorderWidth = 3;

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
    const box0 = a.getBoundingClientRect();
    const box1 = b.getBoundingClientRect();

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
    const a = findElement(from);
    const b = findElement(to);

    if (!a || !b) {
      return false;
    }

    let anchor0 = fromAnchor;
    let anchor1 = toAnchor;

    if (!anchor0 || !anchor1) {
      const anchors = calcAnchor(a, b);
      anchor0 = parseAnchor(anchors.fromAnchor);
      anchor1 = parseAnchor(anchors.toAnchor);
    }
    const box0 = a.getBoundingClientRect();
    const box1 = b.getBoundingClientRect();

    let offsetX = window.pageXOffset;
    let offsetY = window.pageYOffset;

    const x0 = box0.left + box0.width * anchor0.x + offsetX;
    const x1 = box1.left + box1.width * anchor1.x + offsetX;
    const y0 = box0.top + box0.height * anchor0.y + offsetY;
    const y1 = box1.top + box1.height * anchor1.y + offsetY;

    return { x0, y0, x1, y1 };
  };
  let points = detect();
  return <Line {...points} {...props} />;
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
  console.log('props ' + JSON.stringify(props));
  const el = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (el.current != null) {
      document.body.appendChild(el.current);
    }
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
