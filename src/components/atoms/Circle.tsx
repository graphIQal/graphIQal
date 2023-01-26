import React from 'react';

type CircleProps = {
  diameter: number;
  children?: any;
  backgroundClass: string;
  onClick?: () => void;
};

//an empty circle that can contain any children
//the background color should be passed in as a class name (using tailwind)
const Circle: React.FC<CircleProps> = ({
  diameter,
  children,
  backgroundClass,
  onClick,
}) => {
  const widthMinClass = 'min-w-[' + diameter + 'px]';
  const widthMaxClass = 'max-w-[' + diameter + 'px]';
  const heightMaxClass = 'max-h-[' + diameter + 'px]';
  const heightMinClass = 'min-h-[' + diameter + 'px]';

  const className =
    widthMaxClass +
    ' ' +
    widthMinClass +
    ' ' +
    heightMinClass +
    ' ' +
    heightMaxClass +
    ' ' +
    backgroundClass +
    ' ' +
    'rounded-full flex items-center justify-center m-2';
  return (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  );
};
export default Circle;
