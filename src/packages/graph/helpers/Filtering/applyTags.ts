import { GraphViewContextInterface } from '../../context/GraphViewContext';

export const applyTags = (viewContext: GraphViewContextInterface) => {
  let visualDataNew = { ...viewContext.nodeVisualData_Graph };
  // for (let node in viewContext.nodeVisualData_Graph) {
  //   for (let tag in viewContext.tags) {
  //     if (node in viewContext.tags[tag]) {
  //       visualDataNew[node].categorizing_node = tag;
  //       break;
  //     }
  //   }
  // }

  //for each tag, look through and find connected nodes
  let assigned: Set<string> = new Set();
  for (let tag in viewContext.tags) {
    for (let connection in viewContext.tags[tag].connections) {
      if (connection in viewContext.nodeData_Graph) {
        if (!assigned.has(connection)) {
          assigned.add(connection);
          visualDataNew[connection].categorizing_node =
            viewContext.tags[tag].id;
        }
      }
    }
  }

  viewContext.setnodeVisualData_Graph(visualDataNew);
};
