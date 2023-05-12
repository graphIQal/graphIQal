import { useContext, useState } from 'react';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../context/GraphViewContext';

//gets vertical offset of canvas
export function useVerticalOffset() {
  const { graphViewId } = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;
  const element = document.getElementById('container' + graphViewId);
  if (!element) return 0;
  const offsetDifference =
    (element.offsetTop - element.scrollTop + element.clientTop) * -1;
  return offsetDifference;
}
