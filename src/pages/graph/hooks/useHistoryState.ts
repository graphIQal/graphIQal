/**
 * Hook for controlling history actions
 */

import { useRef } from 'react';
import { GraphViewElement } from '../../../gql/graphql';
import { LineRefs } from '../graphTypes';

export type Action = {
  undo: {
    type: string;
    id: string | number;
    value: any;
  };
  redo: {
    type: string;
    id: string | number;
    value: any;
  };
};
export const useHistoryState = (
  nodes: { [key: string]: GraphViewElement },
  setNodes: (val: any) => void,
  setLines: (val: any) => void
) => {
  const history = useRef<Action[]>([]);
  const pointer = useRef<number>(-1);
  const addAction = (action: Action) => {
    history.current = [
      ...history.current.slice(0, pointer.current + 1),
      action,
    ];
    pointer.current += 1;
  };

  const undo = () => {
    if (pointer.current == -1) {
      return;
    }
    const { id, value, type } = history.current[pointer.current].undo;
    let newNodes = { ...nodes };
    switch (type) {
      case 'SIZE':
        if (
          newNodes[id].graphNode !== null &&
          newNodes[id].graphNode !== undefined
        ) {
          (newNodes[id].graphNode as any).size = value;
        }

        break;
      case 'ADD':
        setNodes((oldNodes: { [key: string]: GraphViewElement }) => {
          newNodes = { ...oldNodes };
          delete newNodes[id];
          return newNodes;
        });
        break;
      case 'LINE':
        setLines((oldLines: LineRefs[]) => {
          const newLines = [...oldLines];

          newLines.pop();
          console.log('lines ' + JSON.stringify(newLines));
          return [...newLines];
        });
        break;
      case 'DRAG':
        setNodes((oldNodes: { [key: string]: GraphViewElement }) => {
          newNodes = { ...oldNodes };
          (newNodes[id].graphNode as any).x = value.left;
          (newNodes[id].graphNode as any).y = value.top;
          return newNodes;
        });
        break;
    }
    // setNodes(newNodes);
    pointer.current -= 1;
  };

  const redo = () => {
    if (pointer.current + 1 >= history.current.length) {
      return;
    }
    const { id, value, type } = history.current[pointer.current + 1].redo;
    let newNodes = { ...nodes };
    switch (type) {
      case 'SIZE':
        if (
          newNodes[id].graphNode !== null &&
          newNodes[id].graphNode !== undefined
        ) {
          (newNodes[id].graphNode as any).size = value;
        }

        break;
      case 'ADD':
        newNodes[id] = value;
        setNodes((oldNodes: { [key: string]: GraphViewElement }) => {
          newNodes = { ...oldNodes };
          newNodes[id] = value;
          return newNodes;
        });
        break;
      case 'LINE':
        setLines((oldLines: LineRefs[]) => [...oldLines, value]);
        break;
      case 'DRAG':
        setNodes((oldNodes: { [key: string]: GraphViewElement }) => {
          newNodes = { ...oldNodes };
          (newNodes[id].graphNode as any).x = value.left;
          (newNodes[id].graphNode as any).y = value.top;
          return newNodes;
        });
        break;
    }
    pointer.current += 1;
  };

  return { undo, redo, addAction };
};
