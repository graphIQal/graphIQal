/**
 * Hook for controlling history actions
 */

import {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { GraphNodeData, LineRefs, NodeData } from '../graphTypes';

export type Action = {
  type: ActionChanges;
  id: string | number;
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

export const useHistoryState = (
  setnodeData_Graph: any,
  setnodeVisualData_Graph: any,
  setAlert: (val: string) => void,
  nodeRef: MutableRefObject<{ [key: string]: NodeData }>,
  visualRef: MutableRefObject<{ [key: string]: GraphNodeData }>
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

  const addAction = (
    id: string,
    type: ActionChanges,
    value: { old: any; new: any }
  ) => {
    addActionToStack({
      id: id,
      value: value,
      type: type,
    });
  };

  const undo = () => {
    const nodeData_Graph = nodeRef.current;
    const nodeVisualData_Graph = visualRef.current;
    let newState: any;
    setAlert('');
    if (pointer.current == -1) {
      return;
    }
    const { id, value, type } = history.current[pointer.current];

    switch (type) {
      case 'NODE_SIZE':
        newState = { ...nodeVisualData_Graph };
        newState[id].height = value.old.height;
        newState[id].width = value.old.width;
        newState[id].x = value.old.x;
        newState[id].y = value.old.y;
        setnodeVisualData_Graph(newState);

        alert('');

        break;
      case 'NODE_ADD':
        newState = { ...nodeData_Graph };
        delete newState[id];
        setnodeData_Graph(newState);
        let newVisualState = { ...nodeVisualData_Graph };
        delete newVisualState[id];
        setnodeVisualData_Graph(newVisualState);

        break;
      case 'NODE_ADD_EXISTING':
        newState = { ...nodeData_Graph };
        if (value.old.node_data) {
          newState[value.old.node_data.id] = value.old.node_data;
        }
        delete newState[id];
        setnodeData_Graph(newState);
        newState = { ...nodeVisualData_Graph };
        if (value.old.node_data)
          newState[value.old.node_data.id] = value.old.node_visual;
        delete newState[id];
        setnodeVisualData_Graph(newState);
        break;

      case 'NODE_DELETE':
        newState = { ...nodeData_Graph };
        newState[id] = value.deletedNode;
        setnodeData_Graph(newState);
        newState = { ...nodeVisualData_Graph };
        newState[id] = value.deletedVisualNode;
        setnodeVisualData_Graph(newState);
        break;
      case 'NODE_COLOR':
        newState = { ...nodeData_Graph };
        newState[id].color = value.old.color;
        setnodeData_Graph(newState);
        break;
      case 'NODE_ICON':
        newState = { ...nodeData_Graph };
        newState[id].icon = value.old.icon;
        setnodeData_Graph(newState);
        break;
      case 'CONNECTION_ADD':
        newState = { ...nodeData_Graph };
        delete newState[id].connections[value.endNode];
        setnodeData_Graph(newState);
        break;
      case 'CONNECTION_DELETE':
        newState = { ...nodeData_Graph };
        newState[id].connections[value.endNode] = value.connection;
        setnodeData_Graph(nodeData_Graph);
        break;

      case 'CONNECTION_TYPE':
        newState = { ...nodeData_Graph };
        newState[id].connections[value.endNode].type = value.old.type;
        setnodeData_Graph(newState);
        break;
      case 'CONNECTION_DIRECTION':
        newState = { ...nodeData_Graph };
        newState[value.endNode].connections[id] = value.oldConnection;
        setnodeData_Graph(newState);
        break;
      case 'DRAG':
        newState = { ...nodeVisualData_Graph };
        newState[id].x = value.old.x;
        newState[id].y = value.old.y;
        setnodeVisualData_Graph(newState);
        break;
      case 'NODE_TITLE':
        // let undoOps = 0;
        // for (let i = history.current.length - 1; i > 0; --i) {
        //   if (history.current[i].type == 'NODE_TITLE' && undoOps < 5) {
        //     undoOps += 1;
        //   } else {
        //     break;
        //   }
        // }
        // pointer.current -= undoOps;
        newState = { ...nodeData_Graph };
        newState[id].title = value.oldTitle;
        setnodeData_Graph(newState);
        break;
    }

    pointer.current -= 1;
  };

  const redo = () => {
    const nodeData_Graph = nodeRef.current;
    const nodeVisualData_Graph = visualRef.current;
    if (pointer.current + 1 >= history.current.length) {
      return;
    }
    const { id, value, type } = history.current[pointer.current + 1];
    let newState: any;
    switch (type) {
      case 'NODE_SIZE':
        newState = { ...nodeData_Graph };
        newState[id].height = value.new.height;
        newState[id].width = value.new.width;
        newState[id].x = value.new.x;
        newState[id].y = value.new.y;
        setnodeVisualData_Graph(newState);

        break;
      case 'NODE_ADD':
        newState = { ...nodeData_Graph };
        newState[id] = value.new.node_data;
        setnodeData_Graph(newState);
        newState = { ...nodeVisualData_Graph };
        newState[id] = value.new.node_visual;
        setnodeVisualData_Graph(newState);
        break;
      case 'NODE_ADD_EXISTING':
        newState = { ...nodeData_Graph };
        newState[id] = value.new.node_data;
        if (value.old.node_data) delete newState[value.old.node_data.id];
        setnodeData_Graph(newState);
        newState = { ...nodeVisualData_Graph };
        newState[id] = value.new.node_visual;
        if (value.old.node_data) delete newState[value.old.node_data.id];
        setnodeVisualData_Graph(newState);
        break;
      case 'NODE_DELETE':
        newState = { ...nodeData_Graph };
        delete newState[id];
        setnodeData_Graph(newState);
        newState = { ...nodeVisualData_Graph };
        delete newState[id];
        setnodeVisualData_Graph(newState);
        break;
      case 'NODE_COLOR':
        newState = { ...nodeData_Graph };
        newState[id].color = value.new.color;
        setnodeData_Graph(newState);
        break;
      case 'NODE_ICON':
        newState = { ...nodeData_Graph };
        newState[id].icon = value.new.icon;
        setnodeData_Graph(newState);
        break;
      case 'CONNECTION_ADD':
        newState = { ...nodeData_Graph };
        newState[id].connections[value.endNode] = value.connection;
        setnodeData_Graph(newState);
        break;

      case 'CONNECTION_DELETE':
        newState = { ...nodeData_Graph };
        delete newState[id].connections[value.endNode];
        setnodeData_Graph(newState);
        break;
      case 'CONNECTION_TYPE':
        newState = { ...nodeData_Graph };
        newState[id].connections[value.endNode].type = value.new.type;
        setnodeData_Graph(newState);
        break;
      case 'CONNECTION_DIRECTION':
        newState = { ...nodeData_Graph };
        if (newState[id].connections[value.endNode]) {
          newState[value.endNode].connections[id] = value.newConnection;
          delete newState[id].connections[value.endNode];
        } else {
          newState[id].connections[value.endNode] = value.newConnection;
          delete newState[value.endNode].connections[id];
        }
        setnodeData_Graph(newState);
        break;
      case 'DRAG':
        newState = { ...nodeVisualData_Graph };
        newState[id].x = value.new.x;
        newState[id].y = value.new.y;
        setnodeVisualData_Graph(newState);
        break;
      case 'NODE_TITLE':
        // let redoOps = 0;
        // for (let i = pointer.current + 1; i < history.current.length; ++i) {
        //   if (history.current[i].type == 'NODE_TITLE' && redoOps < 5) {
        //     redoOps += 1;
        //   } else {
        //     break;
        //   }
        // }
        // pointer.current += redoOps - 1;
        newState = { ...nodeData_Graph };
        newState[id].title = value.title;
        setnodeData_Graph(newState);
        break;
    }

    // setnodeData_Graph(newNodes);
    // setnodeVisualData_Graph(newVisualNodes);
    pointer.current += 1;
  };

  return { undo, redo, addAction, history, pointer };
};
