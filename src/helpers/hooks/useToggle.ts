import React from 'react';
export const useToggle = (initialValue = false) => {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback((val?: any) => {
    if (val == undefined) setValue((v) => !v);
    else setValue(val);
  }, []);
  return { value, toggle };
};
