import React from 'react';

type SidePanelProps = {
  title: string;
  children: any;
};
export const SidePanel: React.FC<SidePanelProps> = ({ title, children }) => {
  return (
    <div>
      {title}
      {children}
    </div>
  );
};
