import React, { useState } from 'react';

import ReactDataGrid from '../../../enterprise-edition';

import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox';

import people from '../people';
import flags from '../flags';

const gridStyle = { minHeight: 200, width: `calc(100% - 40px)` };

const columns = [
  {
    name: 'id',
    header: 'Id',
    defaultVisible: true,
    defaultWidth: 60,
    type: 'number',
  },
  { name: 'name', header: 'Name', defaultFlex: 1 },
  {
    name: 'country',
    header: 'Country',
    defaultFlex: 1,
    render: ({ value }) => (flags[value] ? flags[value] : value),
  },
  { name: 'city', header: 'City', defaultFlex: 1 },
  { name: 'age', header: 'Age', defaultFlex: 1, type: 'number' },
];

const App = () => {
  const [
    updateMenuPositionOnColumnsChange,
    setUpdateMenuPositionOnColumnsChange,
  ] = useState(true);

  return (
    <div style={{ height: 5000 }}>
      <h3>Grid with toggle for showColumnMenuTool</h3>

      <div style={{ marginBottom: 20 }}>
        <CheckBox
          theme="default-dark"
          checked={updateMenuPositionOnColumnsChange}
          onChange={setUpdateMenuPositionOnColumnsChange}
        >
          updateMenuPositionOnColumnsChange
        </CheckBox>
      </div>

      {/* <div style={{ height: 2000 }} /> */}

      <div
        style={{
          position: 'fixed',
          top: 500,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: 600,
          padding: '20px',
        }}
      >
        <ReactDataGrid
          idProperty="id"
          theme="default-dark"
          licenseKey={process.env.NEXT_PUBLIC_LICENSE_KEY}
          style={gridStyle}
          columns={columns}
          dataSource={people}
          updateMenuPositionOnColumnsChange={updateMenuPositionOnColumnsChange}
        />
      </div>
    </div>
  );
};

export default () => <App />;
