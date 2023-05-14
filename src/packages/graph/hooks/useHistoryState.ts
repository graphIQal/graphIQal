/**
 * Hook for controlling history actions
 */

import { useContext, useEffect, useRef } from 'react';
import { GraphNodeData, LineRefs, NodeData } from '../graphTypes';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../context/GraphViewContext';

export type Action = {
  undo: {
    type: ActionChanges;
    id: string | number;
    value: any;
  };
  redo: {
    type: ActionChanges;
    id: string | number;
    value: any;
  };
};

export type ActionChanges =
  | 'NODE_ADD'
  | 'NODE_DELETE'
  | 'CONNECTION_ADD'
  | 'CONNECTION_DELETE'
  | 'CONNECTION_DIRECTION_ADD'
  | 'CONNECTION_TYPE'
  | 'CONNECTION_DIRECTION'
  | 'DRAG'
  | 'NODE_ICON'
  | 'NODE_COLOR'
  | 'NODE_TITLE'
  | 'SIZE';

export const useHistoryState = (
  nodeData_Graph: { [key: string]: NodeData }, //The data of the nodes that are shown on the screen
  setnodeData_Graph: any,
  nodeVisualData_Graph: { [key: string]: GraphNodeData },
  setnodeVisualData_Graph: any
) => {
  const history = useRef<Action[]>([]);
  const pointer = useRef<number>(-1);

  const addActionToStack = (action: Action) => {
    history.current = [
      ...history.current.slice(0, pointer.current + 1),
      action,
    ];
    pointer.current += 1;
  };

  const addAction = (id: string, type: ActionChanges, value: any) => {
    console.log('action ' + type + ' ' + JSON.stringify(value));
    addActionToStack({
      undo: { id: id, value: value, type: type },
      redo: { id: id, value: value, type: type },
    });
  };

  const undo = () => {
    if (pointer.current == -1) {
      return;
    }
    const { id, value, type } = history.current[pointer.current].undo;
    let newNodes = { ...nodeData_Graph };
    let newNodesVisual = { ...nodeVisualData_Graph };
    switch (type) {
      case 'SIZE':
        setnodeVisualData_Graph(
          (prevState: { [key: string]: GraphNodeData }) => {
            let newState = { ...prevState };
            newState[id].height = value.oldHeight;
            newState[id].width = value.oldWidth;
            return newState;
          }
        );

        break;
      case 'NODE_ADD':
        setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
          let newState = { ...prevState };
          delete newState[id];
          return newState;
        });
        setnodeVisualData_Graph(
          (prevState: { [key: string]: GraphNodeData }) => {
            let newState = { ...prevState };
            delete newState[id];
            return newState;
          }
        );

        break;
      case 'NODE_DELETE':
        setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
          let newState = { ...prevState };
          newState[id] = value.deletedNode;
          return newState;
        });
        setnodeVisualData_Graph(
          (prevState: { [key: string]: GraphNodeData }) => {
            let newState = { ...prevState };
            newState[id] = value.deletedVisualNode;
            return newState;
          }
        );
        break;
      case 'NODE_COLOR':
        setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
          let newState = { ...prevState };
          newState[id].color = value.oldColor;
          return newState;
        });
        break;
      case 'NODE_ICON':
        setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
          let newState = { ...prevState };
          newState[id].icon = value.oldIcon;
          return newState;
        });
        break;
      case 'CONNECTION_ADD':
        setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
          let newState = { ...prevState };
          delete newState[id].connections[value.endNode];
          return newState;
        });
        break;
      case 'CONNECTION_DELETE':
        setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
          let newState = { ...prevState };
          newState[id].connections[value.endNode] = value.connection;
          return newState;
        });
        break;

      case 'CONNECTION_TYPE':
        setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
          let newState = { ...prevState };
          newState[id].connections[value.endNode].type = value.oldType;
          return newState;
        });
        break;
      case 'CONNECTION_DIRECTION':
        setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
          let newState = { ...prevState };

          newState[value.endNode].connections[id] = value.oldConnection;
          delete newState[id].connections[value.endNode];

          return newState;
        });
        break;
      case 'DRAG':
        setnodeVisualData_Graph(
          (oldNodes: { [key: string]: GraphNodeData }) => {
            let newNodes = { ...oldNodes };
            newNodes[id].x = value.oldX;
            newNodes[id].y = value.oldY;
            return newNodes;
          }
        );
        break;
      case 'NODE_TITLE':
        setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
          let newState = { ...prevState };
          newState[id].title = value.oldTitle;
          return newState;
        });
        break;
    }

    pointer.current -= 1;
  };

  const redo = () => {
    if (pointer.current + 1 >= history.current.length) {
      return;
    }
    const { id, value, type } = history.current[pointer.current + 1].redo;
    let newNodes = { ...nodeData_Graph };
    let newVisualNodes = { ...nodeVisualData_Graph };
    switch (type) {
      case 'SIZE':
        setnodeVisualData_Graph(
          (prevState: { [key: string]: GraphNodeData }) => {
            let newState = { ...prevState };
            newState[id].height = value.height;
            newState[id].width = value.width;
            return newState;
          }
        );

        break;
      case 'NODE_ADD':
        setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
          let newState = { ...prevState };
          newState[id] = value.newNode;
          return newState;
        });
        setnodeVisualData_Graph(
          (prevState: { [key: string]: GraphNodeData }) => {
            let newState = { ...prevState };
            newState[id] = value.newVisualNode;
            return newState;
          }
        );
        break;
      case 'NODE_DELETE':
        setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
          let newState = { ...prevState };
          delete newState[id];
          return newState;
        });
        setnodeVisualData_Graph(
          (prevState: { [key: string]: GraphNodeData }) => {
            let newState = { ...prevState };
            delete newState[id];
            return newState;
          }
        );
        break;
      case 'NODE_COLOR':
        setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
          let newState = { ...prevState };
          newState[id].color = value.color;
          return newState;
        });
        break;
      case 'NODE_ICON':
        setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
          let newState = { ...prevState };
          newState[id].icon = value.icon;
          return newState;
        });
        break;
      case 'CONNECTION_ADD':
        setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
          let newState = { ...prevState };
          newState[id].connections[value.endNode] = value.connection;
          return newState;
        });
        break;

      case 'CONNECTION_DELETE':
        setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
          let newState = { ...prevState };
          delete newState[id].connections[value.endNode];
          return newState;
        });
        break;
      case 'CONNECTION_TYPE':
        setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
          let newState = { ...prevState };
          newState[id].connections[value.endNode].type = value.type;
          return newState;
        });
        break;
      //fix redo for arrow drawing
      case 'CONNECTION_DIRECTION':
        setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
          let newState = { ...prevState };
          if (newState[id].connections[value.endNode]) {
            newState[value.endNode].connections[id] = value.oldConnection;
            delete newState[id].connections[value.endNode];
          } else {
            newState[id].connections[value.endNode] = value.oldConnection;
            delete newState[value.endNode].connections[id];
          }

          return newState;
        });
        break;
      case 'DRAG':
        setnodeVisualData_Graph(
          (oldNodes: { [key: string]: GraphNodeData }) => {
            let newNodes = { ...oldNodes };
            newNodes[id].x = value.x;
            newNodes[id].y = value.y;
            return newNodes;
          }
        );
        break;
      case 'NODE_TITLE':
        setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
          let newState = { ...prevState };
          newState[id].title = value.title;
          return newState;
        });
        break;
    }

    // setnodeData_Graph(newNodes);
    // setnodeVisualData_Graph(newVisualNodes);
    pointer.current += 1;
  };

  return { undo, redo, addAction };
};
