import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';
import { NodeData, ConnectionData } from '../../packages/graph/graphTypes';
import { resources } from '../../schemas/Data_structures/DS_schema';

export const getLineEndpointData = (
  context: GraphViewContextInterface | null,
  lineID: string
) => {
  const nodes = lineID.split('_');
  const node1 = nodes[0];
  const data1 = context?.nodeVisualData_Graph[node1];

  const node2 = nodes[1];
  const data2 = context?.nodeVisualData_Graph[node2];

  return {
    x1: data1?.x,
    x2: data2?.x,
    y1: data1?.y,
    y2: data2?.y,
    node1: node1,
    node2: node2,
  };
};

//gets nodes that current node is "included" in as tags
export const getTags = (nodeData: { [key: string]: NodeData }) => {
  //each entry in array is a tag, where the key represents that node's ID and the value represents all the nodes on the screen that are connected to it
  //ordered by frequency of connection
  const to_return: { [key: string]: Set<string> }[] = [];

  // get list of connections where current node is "IN" other node, sorted by frequency

  /**
   * Does node data graph hold all connections or only the ones to nodes displayed?
   * Do they show bi-directionally? Is connection stored in both startnode and endnode or only one
   */

  return to_return;
};

export const isLineDirectional = (connection: ConnectionData) => {
  return (
    connection.type == 'IN' ||
    connection.type == 'DEPENDS_ON' ||
    connection.type == 'FOLLOWS'
  );
};

export const getConnectionType = (
  from: string,
  to: string,
  context: GraphViewContextInterface
) => {
  return context.nodeData_Graph[from].connections[to].type;
};

export const getIconAndColor = (
  viewContext: GraphViewContextInterface,
  node: string
) => {
  let categorizing_node =
    viewContext.nodeVisualData_Graph[node].categorizing_node;
  if (!categorizing_node) {
    categorizing_node = node;
  }
  return {
    icon: viewContext.nodeData_Graph[categorizing_node].icon,
    color: viewContext.nodeData_Graph[categorizing_node].color,
  };
};

//gets connection information from nodeInView -> currNode
export const getConnectionInfo = (
  nodeInView: string,
  currNode: string,
  context: GraphViewContextInterface | null
) => {
  let content = '';
  let queryNodes = context?.nodeData_Graph[nodeInView].connections;
  if (!queryNodes) return;
  if (queryNodes[currNode] == undefined) return '';
  let nodeContentToShow = queryNodes[currNode].content;
  let nodeData = context?.nodeData_Graph[currNode];
  //who does the content belong to?
  //It's stored in arraylist, but homework is trying to render it
  for (let item in nodeContentToShow) {
    let block = resources[nodeContentToShow[item]];
    content += block.content;
  }
  return content;
};
