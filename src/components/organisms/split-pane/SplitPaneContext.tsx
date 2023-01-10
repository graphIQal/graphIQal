import { createContext } from 'react';

export type SplitPaneContextInterface = {
  clientWidth: number | null;
  setClientWidth: (value: number) => void;
  onMouseHoldDown: (e: MouseEvent) => void;
};

const SplitPaneContext = createContext<SplitPaneContextInterface | null>(null);

export default SplitPaneContext;
