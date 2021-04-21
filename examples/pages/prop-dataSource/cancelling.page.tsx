import React, { useState, useCallback } from 'react';

import ReactDataGrid from '@inovua/reactdatagrid-enterprise';

import Button from '@inovua/reactdatagrid-community/packages/Button';
const DATASET_URL: string = 'https://demos.reactdatagrid.io/api/v1/contacts';

const gridStyle = { minHeight: 550, marginTop: 10 };
const empty = () => null;

const columns = [
  { name: 'firstName', header: 'First Name', defaultFlex: 2 },
  { name: 'lastName', header: 'Last Name', defaultFlex: 2 },
  { name: 'email', header: 'Email', defaultFlex: 3 },
];

const loadData = ({ skip, sortInfo, limit, columnNames }) => {
  console.log('loading', columnNames);
  return fetch(
    DATASET_URL +
      '?skip=' +
      skip +
      '&limit=' +
      limit +
      '&sortInfo=' +
      JSON.stringify(sortInfo) +
      '&columns=' +
      columnNames.join(',')
  ).then(response => {
    const totalCount = response.headers.get('X-Total-Count');

    return response.json().then(data => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('done ', columnNames);
          resolve({ data, count: parseInt(totalCount) });
        }, (5 - columnNames.length) * 100);
      });
    });
  });
};

const App = () => {
  const [tableColumns, setTableColumns] = useState([...columns]);
  const dataSource = useCallback(
    params => {
      params.columnNames = tableColumns.map(c => c.name);
      // console.log('current data', params.currentData);
      return loadData(params).then(result => {
        // Since we only request data based on the selected columns, simulate that
        // same here by removing keys from the data that aren't part of the columns.
        const columnKeys = tableColumns.map(c => c.name);
        if (columnKeys.indexOf('id') === -1) {
          columnKeys.push('id');
        }
        const data = result.data.map(d =>
          Object.fromEntries(
            Object.entries(d).filter(([key]) => columnKeys.includes(key))
          )
        );

        // console.log('dataSource', { skip: params.skip, data, tableColumns });

        return { data, count: result.count };
      });
    },
    [tableColumns]
  );

  const reRender = () => {
    // Remove some columns
    setTableColumns([...columns].slice(0, 1));

    setTimeout(() => {
      // Restore some columns
      setTableColumns([...columns]);
    }, 10);
  };

  return (
    <div>
      <Button onClick={reRender}>Re-Render</Button>
      <ReactDataGrid
        idProperty="id"
        style={gridStyle}
        columns={tableColumns}
        licenseKey={process.env.NEXT_PUBLIC_LICENSE_KEY}
        pagination
        livePagination
        limit={10}
        dataSource={dataSource}
      />
    </div>
  );
};

export default () => <App />;
