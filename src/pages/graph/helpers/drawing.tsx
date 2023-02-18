import { MutableRefObject } from 'react';

//drawing functions
export const handleStartPoint = (
  event: any,
  id: string,
  startNode: MutableRefObject<string>,
  setIsDrawing: (val: boolean) => void
) => {
  startNode.current = id;
  setIsDrawing(true);
};

export type Coord = {
  x: number;
  y: number;
};
export const handleDrawing = (
  event: any,
  points: Coord[],
  setPoints: (val: Coord[]) => void
) => {
  setPoints([...points, { x: event.clientX, y: event.clientY }]);
};

export const handleEndPoint = (
  event: any,
  id: string,
  endNode: MutableRefObject<string>,
  setIsDrawing: (val: boolean) => void,
  setPoints: (val: any) => void,
  setDrawingMode: (val: boolean) => void
) => {
  setPoints([]);
  endNode.current = id;
  setIsDrawing(false);
  setDrawingMode(false);
};

export const isCircle = (coords: Coord[]) => {
  let xAvg = 0;
  let yAvg = 0;
  for (const coord in coords) {
    xAvg += coords[coord].x;
    yAvg += coords[coord].y;
  }
  xAvg = xAvg / coords.length;
  yAvg = yAvg / coords.length;
  let avgDist = 0;
  for (const coord in coords) {
    let dx = coords[coord].x - xAvg;
    let dy = coords[coord].y - yAvg;
    avgDist += Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }
  avgDist = avgDist / coords.length;
  const min = avgDist * 0.8;
  const max = avgDist * 1.2;
  let countWithin = 0;
  for (const coord in coords) {
    let dx = coords[coord].x - xAvg;
    let dy = coords[coord].y - yAvg;
    let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (distance >= min && distance <= max) {
      countWithin = countWithin + 1;
    }
  }
  return {
    circle: countWithin / coords.length >= 0.5,
    center: [xAvg, yAvg],
    size: avgDist,
  };
};

export const handleCircleDrawing = (
  event: any,
  setIsDrawing: (val: any) => void,
  points: Coord[],
  setPoints: (val: Coord[]) => void,
  nodes: any,
  setNodes: (val: any) => void,
  setDrawingMode: (val: boolean) => void
) => {
  setIsDrawing(false);
  const { circle, center, size } = isCircle(points);
  const ids = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
  ];
  if (circle) {
    setDrawingMode(false);

    let newNodes = { ...nodes };
    let dimension = Math.sqrt(Math.pow(size, 2) / 2) * 2;
    newNodes[ids[Object.keys(nodes).length + 1]] = {
      id: ids[Object.keys(nodes).length + 1],
      graphNode: {
        index: 0,
        x: center[0] - dimension / 2,
        y: center[1] - dimension / 2,
        size: [dimension, dimension],
      },
    };
    setNodes(newNodes);
  }
  setPoints([]);
};

export const handleDrawingHotkey = (
  event: any,
  controlPressed: MutableRefObject<boolean>,
  drawingMode: boolean,
  setDrawingMode: (val: boolean) => void
) => {
  if (controlPressed.current) {
    if (event.code == 'KeyE') {
      setDrawingMode(!drawingMode);
    }
  }
  if (event.metaKey) {
    controlPressed.current = true;
  }
};

//When a circle is clicked
//Circle stuff not being used at the moment
// export const handleMouseDownCircle = (
//   event: any,
//   setIsDrawing: (val: boolean) => void,
//   setCanDrag: (val: boolean) => void,
//   lines: any[],
//   setLineAll: (lines: any[]) => void
// ) => {
//   setIsDrawing(true);
//   setCanDrag(false);
//   const currentCoord = { x: event.clientX, y: event.clientY };
//   setLineAll([...lines, { start: currentCoord, end: currentCoord }]);
// };

// //When mouse is released not on any circle
// const handleWrongEndpoint = (
//   setCanDrag: (val: boolean) => void,
//   lines: any[],
//   setLineAll: (lines: any[]) => void,
//   circleRefs: any[]
// ) => {
//   console.log('wrong endpoint!');
//   setLineAll(lines.pop());
//   document.removeEventListener('mousemove', (event) =>
//     handleDrawing(event, lines, setLineAll)
//   );
//   document.removeEventListener('mouseup', (event) =>
//     handleEndPoint(event, setCanDrag, lines, setLineAll, circleRefs)
//   );
//   setCanDrag(true);
// };

// //On mouse move to draw the line (not doing anything rn)
// export const handleDrawing = (
//   event: any,
//   lines: any[],
//   setLineAll: (lines: any[]) => void
// ) => {
//   console.log('drawing');
//   const currentCoord = { x: event.clientX, y: event.clientY };
//   if (lines.length == 0) {
//     return;
//   }
//   const nextLines = lines.map((e: any, i: number) => {
//     if (i === lines.length - 1) {
//       return { start: e.start, end: currentCoord };
//     } else {
//       return e;
//     }
//   });

//   setLineAll(nextLines);
// };

// //When mouse is released on another circle
// export const handleEndPoint = (
//   event: any,
//   setCanDrag: (val: boolean) => void,
//   lines: any[],
//   setLineAll: (lines: any[]) => void,
//   circleRefs: any[]
// ) => {
//   console.log('correct target!');
//   // const currentCoord = { x: event.clientX, y: event.clientY };
//   const currentCoord = { x: event.clientX, y: event.clientY };
//   if (lines.length == 0) {
//     return;
//   }
//   const nextLines = lines.map((e: any, i: number) => {
//     if (i === lines.length - 1) {
//       return { start: e.start, end: currentCoord };
//       // return { start: circleRefs[0], end: circleRefs[1] };
//     } else {
//       return e;
//     }
//   });

//   setLineAll(nextLines);
//   document.removeEventListener('mousemove', (event) =>
//     handleDrawing(event, lines, setLineAll)
//   );
//   document.removeEventListener('mouseup', (event) =>
//     handleWrongEndpoint(setCanDrag, lines, setLineAll, circleRefs)
//   );
//   setCanDrag(true);
//   for (const ref in circleRefs) {
//     (circleRefs[ref].current as any).removeEventListener(
//       'mouseup',
//       handleEndPoint
//     );
//   }
// };
