import React from 'react';
import IconCircleButton from './IconCircleButton';
import { useRouter } from 'next/navigation';

export const TitleWithNavigation: React.FC = () => {
  const router = useRouter();
  console.log('router ' + router);
  return (
    <div className='flex flex-row gap-x-2 align-middle items-center'>
      <div className='flex flex-row gap-x-1'>
        <IconCircleButton
          src='angleLeft'
          onClick={() => {
            router.back();
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
      <h3 className='text-md font-semibold'>Title</h3>
    </div>
  );
};
