import React, { useContext } from 'react';
import IconCircleButton from './IconCircleButton';
import { useRouter } from 'next/navigation';
import { useViewData } from '../context/ViewContext';

export const TitleWithNavigation: React.FC = () => {
  const router = useRouter();

  const { currNode_data } = useViewData();
  return (
    <div className='flex flex-row gap-x-2 align-middle items-center'>
      <div className='flex flex-row gap-x-1'>
        <IconCircleButton
          src='angleLeft'
          onClick={() => {
            router.back();
          }}
          circle={false}
        />
        <IconCircleButton
          src='angleRight'
          onClick={() => router.forward()}
          circle={false}
        />
      </div>
      <h3 className='text-md font-semibold'>{currNode_data.n.title}</h3>
    </div>
  );
};
