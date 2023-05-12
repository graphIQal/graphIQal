import React, { useContext, useEffect } from 'react';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../../packages/graph/context/GraphViewContext';
import IconCircleButton from '../molecules/IconCircleButton';

export const Alert: React.FC = () => {
  const { alert, setAlert } = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;

  useEffect(() => {
    setTimeout(() => {
      setAlert('');
    }, 15000);
  }, [alert]);

  return alert != '' ? (
    <div className='h-12 absolute left-10 bottom-10 bg-base_black text-base_white rounded-md p-2 flex flex-row align-middle items-center justify-center flex-wrap gap-x-4 text-sm'>
      {alert}
      <IconCircleButton
        src='close'
        onClick={() => setAlert('')}
        circle={false}
        color='white'
      />
    </div>
  ) : (
    <div></div>
  );
};
