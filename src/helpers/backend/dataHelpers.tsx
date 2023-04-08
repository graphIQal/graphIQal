import {
  ConnectionData,
  graphNodes,
  nodesData,
  resources,
} from '../../schemas/Data_structures/DS_schema';

//get list of nodes to display as ConnectionData objects
export const getNodesToDisplay = (nodeInView: string) => {
  return nodesData[nodeInView].connections;
};

//gets connection information from nodeInView -> currNode
export const getConnectionInfo = (nodeInView: string, currNode: string) => {
  let content = '';
  let queryNodes = nodesData[nodeInView].connections;
  if (queryNodes[currNode] == undefined) return '';
  let nodeContentToShow = queryNodes[currNode].content;
  let nodeData = nodesData[currNode];
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
  value: any
) => {
  nodesData[attribute] = value;
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
