/**
 * Hooks for zooming (unimplemented)
 */

import {
  MutableRefObject,
  useCallback,
  useReducer,
  useRef,
  useState,
} from 'react';
import { initialState, reducer } from './reducer';
import { pan, startPan, zoom } from './zoomAndPan/actions';

export const useZoom = () => {
  const [zoomFactor, setZoomFactor] = useState(1);
  const theta = 0.1;
  const [lastZoomCenter, setLastZoomCenter] = useState(null);
  const [pointersDown, setPointersDown] = useState<PointerEvent[]>([]);
};

export const useZoomEvents = <T extends HTMLElement>() =>
  // zoomRef: React.RefObject<number>,
  // ref: React.RefObject<T>
  {
    //coordinates of cursor
    let cursorX;
    let cursorY;
    let prevCursorX;
    let prevCursorY;

    //distance from origin
    let offsetX = 0;
    let offsetY = 0;

    //zoom amount
    let scale = 1;

    //canvas element
    const canvas = document.getElementById('canvas');

    //converting coordinates
    const toScreenX = (xTrue: number) => {
      return (xTrue + offsetX) * scale;
    };

    const toScreenY = (yTrue: number) => {
      return (yTrue + offsetY) * scale;
    };

    const toTrueX = (xScreen: number) => {
      return xScreen / scale - offsetX;
    };

    const toTrueY = (yScreen: number) => {
      return yScreen / scale - offsetY;
    };

    const trueHeight = () => {
      if (!canvas) return 0;
      return canvas.clientHeight / scale;
    };

    const trueWidth = () => {
      if (!canvas) return 0;
      return canvas.clientWidth / scale;
    };

    // const handlePinchStart = useCallback(() => {});

    return { toScreenX, toScreenY, toTrueX, toTrueY, trueHeight, trueWidth };
  };

export const usePanAndZoom = (containerRef: MutableRefObject<any>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onMouseMoveInWindow = (event: Event) => {
    // event.preventDefault();
    dispatch(pan(event));
  };

  const onMouseUpInWindow = () => {
    window.removeEventListener('mouseup', onMouseUpInWindow);
    window.removeEventListener('mousemove', onMouseMoveInWindow);
  };

  const onMouseDown = (event: any) => {
    dispatch(startPan(event));
    window.addEventListener('mousemove', onMouseUpInWindow);
    window.addEventListener('mouseup', onMouseMoveInWindow);
  };

  const onWheel = (event: any) => {
    event.preventDefault();
    if (event.deltaY !== 0 && containerRef.current) {
      if (event.ctrlKey) {
        //zoom event
        const containerRect = containerRef.current.getBoundingClientRect();
        dispatch(zoom(event, containerRect));
      } else {
        //pan event
        dispatch(pan(event));
      }
      // dispatch(startPan(event));

      // dispatch(zoom(event, containerRect));
    }
  };
  return {
    ...state,
    containerRef,
    onMouseDown,
    onWheel,
  };
};
