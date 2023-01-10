import React from 'react';
import './atoms.css';

type ButtonTextProps = {
  text: String;
};

const ButtonText: React.FC<ButtonTextProps> = ({ text }) => {
  return <p className='button_text'>{text}</p>;
};
export default ButtonText;
