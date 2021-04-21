import React, { useState } from 'react';
import ReactDataGrid from '../../../enterprise-edition';

import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox';

import people from '../people';
import flags from '../flags';

const gridStyle = { minHeight: 600 };

const renderGroupTitle = (valueParam, { data }) => {
  const { value, name, fieldPath } = data;
  if (name === 'country') {
    return 'This is the current country for the group:' + value + '.';
  }
  if (name === 'age') {
    return 'Aged: ' + value + '.';
  }

  return value;
};

const columns = [
  {
    name: 'id',
    type: 'number',
    defaultWidth: 80,
    header: 'Id',
    defaultVisible: false,
  },
  {
    name: 'name',
    defaultFlex: 1,
    header: 'Name',
    groupBy: false,
    defaultLocked: true,
  },
  {
    name: 'country',
    defaultFlex: 1,
    defaultLocked: true,
    header: 'Country',
    render: ({ value }) => (flags[value] ? flags[value] : value),
  },
  { name: 'age', defaultFlex: 1, type: 'number', header: 'Age' },
  { name: 'email', defaultFlex: 1, defaultLocked: 'end', header: 'Email' },
];

const App = () => {
  const [defaultGroupBy, setDefaultGroupBy] = useState(['country']);
  const [expandGroupTitle, setExpandGroupTitle] = useState(false);
  const [rtl, setRtl] = useState(false);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <CheckBox
          theme="default-dark"
          checked={expandGroupTitle}
          onChange={setExpandGroupTitle}
        >
          Expand group title
        </CheckBox>
      </div>
      <div style={{ marginBottom: 20 }}>
        <CheckBox theme="default-dark" checked={rtl} onChange={setRtl}>
          RTL
        </CheckBox>
      </div>
      <ReactDataGrid
        key={'grid-' + expandGroupTitle}
        idProperty="id"
        theme="default-dark"
        licenseKey={process.env.NEXT_PUBLIC_LICENSE_KEY}
        style={gridStyle}
        renderGroupTitle={renderGroupTitle}
        expandGroupTitle={expandGroupTitle}
        defaultGroupBy={defaultGroupBy}
        columns={columns}
        dataSource={people}
        rtl={rtl}
      />
    </div>
  );
};

export default () => <App />;
