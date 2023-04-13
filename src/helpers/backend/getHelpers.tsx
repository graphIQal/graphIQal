import { GraphViewContextInterface } from '../../pages/graph/context/GraphViewContext';
import {
  graphNodes,
  Node,
  nodesData,
  resources,
  VisualData,
} from '../../schemas/Data_structures/DS_schema';

//
export const getLineDataEndpoints = (
  context: GraphViewContextInterface | null,
  lineID: string
) => {
  const node1 = context?.lines[lineID as any].start;
  const data1 = context?.nodesVisual[node1 as any];

  const node2 = context?.lines[lineID as any].end;
  const data2 = context?.nodesVisual[node2 as any];

  return {
    x1: data1?.x,
    x2: data2?.x,
    y1: data1?.y,
    y2: data2?.y,
    node1: node1,
    node2: node2,
  };
};

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

//gets list of connectionsID's of a node
export const getNodeConnections = (
  context: GraphViewContextInterface | null,
  id: string
) => {
  return Object.keys(
    context?.allNodes[id].connections ? context?.allNodes[id].connections : {}
  );
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

export const getAllNodes = () => {
  return nodesData;
};

export const getLines = () => {
  return [];
};

export const isNodeCategorical = (
  allNodes: { [key: string]: Node },
  node: string
) => {
  return allNodes[node].categorical;
};
