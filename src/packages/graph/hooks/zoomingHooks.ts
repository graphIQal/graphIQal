/**
 * Hooks for zooming (unimplemented)
 */

import { MutableRefObject, useReducer } from 'react';
import { initialState, reducer } from './reducer';
import { pan, zoom } from './zoomAndPan/actions';

export const usePanAndZoom = (containerRef: MutableRefObject<any>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
    }
  };
  return {
    ...state,
    translateXTemp: state.translateX,
    containerRef,
    onWheel,
  };
};
