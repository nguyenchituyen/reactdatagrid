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

const App = () => {
  const [tableColumns, setTableColumns] = useState([...columns]);
  const [count, setCount] = useState(0);

  const dataSource = useCallback(async () => {
    console.log('load data');
    return { data: [], count: 0 };
  }, [tableColumns, count]);

  const reRender = () => {
    setTableColumns([...columns]);

    setTimeout(() => {
      setCount(count => count + 1);
      setTableColumns([...columns]);
    }, 0);
  };

  return (
    <div>
      <Button onClick={reRender}>Crash!</Button>
      <ReactDataGrid
        idProperty="id"
        style={gridStyle}
        columns={tableColumns}
        pagination
        livePagination
        licenseKey={process.env.NEXT_PUBLIC_LICENSE_KEY}
        onReady={() => {}}
        limit={10}
        dataSource={dataSource}
      />
    </div>
  );
};

export default () => <App />;
