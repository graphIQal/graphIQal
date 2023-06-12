import React, { useContext, useEffect } from 'react';

import IconCircleButton from '../molecules/IconCircleButton';
import {
  useGraphViewAPI,
  useGraphViewData,
} from '../../packages/graph/context/GraphViewContext';

export const Alert: React.FC = () => {
  const { alert, undo } = useGraphViewData();
  const { changeAlert } = useGraphViewAPI();

  useEffect(() => {
    setTimeout(() => {
      changeAlert('');
    }, 15000);
  }, [alert]);

  return alert != '' ? (
    <div className='h-12 absolute left-10 bottom-10 bg-base_black text-base_white rounded-md p-2 flex flex-row align-middle items-center justify-center flex-wrap gap-x-4 text-sm'>
      {alert}
      <div
        className='underline text-sm cursor-pointer'
        onClick={() => {
          undo();
          changeAlert('');
        }}
      >
        Undo
      </div>
      {/* <IconCircleButton
        src='close'
        onClick={() => changeAlert('')}
        circle={false}
        color='white'
      /> */}
    </div>
  ) : (
    <div></div>
  );
};
