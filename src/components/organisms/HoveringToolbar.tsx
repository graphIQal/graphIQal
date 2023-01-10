import React, { MutableRefObject, useEffect, useRef } from 'react';
import ToolbarButton from '../molecules/ToolbarButton';
import './organisms.css';

type ToolbarButtonProps = {
  buttonText: String;
  icon?: string;
  onPress(params: any): void;
};

type HoveringToolbarProps = {
  items: ToolbarButtonProps[];
  onRender: (ref: React.MutableRefObject<any>) => void;
};

const HoveringToolbar = React.forwardRef<
  MutableRefObject<any>,
  HoveringToolbarProps
>((props, ref) => {
  const ref2 = useRef<any>();
  const { items, onRender } = props;
  useEffect(() => {
    onRender(ref2);
  });
  const renderButtons = () => {
    return items.map((item, i) => {
      const { buttonText, icon, onPress } = item;
      const it = { buttonText, icon, onPress };
      return (
        <ToolbarButton
          key={i}
          className='menu_item first:rounded-l-text_box last:rounded-r-text_box'
          item={it}
        />
      );
    });
  };
  return (
    <div
      ref={ref2}
      style={{
        opacity: 0,
        display: 'inline-block',
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        marginTop: '-10px',
        marginLeft: '50px',
      }}
    >
      <div className='menu bg-base_black'>{renderButtons()}</div>
    </div>
  );
});

export default HoveringToolbar;
