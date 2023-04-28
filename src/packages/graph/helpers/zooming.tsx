/**
 * Helpers for zooming (unimplemented)
 */

const theta = 0.1;
let prevDiff = -1;

export const onPointDown: any = (
  event: any,
  pointersDown: any[],
  setPointersDown: (pointers: any[]) => void
) => {
  setPointersDown([...pointersDown, event]);
};

export const onPointMove = (
  event: PointerEvent,
  pointersDown: any[],
  setPointersDown: (pointers: any[]) => void
) => {
  const index = pointersDown.findIndex(
    (cachedEv) => cachedEv.pointerId === event.pointerId
  );
  const temp = [...pointersDown];
  temp[index] = event;
  setPointersDown(temp);
  if (pointersDown.length == 2) {
    const currDiff = Math.abs(
      pointersDown[0].clientX - pointersDown[1].clientX
    );
    if (prevDiff > 0) {
      if (currDiff > prevDiff) {
        console.log('zooming in');
        // zoomTransform(true, event.clientX, event.clientY)
      }
      if (currDiff < prevDiff) {
        console.log('zooming 0out');
        // zoomTransform(false, event.clientX, event.clientY);
      }
    }
    prevDiff = currDiff;
  }
};
export const pointerUp = (
  event: PointerEvent,
  pointersDown: any[],
  setPointersDown: (pointers: any[]) => void
) => {
  const index = pointersDown.findIndex(
    (cachedEv) => cachedEv.pointerId === event.pointerId
  );
  const temp = pointersDown;
  temp.splice(index, 1);
  setPointersDown(temp);
  if (pointersDown.length < 2) {
    prevDiff = -1;
  }
};
export const zoomTransform = (
  isZoomIn: boolean,
  mouseX: number,
  mouseY: number,
  nodes: any,
  setNodes: (newNodes: any) => void,
  zoomFactor: number,
  setZoomFactor: (val: number) => void,
  lastZoomCenter: { x: number; y: number },
  setLastZoomCenter: (val: any) => void
) => {
  const oldZoomFactor = zoomFactor;
  if (isZoomIn) {
    console.log('zooming in');
    setZoomFactor(zoomFactor + theta);
  } else {
    console.log('zooming out');
    setZoomFactor(zoomFactor - theta);
  }
  let newNodes: any = {};
  for (const node in nodes) {
    const n = nodes[node];
    if (!n.graphNode || !n.graphNode.x || !n.graphNode.y) {
      continue;
    }

    //calculate original dimensions
    let x =
      (n.graphNode?.x - lastZoomCenter.x) / oldZoomFactor + lastZoomCenter.x;
    let y =
      (n.graphNode?.y - lastZoomCenter.y) / oldZoomFactor + lastZoomCenter.y;
    let width = n.graphNode.size[0] / oldZoomFactor;
    let height = n.graphNode.size[1] / oldZoomFactor;

    //calculate dimensions to current zoom factor;
    x = zoomFactor * (x - mouseX);
    y = zoomFactor * (y - mouseY);
    width *= zoomFactor;
    height *= zoomFactor;

    n.graphNode.x = x;
    n.graphNode.y = y;
    n.graphNode.size[0] = width;
    n.graphNode.size[1] = height;
  }
  setLastZoomCenter({ x: mouseX, y: mouseY });
  setNodes(newNodes);
};
