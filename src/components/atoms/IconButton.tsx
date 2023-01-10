import React from 'react';
import './atoms.css';

type IconButtonProps = {
  src: any;
  onClick: () => void;
};

const IconButton: React.FC<IconButtonProps> = ({ src, onClick }) => {
  const classes = 'icon_button hover:opacity-50';
  const renderButton = () => {
    if (typeof src == 'string') {
      return <img src={src} className={classes} onClick={onClick} />;
    } else {
      return src;
    }
  };
  return renderButton();
};
export default IconButton;
