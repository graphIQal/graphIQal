import React, { useRef, useEffect, MutableRefObject, Children } from 'react';
import './resizable.css';

const ResizableBox: React.FC<{
  children: any;
  classes?: string;
  style?: object;
}> = ({ children, classes, style }) => {
  const ref = useRef(null);
  const refLeft = useRef(null);
  const refTop = useRef(null);
  const refRight = useRef(null);
  const refBottom = useRef(null);
  const refBottomRight = useRef(null);

  useEffect(() => {
    const resizeableEle = ref.current as any;
    const styles = window.getComputedStyle(resizeableEle);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let x = 0;
    let y = 0;

    resizeableEle.style.top = '50px';
    resizeableEle.style.left = '50px';

    //Bi-directional Resize
    const onMouseMoveBottomRightResize = (event: any) => {
      const e = event as any;
      const dx = e.clientX - x;
      x = e.clientX;
      width = width + dx;
      resizeableEle.style.width = width + 'px';
      const dy = e.clientY - y;
      height = height + dy;
      y = e.clientY;
      resizeableEle.style.height = height + 'px';
    };

    const onMouseUpBottomRightResize = (event: Event) => {
      document.removeEventListener('mousemove', onMouseMoveBottomRightResize);
    };
    const onMouseDownBottomRightResize = (event: any) => {
      x = event.clientX;
      const styles = window.getComputedStyle(resizeableEle);
      resizeableEle.style.left = styles.left;
      resizeableEle.style.right = null;
      y = event.clientY;
      resizeableEle.style.top = styles.top;
      resizeableEle.style.bottom = null;
      document.addEventListener('mousemove', onMouseMoveBottomRightResize);
      document.addEventListener('mouseup', onMouseUpBottomRightResize);
    };

    //Right Resize
    const onMouseMoveRightResize = (event: any) => {
      const e = event as any;
      const dx = e.clientX - x;
      x = e.clientX;
      width = width + dx;
      resizeableEle.style.width = width + 'px';
    };

    const onMouseUpRightResize = (event: Event) => {
      document.removeEventListener('mousemove', onMouseMoveRightResize);
    };
    const onMouseDownRightResize = (event: any) => {
      x = event.clientX;
      resizeableEle.style.left = styles.left;
      resizeableEle.style.right = null;
      document.addEventListener('mousemove', onMouseMoveRightResize);
      document.addEventListener('mouseup', onMouseUpRightResize);
    };

    //Top Resize
    const onMouseMoveTopResize = (event: any) => {
      const e = event as any;
      const dy = e.clientY - y;
      height = height - dy;
      y = e.clientY;
      resizeableEle.style.height = height + 'px';
    };

    const onMouseUpTopResize = (event: Event) => {
      document.removeEventListener('mousemove', onMouseMoveTopResize);
    };
    const onMouseDownTopResize = (event: any) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle);
      resizeableEle.style.bottom = styles.bottom;
      resizeableEle.style.top = null;
      document.addEventListener('mousemove', onMouseMoveTopResize);
      document.addEventListener('mouseup', onMouseUpTopResize);
    };

    //Bottom Resize
    const onMouseMoveBottomResize = (event: any) => {
      const e = event as any;
      const dy = e.clientY - y;
      height = height + dy;
      y = e.clientY;
      resizeableEle.style.height = height + 'px';
    };

    const onMouseUpBottomResize = (event: Event) => {
      document.removeEventListener('mousemove', onMouseMoveBottomResize);
    };
    const onMouseDownBottomResize = (event: any) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle);
      resizeableEle.style.top = styles.top;
      resizeableEle.style.bottom = null;
      document.addEventListener('mousemove', onMouseMoveBottomResize);
      document.addEventListener('mouseup', onMouseUpBottomResize);
    };

    //Right Resize
    const onMouseMoveLeftResize = (event: any) => {
      const e = event as any;
      const dx = e.clientX - x;
      x = e.clientX;
      width = width - dx;
      resizeableEle.style.width = width + 'px';
    };

    const onMouseUpLeftResize = (event: Event) => {
      document.removeEventListener('mousemove', onMouseMoveLeftResize);
    };
    const onMouseDownLeftResize = (event: any) => {
      x = event.clientX;
      resizeableEle.style.right = styles.right;
      resizeableEle.style.left = null;
      document.addEventListener('mousemove', onMouseMoveLeftResize);
      document.addEventListener('mouseup', onMouseUpLeftResize);
    };

    //Add mouse down event listener
    const resizerRight = refRight.current as any;
    resizerRight.addEventListener('mousedown', (event: any) =>
      onMouseDownRightResize(event)
    );
    const resizerTop = refTop.current as any;
    resizerTop.addEventListener('mousedown', (event: any) =>
      onMouseDownTopResize(event)
    );
    const resizerBottom = refBottom.current as any;
    resizerBottom.addEventListener('mousedown', (event: any) =>
      onMouseDownBottomResize(event)
    );

    const resizerLeft = refLeft.current as any;
    resizerLeft.addEventListener('mousedown', (event: any) =>
      onMouseDownLeftResize(event)
    );

    const resizerBottomRight = refBottomRight.current as any;
    resizerBottomRight.addEventListener('mousedown', (event: any) =>
      onMouseDownBottomRightResize(event)
    );

    return () => {
      resizerRight.removeEventListener('mousedown', onMouseDownRightResize);
      resizerTop.removeEventListener('mousedown', onMouseDownTopResize);
      resizerBottom.removeEventListener('mousedown', onMouseDownBottomResize);
      resizerLeft.removeEventListener('mousedown', onMouseDownLeftResize);
      resizerBottomRight.removeEventListener(
        'mousedown',
        onMouseDownBottomRightResize
      );
    };
  }, []);

  return (
    <div>
      <div ref={ref} className={'resizable ' + classes}>
        <div ref={refLeft} className='resizer resizer-l'></div>
        <div ref={refTop} className='resizer resizer-t'></div>
        <div ref={refRight} className='resizer resizer-r'></div>
        <div ref={refBottom} className='resizer resizer-b'></div>
        <div ref={refBottomRight} className='resizer resizer-br'></div>
        {children}
      </div>
    </div>
  );
};
export default ResizableBox;
