import React, { MutableRefObject, useEffect, useRef } from 'react';
import ToolbarButton from '../molecules/ToolbarButton';
import './HoveringToolbar.css';

type ToolbarButtonProps = {
  buttonText: String;
  icon?: string;
  onPress(params: any): void;
};

type HoveringToolbarProps = {
  items: ToolbarButtonProps[];
  onRender: (ref: React.MutableRefObject<any>) => void;
};

const HoveringToolbarOrg = React.forwardRef<
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
      return <ToolbarButton className='hovering_menu_item' item={it} />;
    });
  };
  return (
    <div
      ref={ref2}
      style={{
        opacity: 0,
        display: 'inline-block',
        padding: '8px 7px 6px',
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        marginTop: '-50px',
        backgroundColor: '#00000',
        height: 30,
        width: 30,
        borderRadius: '4px',
        marginLeft: '50px',
      }}
    >
      <div className='hovering_menu'>{renderButtons()}</div>
    </div>
  );
});

export default HoveringToolbarOrg;
