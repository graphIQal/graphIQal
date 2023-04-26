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
  // translateX: number,
  // translateY: number
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

export const getAllNodes = (): { [key: string]: Node } => {
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

  //connecting to homenode
  for (let node in ids) {
    if (ids[node] == 'homenode') {
      continue;
    }

    nodesData.homenode.connections[ids[node]] = {
      content: [],
      type: 'includes',
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

export const getLines = () => {
  let lines: LineRefs[] = [];
  const nodes = getAllNodes();
  for (const node in nodes) {
    if (node == 'homenode') continue;
    const connections = nodes[node].connections;
    for (let connection in connections) {
      if (
        connections[connection].type == 'includes' ||
        connections[connection].type == 'dependency'
      ) {
        lines.push({
          start: connection,
          end: node,
          arrowStart: connection,
        });
      }
    }
  }

  // return lines;
  return [];
};

export const isNodeCategorical = (
  allNodes: { [key: string]: Node },
  node: string
) => {
  return allNodes[node].categorical;
};

//gets nodes that current node is "included" in as tags
export const getNodeTags = (
  nodeInView: string,
  allNodes: { [key: string]: Node }
) => {
  const to_return: { [key: string]: ConnectionData } = {};
  for (const node in allNodes[nodeInView].connections) {
    if (allNodes[nodeInView].connections[node].type == 'included') {
      to_return[node] = allNodes[nodeInView].connections[node];
    }
  }

  return to_return;
};

export const getNodeTitle = (node: string) => {
  return titles[node];
};
