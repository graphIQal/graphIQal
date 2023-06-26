import { createContext, MutableRefObject } from 'react';

export type LoadingContextInterface = {
  loading: boolean;
};

const LoadingContext = createContext<LoadingContextInterface | null>(null);

export default LoadingContext;
