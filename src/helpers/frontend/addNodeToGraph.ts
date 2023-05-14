import { ViewContextInterface } from '../../components/context/ViewContext';
import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';
import { GraphNodeData, NodeData } from '../../packages/graph/graphTypes';
import { VisualData } from '../../schemas/Data_structures/DS_schema';

export const addNodeToGraph = (
  id: string,
  context: GraphViewContextInterface
) => {
  const node: NodeData = {
    //node is the node that you get from the database with the given ID
    id: id,
    title: 'New Node',
    color: 'black',
    icon: 'block',
    connections: {},
  };
  const visualNode: GraphNodeData = {
    width: 200,
    height: 100,
    x: 200,
    y: 200,
    categorizing_node: id,
    collapsed: true,
  };

  const newNodes = { ...context.nodeData_Graph };
  newNodes[id] = node;
  const newVisualNodes = { ...context.nodeVisualData_Graph };
  newVisualNodes[id] = visualNode;

  context.setnodeData_Graph(newNodes);
  context.setnodeVisualData_Graph(newVisualNodes);
};
