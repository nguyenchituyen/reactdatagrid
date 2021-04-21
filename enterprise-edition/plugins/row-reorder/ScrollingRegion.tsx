import React, { useRef, forwardRef, useImperativeHandle } from 'react';

type TypeScrollRegionProps = {
  dir?: -1 | 1;
  onMouseEnter: (event: any) => void;
  onMouseLeave: () => void;
  DEFAULT_CLASS_NAME?: string;
};

const ScrollingRegion = forwardRef((props: TypeScrollRegionProps, ref: any) => {
  const scrollRegionRef: any = useRef();

  const setVisible = (visible: boolean) => {
    if (scrollRegionRef.current) {
      if (visible) {
        scrollRegionRef.current.style.display = 'block';
      } else {
        scrollRegionRef.current.style.display = 'none';
      }
    }
  };

  useImperativeHandle(ref, () => ({
    setVisible: setVisible,
  }));

  const className = props.DEFAULT_CLASS_NAME;

  return (
    <div
      ref={scrollRegionRef}
      style={{
        [props.dir === -1 ? 'top' : 'bottom']: 0,
      }}
      className={className}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    ></div>
  );
});

ScrollingRegion.defaultProps = {
  DEFAULT_CLASS_NAME: 'InovuaReactDataGrid__row-drag-scrolling-region',
};

export default ScrollingRegion;
