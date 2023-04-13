import { GraphViewContextInterface } from '../../pages/graph/GraphViewContext';
import {
  ConnectionData,
  graphNodes,
  Node,
  nodesData,
  resources,
  VisualData,
} from '../../schemas/Data_structures/DS_schema';

//get list of nodes to display as ConnectionData objects
export const getNodesToDisplay = (
  nodeInView: string,
  allNodes: { [key: string]: Node }
) => {
  return allNodes[nodeInView].connections;
};
//get list of nodes to display as GraphView objects
export const getNodesToDisplayGraph = (
  nodeInView: string,
  allNodes: { [key: string]: Node }
) => {
  let nodes = getNodesToDisplay(nodeInView, allNodes);
  let graphNodeVals: { [key: string]: VisualData } = {};
  for (let node in nodes) {
    graphNodeVals[node] = graphNodes[node];
  }

  return graphNodeVals;
};

//gets connection information from nodeInView -> currNode
export const getConnectionInfo = (
  nodeInView: string,
  currNode: string,
  context: GraphViewContextInterface | null
) => {
  let content = '';
  let queryNodes = context?.allNodes[nodeInView].connections;
  if (!queryNodes) return;
  if (queryNodes[currNode] == undefined) return '';
  let nodeContentToShow = queryNodes[currNode].content;
  let nodeData = context?.allNodes[currNode];
  //who does the content belong to?
  //It's stored in arraylist, but homework is trying to render it
  for (let item in nodeContentToShow) {
    let block = resources[nodeContentToShow[item]];
    content += block.content;
  }
  return content;
};

export const updateNodeAttribute = (
  nodeID: string,
  attribute: string,
  value: any,
  context: GraphViewContextInterface | null
) => {
  if (!context) return;
  context.allNodes[attribute] = value;
};

// export const updateNodeViewData = (
//   nodeID: string,
//   attribute: string,
//   value: any
// ) => {
//   graphNodes[attribute] = value;
//   let newNodes: any = {};
//   for (const node in nodesDisplayed) {
//     newNodes[node] = nodes[node];
//   }
// };
