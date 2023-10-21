/**
 * Hook for controlling history actions
 */

import { createGraphNode } from '@/backend/functions/graph/mutate/createGraphNode';
import { deleteGraphNode } from '@/backend/functions/graph/mutate/deleteGraphNode';
import { updateGraphNode } from '@/backend/functions/graph/mutate/updateGraphNode';
import { createConnection } from '@/backend/functions/node/mutate/createConnection';
import { deleteConnectionAPI } from '@/backend/functions/node/mutate/deleteConnection';
import { deleteDetachNode } from '@/backend/functions/node/mutate/deleteDetachNode';
import { reverseConnection } from '@/backend/functions/node/mutate/reverseConnection';
import { changeConnectionType } from '@/backend/functions/node/mutate/updateConnectionType';
import { updateNode } from '@/backend/functions/node/mutate/updateNode';
import { MutableRefObject, useRef } from 'react';
import { KeyedMutator } from 'swr';
import { GraphNodeData, NodeData } from '../graphTypes';

export type Action = {
  type: ActionChanges;
  id: string;
  value: any;
};

export type ActionChanges =
  | 'NODE_ADD'
  | 'NODE_ADD_EXISTING'
  | 'NODE_DELETE'
  | 'CONNECTION_ADD'
  | 'CONNECTION_DELETE'
  | 'CONNECTION_DIRECTION_ADD'
  | 'CONNECTION_TYPE'
  | 'CONNECTION_DIRECTION'
  | 'DRAG'
  | 'NODE_ICON'
  | 'NODE_COLOR'
  //not done
  | 'NODE_TITLE'
  | 'NODE_SIZE';

export type History_Graph = React.MutableRefObject<{
  undos: Action[];
  redos: Action[];
}>;

type historyStateInput = {
  changeNodeData_Graph: any;
  changeVisualData_Graph: any;
  changeAlert: (val: string) => void;
  nodeDataRef: MutableRefObject<{ [key: string]: NodeData }>;
  visualDataRef: MutableRefObject<{ [key: string]: GraphNodeData }>;
  mutateGraphData: KeyedMutator<any>;
  graphViewId: string;
};

export const useHistoryState = ({
  changeNodeData_Graph,
  changeVisualData_Graph,
  changeAlert,
  nodeDataRef,
  visualDataRef,
  mutateGraphData,
  graphViewId,
}: historyStateInput) => {
  const history = useRef<{ undos: Action[]; redos: Action[] }>({
    undos: [],
    redos: [],
  });

  const addActionToStack = (action: Action) => {
    history.current.undos = [...history.current.undos, action];

    history.current.redos = [];
  };

  const applyAction = (action: Action) => {
    const { id, type, value } = action;
    const nodeData_Graph = nodeDataRef.current;
    const nodeVisualData_Graph = visualDataRef.current;

    let newState: any;
    let newNodeData: any;
    let newGraphData: any;

    console.log(action);
    console.log(nodeData_Graph);
    console.log(nodeVisualData_Graph);

    switch (type) {
      case 'NODE_SIZE':
        mutateGraphData(
          updateGraphNode({
            nodeId: id,
            nodeVisualData: {
              x: value.new.x,
              y: value.new.y,
              height: value.new.height,
              width: value.new.width,
            },
            graphViewId,
          }),
          {
            optimisticData: (data: any) => {
              newState = { ...nodeData_Graph };
              newState[id].height = value.new.height;
              newState[id].width = value.new.width;
              newState[id].x = value.new.x;
              newState[id].y = value.new.y;
              changeVisualData_Graph(newState);

              return {
                nodeData: data.nodeData,
                visualData: newState,
              };
            },
            populateCache: false,
            revalidate: true,
          }
        );

        break;

      case 'NODE_ADD':
        let { nodeId, newNode, newNodeVisualData } = value;

        console.log('newNode: ', newNode);
        newNodeData = { ...nodeData_Graph };
        newNodeData[id] = newNode;
        changeNodeData_Graph(newNodeData);

        newGraphData = { ...nodeVisualData_Graph };
        newGraphData[id] = newNodeVisualData;
        changeVisualData_Graph(newGraphData);

        changeAlert('Created new node');

        // mutate('username/$nodeid/$graphviewId, )
        mutateGraphData(
          // backend -> server
          createGraphNode({
            id,
            nodeId,
            nodeVisualData: newGraphData[id],
            graphViewId,
          }),
          // frontend
          {
            optimisticData: {
              nodeData: newNodeData,
              visualData: newGraphData,
            },
            populateCache: false,
            revalidate: true,
          }
        );

        // mutate(`api/username/${id}`, {
        // 	optimisticData: {
        // 		n: { icon: 'node', title: 'Untitled', color: 'black' },
        // 		connectedNodes: [],
        // 	},
        // 	revalidate: true,
        // });

        break;
      case 'NODE_ADD_EXISTING':
        newNodeData = { ...nodeData_Graph };
        newNodeData[value.newNode.id] = value.newNode;

        newGraphData = { ...nodeVisualData_Graph };
        const defaultVisualData = {
          x: 50,
          y: 50,
          width: 200,
          height: 100,
          categorizing_node: value.newNode.id,
        };

        newGraphData[value.newNode.id] = defaultVisualData;
        changeNodeData_Graph(newNodeData);
        changeVisualData_Graph(newGraphData);

        changeAlert('Added node: ' + value.newNode.title);

        mutateGraphData(
          updateGraphNode({
            nodeId: value.newNode.id,
            nodeVisualData: defaultVisualData,
            graphViewId,
          }),
          {
            optimisticData: {
              visualData: newGraphData,
              nodeData: newNodeData,
            },
            populateCache: false,
            revalidate: true,
          }
        );

        break;

      case 'NODE_DELETE':
        changeAlert('Removed node: ' + nodeData_Graph[id].title);

        mutateGraphData(
          deleteGraphNode({
            nodeId: id,
            graphViewId,
          }),
          {
            optimisticData: () => {
              newNodeData = { ...nodeData_Graph };
              newGraphData = { ...nodeVisualData_Graph };

              delete newNodeData[id];
              delete newGraphData[id];

              changeNodeData_Graph(newNodeData);
              changeVisualData_Graph(newGraphData);

              return {
                nodeData: newNodeData,
                visualData: newGraphData,
              };
            },
            populateCache: false,
            revalidate: true,
          }
        );

        break;

      case 'NODE_COLOR':
        mutateGraphData(
          updateNode({
            nodeId: id,
            nodeData: { color: value.new.color },
          }),
          {
            optimisticData: (data: any) => {
              newNodeData = { ...nodeData_Graph };
              newNodeData[id].color = value.new.color;

              changeNodeData_Graph({ ...newNodeData });

              return {
                nodeData: newNodeData,
                visualData: data.visualData,
              };
            },
            populateCache: false,
            revalidate: true,
          }
        );
        break;

      case 'NODE_ICON':
        mutateGraphData(
          updateNode({
            nodeId: id,
            nodeData: { icon: value.new.icon },
          }),
          {
            optimisticData: (data: any) => {
              newNodeData = { ...nodeData_Graph };
              newNodeData[id].icon = value.new.icon;

              changeNodeData_Graph({ ...newNodeData });

              return {
                nodeData: newNodeData,
                visualData: data.visualData,
              };
            },
            populateCache: false,
            revalidate: true,
          }
        );
        break;
      case 'CONNECTION_ADD':
        mutateGraphData(
          createConnection({
            startNode: value.startNode,
            endNode: value.endNode,
            type: 'RELATED',
          }),
          {
            optimisticData: (data: any) => {
              let newnodeData_Graph = { ...data.nodeData };

              newnodeData_Graph[value.startNode].connections[value.endNode] = {
                startNode: value.startNode,
                endNode: value.endNode,
                content: [],
                type: 'RELATED',
              };

              changeAlert(
                'Connection of type RELATED added between ' +
                  newnodeData_Graph[value.startNode].title +
                  ' and ' +
                  newnodeData_Graph[value.endNode].title
              );

              return {
                nodeData: newnodeData_Graph,
                visualData: data.visualData,
              };
            },
            populateCache: false,
            revalidate: true,
          }
        );

        break;
      case 'CONNECTION_DELETE':
        changeAlert(
          'Deleted connection from ' +
            nodeData_Graph[value.startNode].title +
            ' to ' +
            nodeData_Graph[value.endNode].title
        );

        let newNodes = { ...nodeData_Graph };

        const type = newNodes[value.startNode].connections[value.endNode].type;

        delete newNodes[value.startNode].connections[value.endNode];
        delete newNodes[value.endNode].connections[value.startNode];

        // changeNodeData_Graph(newNodes);

        mutateGraphData(
          deleteConnectionAPI({
            startNode: value.startNode,
            endNode: value.endNode,
            type,
          }),
          {
            optimisticData: (data: any) => ({
              nodeData: newNodes,
              visualData: data.visualData,
            }),
            populateCache: false,
            revalidate: true,
          }
        );

        break;
      case 'CONNECTION_TYPE':
        changeAlert(
          'Changed connection type of ' +
            nodeData_Graph[value.startNode].title +
            ' to ' +
            nodeData_Graph[value.endNode].title +
            ' from ' +
            value.old.type +
            ' to ' +
            value.new.type
        );

        newNodeData = { ...nodeData_Graph };

        newNodeData[value.startNode].connections[value.endNode].type =
          value.new.type;

        changeNodeData_Graph(newNodeData);

        mutateGraphData(
          changeConnectionType({
            startNode: value.startNode,
            endNode: value.endNode,
            oldType: value.old.type,
            newType: value.new.type,
          }),
          {
            optimisticData: (data: any) => ({
              nodeData: newNodeData,
              ...data,
            }),
            populateCache: false,
            revalidate: true,
          }
        );
        break;

      case 'CONNECTION_DIRECTION':
        newNodeData = { ...nodeData_Graph };
        newNodeData[value.originalEndNode].connections[
          value.originalStartNode
        ] = value.newConnection;

        delete newNodeData[value.originalStartNode].connections[
          value.originalEndNode
        ];

        // I don't know why if I delete this it takes one re-render or action for the reverse to show.
        changeNodeData_Graph(newNodeData);

        mutateGraphData(
          reverseConnection({
            startNode: value.originalStartNode,
            endNode: value.originalEndNode,
            type: value.type,
          }),
          {
            optimisticData: (data: any) => ({
              nodeData: newNodeData,
              visualData: data.visualData,
            }),
            populateCache: false,
            revalidate: true,
          }
        );

        break;
      case 'DRAG':
        newState = { ...nodeVisualData_Graph };
        newState[id].x = value.new.x;
        newState[id].y = value.new.y;

        changeVisualData_Graph(newState);

        mutateGraphData(
          updateGraphNode({
            nodeId: id,
            nodeVisualData: { x: value.new.x, y: value.new.y },
            graphViewId,
          }),
          {
            optimisticData: (data: any) => ({
              nodeData: data.nodeData,
              visualData: newState,
            }),
            populateCache: false,
            revalidate: true,
          }
        );
        break;
    }
  };

  const addAction = (id: string, type: ActionChanges, value: any) => {
    // just directly fetch it.
    // This won't cache the change though.

    applyAction({
      id: id,
      value: value,
      type: type,
    });

    addActionToStack({
      id: id,
      value: value,
      type: type,
    });
  };

  const undo = () => {
    const nodeData_Graph = nodeDataRef.current;
    const nodeVisualData_Graph = visualDataRef.current;
    let newState: any;
    let newNodeData: any;
    let newVisualData: any;

    if (history.current.undos.length < 1) return;

    const { id, value, type } =
      history.current.undos[history.current.undos.length - 1];

    history.current.undos.pop();
    history.current.redos.push({ id, value, type });

    switch (type) {
      case 'NODE_SIZE':
        // Just directly mutate here
        mutateGraphData(
          updateGraphNode({
            nodeId: id,
            nodeVisualData: {
              x: value.old.x,
              y: value.old.y,
              height: value.old.height,
              width: value.old.width,
            },
            graphViewId,
          }),
          {
            optimisticData: (data: any) => {
              newState = { ...nodeVisualData_Graph };
              newState[id].height = value.old.height;
              newState[id].width = value.old.width;
              newState[id].x = value.old.x;
              newState[id].y = value.old.y;
              changeVisualData_Graph(newState);

              return {
                nodeData: data.nodeData,
                visualData: newState,
              };
            },
            populateCache: false,
            revalidate: true,
          }
        );

        break;
      case 'NODE_ADD':
        newNodeData = { ...nodeData_Graph };
        delete newNodeData[id];
        changeNodeData_Graph(newNodeData);
        newVisualData = { ...nodeVisualData_Graph };
        delete newVisualData[id];
        changeVisualData_Graph(newVisualData);

        changeAlert('Undo create');

        mutateGraphData(
          deleteDetachNode({
            nodeId: id,
          }),
          {
            optimisticData: {
              nodeData: newNodeData,
              visualData: newVisualData,
            },
            populateCache: false,
            revalidate: true,
          }
        );

        break;
      case 'NODE_ADD_EXISTING':
        newNodeData = { ...nodeData_Graph };
        delete newNodeData[id];
        changeNodeData_Graph(newNodeData);

        newVisualData = { ...nodeVisualData_Graph };
        delete newVisualData[id];
        changeVisualData_Graph(newVisualData);

        mutateGraphData(
          deleteGraphNode({
            nodeId: value.newNode.id,
            graphViewId,
          }),
          {
            optimisticData: {
              nodeData: newNodeData,
              visualData: newVisualData,
            },
            populateCache: false,
            revalidate: true,
          }
        );

        break;

      case 'NODE_DELETE':
        newNodeData = { ...nodeData_Graph };
        newNodeData[id] = value.deletedNode;
        changeNodeData_Graph(newNodeData);

        newVisualData = { ...nodeVisualData_Graph };
        newVisualData[id] = value.deletedVisualNode;
        changeVisualData_Graph(newVisualData);

        mutateGraphData(
          // because we're not deleting the node, the backend equivalent is connecting an existing node back
          updateGraphNode({
            nodeId: id,
            nodeVisualData: value.deletedVisualNode as GraphNodeData,
            graphViewId,
          }),
          {
            optimisticData: {
              nodeData: newNodeData,
              visualData: newVisualData,
            },
            populateCache: false,
            revalidate: true,
          }
        );

        break;
      case 'NODE_COLOR':
        mutateGraphData(
          updateNode({
            nodeId: id,
            nodeData: { color: value.old.color },
          }),
          {
            optimisticData: (data: any) => {
              newNodeData = { ...nodeData_Graph };
              newNodeData[id].color = value.old.color;

              changeNodeData_Graph({ ...newNodeData });

              return {
                nodeData: newNodeData,
                visualData: data.visualData,
              };
            },
            populateCache: false,
            revalidate: true,
          }
        );
        break;
      case 'NODE_ICON':
        mutateGraphData(
          updateNode({
            nodeId: id,
            nodeData: { icon: value.old.icon },
          }),
          {
            optimisticData: (data: any) => {
              newNodeData = { ...nodeData_Graph };
              newNodeData[id].icon = value.old.icon;

              changeNodeData_Graph({ ...newNodeData });

              return {
                nodeData: newNodeData,
                visualData: data.visualData,
              };
            },
            populateCache: false,
            revalidate: true,
          }
        );
        break;
      case 'CONNECTION_ADD':
        newNodeData = { ...nodeData_Graph };
        delete newNodeData[id].connections[value.endNode];
        changeNodeData_Graph(newNodeData);

        mutateGraphData(
          deleteConnectionAPI({
            startNode: value.startNode,
            endNode: value.endNode,
            type: 'RELATED',
          }),
          {
            optimisticData: (data: any) => ({
              nodeData: newNodeData,
              visualData: data.visualData,
            }),
            populateCache: false,
            revalidate: true,
          }
        );

        break;
      case 'CONNECTION_DELETE':
        mutateGraphData(
          createConnection({
            startNode: value.startNode,
            endNode: value.endNode,
            type: value.connection.type,
            content: value.connection.content,
          }),
          {
            optimisticData: (data: any) => {
              let newnodeData_Graph = { ...data.nodeData };

              newnodeData_Graph[value.startNode].connections[value.endNode] = {
                startNode: value.startNode,
                endNode: value.endNode,
                content: value.connection.content,
                type: value.connection.type,
              };

              changeAlert(
                'Connection of type RELATED added between ' +
                  newnodeData_Graph[value.startNode].title +
                  ' and ' +
                  newnodeData_Graph[value.endNode].title
              );

              return {
                nodeData: newnodeData_Graph,
                visualData: data.visualData,
              };
            },
            populateCache: false,
            revalidate: true,
          }
        );

        break;

      case 'CONNECTION_TYPE':
        newNodeData = { ...nodeData_Graph };

        newNodeData[value.startNode].connections[value.endNode].type =
          value.old.type;

        changeNodeData_Graph(newNodeData);

        mutateGraphData(
          changeConnectionType({
            startNode: value.startNode,
            endNode: value.endNode,
            oldType: value.new.type,
            newType: value.old.type,
          }),
          {
            optimisticData: (data: any) => ({
              nodeData: newNodeData,
              ...data,
            }),
            populateCache: false,
            revalidate: true,
          }
        );
        break;

      case 'CONNECTION_DIRECTION':
        newNodeData = { ...nodeData_Graph };
        newNodeData[value.originalStartNode].connections[
          value.originalEndNode
        ] = value.oldConnection;

        delete newNodeData[value.originalEndNode].connections[
          value.originalStartNode
        ];

        // I don't know why if I delete this it takes one re-render or action for the reverse to show.
        changeNodeData_Graph(newNodeData);

        mutateGraphData(
          reverseConnection({
            startNode: value.originalEndNode,
            endNode: value.originalStartNode,
            type: value.type,
          }),
          {
            optimisticData: (data: any) => ({
              nodeData: newNodeData,
              visualData: data.visualData,
            }),
            populateCache: false,
            revalidate: true,
          }
        );
        break;
      case 'DRAG':
        newState = { ...nodeVisualData_Graph };
        newState[id].x = value.old.x;
        newState[id].y = value.old.y;

        changeVisualData_Graph(newState);

        mutateGraphData(
          updateGraphNode({
            nodeId: id,
            nodeVisualData: { x: value.old.x, y: value.old.y },
            graphViewId,
          }),
          {
            optimisticData: (data: any) => ({
              nodeData: data.nodeData,
              visualData: newState,
            }),
            populateCache: false,
            revalidate: true,
          }
        );
        break;
    }
  };

  const redo = () => {
    if (history.current.redos.length < 1) return;

    const { id, value, type } =
      history.current.redos[history.current.redos.length - 1];

    history.current.redos.pop();
    history.current.undos.push({ id, value, type });
    applyAction({ id, type, value });
  };

  return { undo, redo, addAction, history };
};
