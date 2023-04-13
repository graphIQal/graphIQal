/**
 * Hooks for zooming (unimplemented)
 */

import { useState } from 'react';

export const useZoom = () => {
  const [zoomFactor, setZoomFactor] = useState(1);
  const theta = 0.1;
  const [lastZoomCenter, setLastZoomCenter] = useState(null);
  const [pointersDown, setPointersDown] = useState<PointerEvent[]>([]);

  // useEffect(() => {
  //   document.addEventListener('pointerdown', (event: PointerEvent) =>
  //     onPointDown(event)
  //   );
  //   document.addEventListener('pointermove', (event: PointerEvent) =>
  //     onPointMove(event)
  //   );
  //   document.addEventListener('pointerup', (event: PointerEvent) =>
  //     pointerUp(event)
  //   );
  //   document.addEventListener('pointercancel', (event: PointerEvent) =>
  //     pointerUp(event)
  //   );
  //   document.addEventListener('pointerout', (event: PointerEvent) =>
  //     pointerUp(event)
  //   );
  //   document.addEventListener('pointerleave', (event: PointerEvent) =>
  //     pointerUp(event)
  //   );
  // }, []);
};
