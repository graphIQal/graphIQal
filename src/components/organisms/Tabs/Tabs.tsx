import React from 'react';

export const Tabs: React.FC<{ children: any }> = ({ children }) => {
  return (
    <div>
      <div className='flex flex-row bg-blue-50 w-full'>{children}</div>
    </div>
  );
};
