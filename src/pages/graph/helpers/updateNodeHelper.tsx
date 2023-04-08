import {
  ConnectionData,
  graphNodes,
  nodesData,
} from '../../../schemas/Data_structures/DS_schema';
import { GraphContextInterface } from '../GraphContext';

export type Update = 'resize' | 'drag';

export const updateNode = (
  type: Update,
  newVal: any,
  nodeID: string | number,
  context: GraphContextInterface | null
) => {
  console.log('type ' + type);
  switch (type) {
    case 'drag':
      graphNodes[nodeID].x = newVal.x;
      graphNodes[nodeID].y = newVal.y;
      context?.setNodesVisual({ ...graphNodes });
      break;
    case 'resize':
      const newSize = [newVal.width, newVal.height];
      console.log('here 2 ' + newSize);
      if (newVal.tag === 'top') {
        const val =
          graphNodes[nodeID].y + graphNodes[nodeID].size[1] - newSize[1];
        if (Number.isFinite(val)) {
          graphNodes[nodeID].y = val;
        }
      }
      if (newVal.tag === 'left') {
        const val =
          graphNodes[nodeID].x + graphNodes[nodeID].size[0] - newSize[0];
        if (Number.isFinite(val)) graphNodes[nodeID].x = newVal;
      }
      graphNodes[nodeID].size = newSize;

      console.log('new val ' + JSON.stringify(newVal));
      console.log('after resize ' + JSON.stringify(graphNodes));
      context?.setNodesVisual({ ...graphNodes });
      break;
  }
};
