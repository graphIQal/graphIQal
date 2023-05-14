import React from 'react';
import IconCircleButton from './IconCircleButton';

type IconTitleProps = {
  icon: string;
  title: string;
  onClick: () => void;
  textClasses?: any;
};

//title with icon on its left
//if you want icon to be clickable, put this in the component
const IconTitle: React.FC<IconTitleProps> = ({
  icon,
  title,
  onClick,
  textClasses = '',
}) => {
  return (
    <div className='flex flex-row content-center items-center self-center absolute overflow-hidden'>
      <IconCircleButton circle={false} src={icon} onClick={onClick} />
      <h3 className={'ml-xxs ' + textClasses}>{title}</h3>
    </div>
  );
};
export default IconTitle;
