import React from 'react';

type IconTitleProps = {
  icon: any;
  title: string;
};
const IconTitle: React.FC<IconTitleProps> = ({ icon, title }) => {
  return (
    <div className='flex flex-row content-center items-center self-center absolute overflow-hidden'>
      {icon}
      <h3 className='ml-xxs'>{title}</h3>
    </div>
  );
};
export default IconTitle;
