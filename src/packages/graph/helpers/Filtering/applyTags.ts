import { GraphViewContextInterface } from '../../context/GraphViewContext';

export const applyTags = (viewContext: GraphViewContextInterface) => {
  let visualDataNew = { ...viewContext.nodeVisualData_Graph };
  for (let node in viewContext.nodeVisualData_Graph) {
    for (let tag in viewContext.tags) {
      if (node in viewContext.tags[tag]) {
        visualDataNew[node].categorizing_node = tag;
        break;
      }
    }
  }

  viewContext.setnodeVisualData_Graph(visualDataNew);
};
