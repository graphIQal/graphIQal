import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';

type LineUpdate = 'arrowAdd' | 'type' | 'reverse';

export const updateConnection = (
  context: GraphViewContextInterface | null,
  type: LineUpdate,
  lineID: string | number,
  newVal: any
) => {
  const { nodeData_Graph, setnodeData_Graph } =
    context as GraphViewContextInterface;
  let newData = { ...nodeData_Graph };
  switch (type) {
    case 'arrowAdd':
      newData[newVal.arrowStart].connections[newVal.arrowEnd] = {
        ...newData[newVal.arrowEnd].connections[newVal.arrowStart],
        startNode: newVal.arrowStart,
        endNode: newVal.arrowEnd,
        type: 'IN',
      };
      delete newData[newVal.arrowEnd].connections[newVal.arrowStart];

      context?.setnodeData_Graph(newData);
      break;
    case 'type':
      const start = newVal.start;
      const end = newVal.end;
      const newType = newVal.newType;
      const newNodes = { ...nodeData_Graph };
      if (newNodes[start].connections[end].type == newType) return;
      newNodes[start].connections[end].type = newType;
      if (newNodes[end].connections[start]) {
        newNodes[end].connections[start].type = newType;
      }
      console.log('set connection ' + newNodes[start].connections[end].type);

      context?.setnodeData_Graph(newNodes);
      break;
    case 'reverse':
      newData = { ...nodeData_Graph };
      newData[newVal.arrowStart].connections[newVal.arrowEnd] = {
        ...newData[newVal.arrowEnd].connections[newVal.arrowStart],
        startNode: newVal.arrowStart,
        endNode: newVal.arrowEnd,
      };
      delete newData[newVal.arrowEnd].connections[newVal.arrowStart];

      context?.setnodeData_Graph(newData);
  }
};
