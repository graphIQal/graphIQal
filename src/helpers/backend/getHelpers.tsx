import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';
import { LineRefs } from '../../packages/graph/graphTypes';
import {
  adts,
  algorithms,
  concepts,
  ConnectionData,
  dataStructures,
  dependencies,
  exams,
  graphNodes,
  homework,
  ids,
  Node,
  NodeData,
  nodesData,
  resources,
  study_categories,
  titles,
  topicIDs,
  VisualData,
} from '../../schemas/Data_structures/DS_schema';
import {
  calculateSizeX,
  calculateSizeY,
} from '../../schemas/Data_structures/helpers';

//
export const getLineDataEndpoints = (
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

//get list of nodes to display as ConnectionData objects
export const getNodesToDisplay = (
  nodeInView: string,
  allNodes: { [key: string]: Node }
) => {
  const to_return: { [key: string]: ConnectionData } = {};
  for (const node in allNodes[nodeInView].connections) {
    if (allNodes[nodeInView].connections[node].type != 'included') {
      to_return[node] = allNodes[nodeInView].connections[node];
    }
  }
  return to_return;
};

//get list of nodes to display as GraphView objects
export const getNodesToDisplayGraph = (
  nodeInView: string,
  allNodes: { [key: string]: Node },
  window: Window,
  document: Document
) => {
  let nodes = getNodesToDisplay(nodeInView, allNodes);
  let graphNodeVals: { [key: string]: VisualData } = {};
  for (let node in nodes) {
    graphNodeVals[node] = graphNodes[node];
    graphNodeVals[node].x = calculateSizeX(
      graphNodeVals[node].xCell,
      window,
      document
    );

    graphNodeVals[node].y = calculateSizeY(
      graphNodeVals[node].yCell,
      window,
      document
    );
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

export const getAllNodes = (data: any): { [key: string]: Node } => {
  // const nodesData: { [key: string]: Node } = {};
  // console.log('data');
  // console.log(data);
  // for (let node in data) {
  //   let nodeData = data[node].node.properties;
  //   nodesData[nodeData.id] = {
  //     id: nodeData.id,
  //     title: nodeData.title,
  //     blocks: [],
  //     connections: {},
  //   };
  // }
  // console.log('frontend data');
  // console.log(nodesData);
  const nodesData: { [key: string]: Node } = {};
  for (let node in ids) {
    nodesData[ids[node]] = {
      title: titles[ids[node]],
      id: ids[node],
      blocks: [],
      connections: {},
    };
  }
  //creating connections from hardcoded data

  for (let topic in topicIDs) {
    nodesData.course_topics.connections[topicIDs[topic]] = {
      content: [],
      type: 'includes',
    };
    nodesData[topicIDs[topic]].connections['course_topics'] = {
      content: [],
      type: 'included',
    };
  }

  //dependency connections
  //opening the view of a data structure shows what it depends on
  for (const dependency in dependencies) {
    const connections = dependencies[dependency];
    for (const connection in connections) {
      nodesData[dependency].connections[connections[connection]] = {
        content: [],
        type: 'dependency',
      };
      nodesData[connections[connection]].connections[dependency] = {
        content: [],
        type: 'dependency',
      };
    }
  }

  //hardcoding exam connections
  for (const exam in exams) {
    nodesData['exams'].connections[exam] = {
      content: [],
      type: 'includes',
    };
    nodesData[exam].connections['exams'] = {
      content: [],
      type: 'included',
    };
    const examTopics = (exams as any)[exam];
    for (const topic in examTopics) {
      nodesData[exam].connections[examTopics[topic]] = {
        content: [],
        type: 'includes',
      };
    }
  }

  //hardcoding categorical connections : data structures, adts, concepts, etc
  for (const structure in dataStructures) {
    nodesData[dataStructures[structure]].connections['data_structures'] = {
      content: [],
      type: 'included',
    };
    nodesData['data_structures'].connections[dataStructures[structure]] = {
      content: [],
      type: 'includes',
    };
  }
  for (const adt in adts) {
    nodesData[adts[adt]].connections['adts'] = {
      content: [],
      type: 'included',
    };
    nodesData['adts'].connections[adts[adt]] = {
      content: [],
      type: 'includes',
    };
  }
  for (const concept in concepts) {
    nodesData[concepts[concept]].connections['concepts'] = {
      content: [],
      type: 'included',
    };
    nodesData['concepts'].connections[concepts[concept]] = {
      content: [],
      type: 'includes',
    };
  }
  for (const algo in algorithms) {
    nodesData[algorithms[algo]].connections['algorithms'] = {
      content: [],
      type: 'included',
    };
    nodesData['algorithms'].connections[algorithms[algo]] = {
      content: [],
      type: 'includes',
    };
  }

  for (const category in study_categories) {
    nodesData['study_categories'].connections[study_categories[category]] = {
      content: [],
      type: 'includes',
    };
    nodesData[study_categories[category]].connections['study_categories'] = {
      content: [],
      type: 'included',
    };
  }

  //adding connections to all topics from each study category -> will later be populated with the resources as content
  for (const hw in homework) {
    nodesData[homework[hw]].connections['homework'] = {
      content: [],
      type: 'included',
    };
    nodesData['homework'].connections[homework[hw]] = {
      content: [],
      type: 'includes',
    };
  }
  for (const topic in topicIDs) {
    nodesData[topicIDs[topic]].connections['content_learning'] = {
      content: [],
      type: 'included',
    };
    nodesData['content_learning'].connections[topicIDs[topic]] = {
      content: [],
      type: 'includes',
    };

    nodesData[topicIDs[topic]].connections['exam_prep'] = {
      content: [],
      type: 'included',
    };
    nodesData['exam_prep'].connections[topicIDs[topic]] = {
      content: [],
      type: 'includes',
    };

    nodesData[topicIDs[topic]].connections['recitation'] = {
      content: [],
      type: 'included',
    };
    nodesData['recitation'].connections[topicIDs[topic]] = {
      content: [],
      type: 'includes',
    };

    nodesData[topicIDs[topic]].connections['further_reading'] = {
      content: [],
      type: 'included',
    };
    nodesData['further_reading'].connections[topicIDs[topic]] = {
      content: [],
      type: 'includes',
    };
  }

  return nodesData;
};

export const getLines = (nodesToDisplay: { [key: string]: NodeData }) => {
  let lines: LineRefs[] = [];
  for (const node in nodesToDisplay) {
    const connections = nodesData[node].connections;
    for (const connection in connections) {
      if (Object.keys(nodesToDisplay).includes(connection)) {
        lines.push({
          start: connection,
          end: node,
          arrowStart: connection,
        });
      }
    }
  }

  return [];
};

export const isNodeCategorical = (
  allNodes: { [key: string]: Node },
  node: string
) => {
  return allNodes[node].categorical;
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

export const getNodeTitle = (node: string) => {
  return titles[node];
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
