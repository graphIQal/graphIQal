//When a circle is clicked
export const handleMouseDownCircle = (
  event: any,
  setIsDrawing: (val: boolean) => void,
  setCanDrag: (val: boolean) => void,
  lines: any[],
  setLineAll: (lines: any[]) => void
) => {
  setIsDrawing(true);
  setCanDrag(false);
  const currentCoord = { x: event.clientX, y: event.clientY };
  setLineAll([...lines, { start: currentCoord, end: currentCoord }]);
};

//When mouse is released not on any circle
const handleWrongEndpoint = (
  setCanDrag: (val: boolean) => void,
  lines: any[],
  setLineAll: (lines: any[]) => void,
  circleRefs: any[]
) => {
  console.log('wrong endpoint!');
  setLineAll(lines.pop());
  document.removeEventListener('mousemove', (event) =>
    handleDrawing(event, lines, setLineAll)
  );
  document.removeEventListener('mouseup', (event) =>
    handleEndPoint(event, setCanDrag, lines, setLineAll, circleRefs)
  );
  setCanDrag(true);
};

//On mouse move to draw the line (not doing anything rn)
export const handleDrawing = (
  event: any,
  lines: any[],
  setLineAll: (lines: any[]) => void
) => {
  console.log('drawing');
  const currentCoord = { x: event.clientX, y: event.clientY };
  if (lines.length == 0) {
    return;
  }
  const nextLines = lines.map((e: any, i: number) => {
    if (i === lines.length - 1) {
      return { start: e.start, end: currentCoord };
    } else {
      return e;
    }
  });

  setLineAll(nextLines);
};

//When mouse is released on another circle
export const handleEndPoint = (
  event: any,
  setCanDrag: (val: boolean) => void,
  lines: any[],
  setLineAll: (lines: any[]) => void,
  circleRefs: any[]
) => {
  console.log('correct target!');
  // const currentCoord = { x: event.clientX, y: event.clientY };
  const currentCoord = { x: event.clientX, y: event.clientY };
  if (lines.length == 0) {
    return;
  }
  const nextLines = lines.map((e: any, i: number) => {
    if (i === lines.length - 1) {
      return { start: e.start, end: currentCoord };
      // return { start: circleRefs[0], end: circleRefs[1] };
    } else {
      return e;
    }
  });

  setLineAll(nextLines);
  document.removeEventListener('mousemove', (event) =>
    handleDrawing(event, lines, setLineAll)
  );
  document.removeEventListener('mouseup', (event) =>
    handleWrongEndpoint(setCanDrag, lines, setLineAll, circleRefs)
  );
  setCanDrag(true);
  for (const ref in circleRefs) {
    (circleRefs[ref].current as any).removeEventListener(
      'mouseup',
      handleEndPoint
    );
  }
};
