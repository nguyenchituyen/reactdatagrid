/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useState } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';

import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter';

const columns = [
  { visible: true, name: 'country', defaultFlex: 1, header: 'Country' },
  { visible: true, name: 'firstName', defaultFlex: 1, header: 'First Name' },
  { visible: true, name: 'age', type: 'number', defaultFlex: 1, header: 'Age' },
  {
    visible: true,
    name: 'enlisted',
    defaultFlex: 1,
    header: 'Enlisted',
    render: ({ value }) => {
      if (value === null) {
        return '';
      }
      return value ? 'Yes' : 'No';
    },
    filterEditor: SelectFilter,
    filterEditorProps: {
      multiple: true,
      wrapMultiple: false,
      dataSource: [
        { id: true, label: 'Yes' },
        { id: false, label: 'No' },
        { id: null, label: 'Blank' },
      ],
    },
  },
];

const people = [
  {
    id: 1,
    firstName: 'Paul',
    country: 'usa',
    age: 20,
    enlisted: true,
    foo: 'foo',
    bar: 'bar',
  },
  {
    id: 2,
    firstName: 'Paul',
    country: 'uk',
    age: 20,
    enlisted: false,
    foo: 'foo',
    bar: 'bar',
  },
  {
    id: 3,
    firstName: 'Paul',
    country: 'usa',
    age: 19,
    enlisted: null,
    foo: 'foo',
    bar: 'bar',
  },
];

const defaultFilterValue = [
  {
    name: 'enlisted',
    operator: 'inlist',
    type: 'select',
    value: undefined,
  },
];

const App = () => {
  const [gridRef, setGridRef] = useState(null);
  const [groupBy, setGroupBy] = useState(['country', 'age']);
  const renderGroupValue = useCallback(
    ({ value, data }) => `${value} (${data.array.length})`,
    []
  );
  return (
    <div>
      <p>Visible columns: {gridRef?.current.visibleColumns.length}</p>
      <ReactDataGrid
        onReady={ref => {
          ref.current.collapseAllGroups();
          setGridRef(ref);
        }}
        enableFiltering
        columns={columns}
        defaultFilterValue={defaultFilterValue}
        dataSource={people}
        style={{ minHeight: 550 }}
        licenseKey={process.env.NEXT_PUBLIC_LICENSE_KEY}
      />
    </div>
  );
};

export default () => <App />;
