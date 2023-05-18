/*
Context used for drawing functionalities including nodes (circles), lines, and arrows.
*/

import { createContext } from 'react';

export type GraphNodeContextInterface = {
  id: string;
  title: string;
  icon: string;
  color: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

const GraphNodeContextInterface =
  createContext<GraphNodeContextInterface | null>(null);

export default GraphNodeContextInterface;
