import React, { useContext, useEffect } from 'react';
import ViewContext, { ViewContextInterface } from '../../context/ViewContext';
import SplitPaneContext, {
  SplitPaneContextInterface,
} from '../split-pane/SplitPaneContext';

export const Tabs: React.FC<{ children: any }> = ({ children }) => {
  return (
    <div>
      <div className='flex flex-row bg-blue-50 w-full'>{children}</div>
    </div>
  );
};
