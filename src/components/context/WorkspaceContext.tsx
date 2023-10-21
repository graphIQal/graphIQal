import React, { ReactNode, createContext, useContext, useState } from 'react';

interface WorkspaceContextValue {
  activeWorkspace: string | null;
  switchWorkspace: (workspace: string | null) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(
  undefined
);

interface WorkspaceProviderProps {
  children: ReactNode;
}

export const WorkspaceProvider: React.FC<WorkspaceProviderProps> = ({
  children,
}) => {
  const [activeWorkspace, setActiveWorkspace] = useState<string | null>(null);

  const switchWorkspace = (workspace: string | null) => {
    setActiveWorkspace(workspace);
  };

  const value: WorkspaceContextValue = {
    activeWorkspace,
    switchWorkspace,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = (): WorkspaceContextValue => {
  const context = useContext(WorkspaceContext);
  if (context == undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
