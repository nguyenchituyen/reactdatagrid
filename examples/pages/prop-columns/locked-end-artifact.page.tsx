import React from 'react';

import ReactDataGrid from '@inovua/reactdatagrid-enterprise';

import people from '../people';

const gridStyle = { minHeight: 550, maxWidth: 1000 };

const columns = [
  {
    name: 'id',
    header: 'Id',
    defaultVisible: false,
    defaultWidth: 100,
    type: 'number',
  },
  {
    name: 'name',
    defaultLocked: 'end',
    header: 'Name',
    defaultFlex: 1,
    minWidth: 450,
  },
  {
    name: 'country',
    header: 'Country',
    defaultFlex: 1,
    minWidth: 200,
  },
  { name: 'city', header: 'City', defaultFlex: 1, minWidth: 450 },
  { name: 'age', header: 'Age', minWidth: 100, type: 'number' },
];

const App = () => {
  return (
    <div>
      <h3>Scroll horizontally to see the effect</h3>
      <ReactDataGrid
        idProperty="id"
        onReady={api => {
          (global as any).api = api;
        }}
        reorderColumns={false}
        style={gridStyle}
        columns={columns}
        dataSource={people}
        virtualizeColumns
        licenseKey={process.env.NEXT_PUBLIC_LICENSE_KEY}
      />
    </div>
  );
};

export default () => <App />;
