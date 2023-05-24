import React from 'react';

type SidePanelProps = {
  title: string;
  children: any;
};
export const SidePanel: React.FC<SidePanelProps> = ({ title, children }) => {
  return (
    <div>
      <h2 className='text-lg font-medium p-2'>{title}</h2>
      {children}
    </div>
  );
};
