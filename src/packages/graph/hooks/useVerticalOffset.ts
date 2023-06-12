import { useContext, useState } from 'react';
import { useGraphViewData } from '../context/GraphViewContext';

//gets vertical offset of canvas
export function useVerticalOffset() {
  const { graphViewId } = useGraphViewData();
  const element = document.getElementById('container' + graphViewId);
  if (!element) return 0;
  const offsetDifference =
    (element.offsetTop - element.scrollTop + element.clientTop) * -1;
  return offsetDifference;
}
