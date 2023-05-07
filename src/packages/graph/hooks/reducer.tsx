import { MutableRefObject } from 'react';
import { Coord } from './drawingHooks';
import { types, zoom } from './zoomAndPan/actions';

type State = {
  translateX: number;
  translateY: number;
  prevMouseX: number;
  prevMouseY: number;
  currDeltaX: number;
  currDeltaY: number;
  scale: number;
  containerRect: any;
  currTranslation: any;
};

export const initialState = {
  translateX: 0,
  translateY: 0,
  prevMouseX: 0,
  prevMouseY: 0,
  currDeltaX: 0,
  currDeltaY: 0,
  scale: 1,
  containerRect: null,
  currTranslation: { x: 0, y: 0 },
};

export const reducer = (state: State, action: any) => {
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
      state.currTranslation = { x: state.currDeltaX, y: state.currDeltaY };
      return {
        ...state,
        translateX: state.currDeltaX,
        translateY: state.currDeltaY,
        prevMouseX: action.clientX,
        prevMouseY: action.clientY,
      };
    case types.ZOOM:
      // let newScale = state.scale - action.deltaY * 0.01;
      let scaleChange = 2 ** (action.deltaY * 0.005);
      let newScale = state.scale + (1 - scaleChange);
      if (newScale > 3) newScale = 3;
      if (newScale < 0.3) newScale = 0.3;
      // const mousePos = clientPosToTranslatedPos(
      //   { x: action.clientX, y: action.clientY },
      //   { x: state.currDeltaX, y: state.currDeltaY },
      //   action.containerRect
      // );
      // let prevMousePos = { x: state.prevMouseX, y: state.prevMouseY };
      // const scaleRatio = newScale / (state.scale != 0 ? state.scale : 1);
      // const focalPointDelta = {
      //   x: scaleRatio * mousePos.x - mousePos.x,
      //   y: scaleRatio * mousePos.y - mousePos.y,
      // };
      // const newTranslation = {
      //   x: state.currDeltaX - focalPointDelta.x,
      //   y: state.currDeltaY - focalPointDelta.y,
      // };

      // console.log(newTranslation);
      if (state.containerRect == null) {
        state.containerRect = action.containerRect;
      }

      let transformOriginX =
        state.containerRect.x + state.containerRect.width / 2;
      let transformOriginY =
        state.containerRect.y + state.containerRect.height / 2;
      const scaleToAdd = newScale - 1;
      let displacementX = (transformOriginX - action.clientX) / state.scale;
      let displacementY = (transformOriginY - action.clientY) / state.scale;

      state.currDeltaX = state.currTranslation.x + displacementX * scaleToAdd;
      state.currDeltaY = state.currTranslation.y + displacementY * scaleToAdd;
      // state.scale -= action.deltaY * 0.01;

      // const scaledTranslate = getScaledTranslate(state, action);
      // const mousePositionOnScreen = { x: action.clientX, y: action.clientY };
      // const zoomOffset = getZoomOffset(
      //   action.containerRect,
      //   mousePositionOnScreen,
      //   action.zoomFactor
      // );

      // state.currDeltaX += action.deltaX * state.scale;
      // state.currDeltaY += action.deltaY * state.scale;
      // // state.currDeltaX -= scaledTranslate.x - zoomOffset.x;
      // // state.currDeltaY -= scaledTranslate.y - zoomOffset.y;

      // console.log('new state');
      // console.log(state.currDeltaX);
      // console.log(state.currDeltaY);

      return {
        ...state,
        scale: newScale,
        // translateX: newTranslation.x,
        // translateY: state.currDeltaY,
        // currDeltaX: newTranslation.x,
        // currDeltaY: newTranslation.y,
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
    x: state.currDeltaX * action.zoomFactor,
    y: state.currDeltaY * action.zoomFactor,
  };
};

const clientPosToTranslatedPos = (
  pos: { x: number; y: number },
  translation: { x: number; y: number },
  containerRect: any
) => {
  return {
    x: pos.x - (containerRect.current.left + translation.x),
    y: pos.y - (containerRect.current.top + translation.y),
  };
};
