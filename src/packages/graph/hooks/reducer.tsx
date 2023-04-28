import { MutableRefObject } from 'react';
import { Coord } from './drawingHooks';
import { types } from './zoomAndPan/actions';

export const initialState = {
  translateX: 0,
  translateY: 0,
  prevMouseX: 0,
  prevMouseY: 0,
  currDeltaX: 0,
  currDeltaY: 0,
  scale: 1,
};

export const reducer = (state: typeof initialState, action: any) => {
  if (!Number.isFinite(state.currDeltaX)) {
    state.currDeltaX = 0;
  }
  if (!Number.isFinite(state.currDeltaY)) {
    state.currDeltaY = 0;
  }
  switch (action.type) {
    case types.PAN_START:
      return {
        ...state,
        prevMouseX: action.clientX,
        prevMouseY: action.clientY,
      };
    case types.PAN:
      state.currDeltaX += action.deltaX;
      state.currDeltaY += action.deltaY;
      return {
        ...state,
        translateX: state.currDeltaX,
        translateY: state.currDeltaY,
        prevMouseX: action.clientX,
        prevMouseY: action.clientY,
      };
    case types.ZOOM:
      state.scale -= action.deltaY * 0.01;
      if (state.scale > 1.5) state.scale = 1.5;
      if (state.scale < 0.6) state.scale = 0.6;
      const scaledTranslate = getScaledTranslate(state, action);
      const mousePositionOnScreen = { x: action.clientX, y: action.clientY };
      const zoomOffset = getZoomOffset(
        action.containerRect,
        mousePositionOnScreen,
        action.zoomFactor
      );

      state.currDeltaX -= action.deltaX;
      state.currDeltaY -= action.deltaY;

      return {
        ...state,
        scale: state.scale,
        translateX: state.currDeltaX,
        translateY: state.currDeltaY,
        prevMouseX: action.clientX,
        prevMouseY: action.clientY,
      };
    default:
      return state;
  }
};

const getZoomOffset = (
  containerRect: any,
  mousePositionOnScreen: Coord,
  zoomFactor: number
) => {
  const zoomOrigin = {
    x: mousePositionOnScreen.x - containerRect.left,
    y: mousePositionOnScreen.y - containerRect.top,
  };
  const currentDistanceToCenter = {
    x: containerRect.width / 2 - zoomOrigin.x,
    y: containerRect.height / 2 - zoomOrigin.y,
  };
  const scaledDistanceToCenter = {
    x: currentDistanceToCenter.x * zoomFactor,
    y: currentDistanceToCenter.y * zoomFactor,
  };

  const zoomOffset = {
    x: currentDistanceToCenter.x - scaledDistanceToCenter.x,
    y: currentDistanceToCenter.y - scaledDistanceToCenter.y,
  };

  return zoomOffset;
};

const getScaledTranslate = (state: any, action: any) => {
  return {
    x: state.currDeltaX + action.clientX * action.zoomFactor,
    y: state.currDeltaY + action.clientY * action.zoomFactor,
  };
};
