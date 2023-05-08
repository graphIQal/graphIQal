import React from 'react';

export const Tabs: React.FC<{ children: any; component: any }> = ({
  children,
  component,
}) => {
  return (
    <div className='h-full'>
      <div className='flex flex-row bg-blue-50 w-full'>{children}</div>
      <div>{component.component}</div>
    </div>
  );
};
