import React from 'react';

export const TabsContainer: React.FC<{ children: any }> = ({ children }) => {
  return <div className='flex flex-row bg-blue-50 w-full'>{children}</div>;
};
