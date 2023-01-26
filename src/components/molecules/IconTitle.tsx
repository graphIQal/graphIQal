import React from 'react';

type IconTitleProps = {
  icon: any;
  title: string;
};

//title with icon on its left
//if you want icon to be clickable, put this in the component
const IconTitle: React.FC<IconTitleProps> = ({ icon, title }) => {
  return (
    <div className='flex flex-row content-center items-center self-center absolute overflow-hidden'>
      {icon}
      <h3 className='ml-xxs'>{title}</h3>
    </div>
  );
};
export default IconTitle;
