import React, { useContext } from 'react';
import LoadingContext, {
  LoadingContextInterface,
} from '../context/LoadingContext';
import { LoadingSpinner } from '../layouts/LoadingSpinner';

type SidePanelProps = {
  title: string;
  children: any;
};
export const SidePanel: React.FC<SidePanelProps> = ({ title, children }) => {
  const { loading } = useContext(LoadingContext) as LoadingContextInterface;
  return loading ? (
    <div className='p-2'>
      <LoadingSpinner />
    </div>
  ) : (
    <div>
      <h2 className='text-lg font-medium p-2'>{title}</h2>

      {children}
    </div>
  );
};
