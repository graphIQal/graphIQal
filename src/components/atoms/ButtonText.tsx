import React from 'react';

type ButtonTextProps = {
  text: String;
};

const ButtonText: React.FC<ButtonTextProps> = ({ text }) => {
  return <p style={{ color: 'red' }}>{text}</p>;
};
export default ButtonText;
