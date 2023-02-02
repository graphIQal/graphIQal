import React, { FC, useEffect, useRef, useState } from 'react';

export const XelemContext = React.createContext(null as unknown as () => void);
export const XarrowContext = React.createContext(null as unknown as () => void);

const updateRef = {};
let updateRefCount = 0;
const log = console.log;

const XarrowProvider: FC<{
  instanceCount: React.MutableRefObject<number>;
  children: React.ReactNode;
}> = ({ children, instanceCount }) => {
  const [, setRender] = useState({});
  const updateXarrow = () => setRender({});
  useEffect(() => {
    instanceCount.current = updateRefCount; // so this instance would know what is id
    (updateRef as any)[instanceCount.current] = updateXarrow;
  }, []);
  // log('XarrowProvider', updateRefCount);
  return (
    <XarrowContext.Provider value={updateXarrow}>
      {children}
    </XarrowContext.Provider>
  );
};

const XelemProvider: React.FC<{
  children: React.ReactNode;
  instanceCount: React.MutableRefObject<number>;
}> = ({ children, instanceCount }) => {
  console.log('curr' + JSON.stringify(instanceCount));
  return (
    <XelemContext.Provider value={(updateRef as any)[instanceCount.current]}>
      {children}
    </XelemContext.Provider>
  );
};

const Xwrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const instanceCount = useRef(updateRefCount);
  const [, setRender] = useState({});
  useEffect(() => {
    updateRefCount++;
    setRender({});
    return () => {
      delete (updateRef as any)[instanceCount.current];
    };
  }, []);

  return (
    <XelemProvider instanceCount={instanceCount}>
      <XarrowProvider instanceCount={instanceCount}>{children}</XarrowProvider>
    </XelemProvider>
  );
};

export default Xwrapper;
