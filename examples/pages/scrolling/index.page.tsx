import React, { useState } from 'react';

import ReactDataGrid from '@inovua/reactdatagrid-enterprise';

import { TypeComputedProps } from '@inovua/reactdatagrid-community/types';
import people from '../people';

const gridStyle = { minHeight: 200 };

const dataSource = people;

const columns = [
  {
    name: 'id',
  },
  {
    name: 'firstName',
  },
];
const GridScrollDemo: React.FC<TypeComputedProps> = props => {
  const [gridRef, setGridRef] = React.useState<TypeComputedProps>();

  (window as any).gridRef = gridRef;
  const handleGridScroll = React.useCallback(() => {
    console.log('grid', gridRef?.getScrollTop()); // <--- THIS NEVER GETS TO ZERO
  }, [gridRef]);

  const handleOnReady = (
    ref: React.MutableRefObject<TypeComputedProps | null>
  ) => {
    if (ref.current) {
      setGridRef?.(ref.current);
    }

    props.onReady?.(ref);
  };

  return (
    <ReactDataGrid
      columns={columns}
      licenseKey={process.env.NEXT_PUBLIC_LICENSE_KEY}
      dataSource={dataSource}
      style={gridStyle}
      onReady={handleOnReady}
      onScroll={handleGridScroll}
    />
  );
};

export default GridScrollDemo;
