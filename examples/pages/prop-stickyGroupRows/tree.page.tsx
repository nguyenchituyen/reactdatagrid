import React, { useState } from 'react';

import ReactDataGrid from '@inovua/reactdatagrid-enterprise';

import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox';

const gridStyle = { minHeight: 350 };

const treeData = [
  {
    id: 1,
    name: 'Applications',
    folder: true,
    nodes: [
      {
        id: 1,
        name: 'App store',
        size: '4.5Mb',
        nodes: null,
      },
      {
        id: 2,
        name: 'iMovie',
        size: '106Mb',
        nodes: null,
      },
      {
        id: 3,
        name: 'IRecall',
        size: '200Mb',
      },
    ],
  },
  {
    id: 2,
    name: 'Documents',
    nodes: [
      {
        id: 1,
        name: 'Todo.md',
        size: '2Kb',
      },
      {
        id: 2,
        name: 'Calendar.md',
        size: '15.2Kb',
      },
      { id: 3, name: 'Shopping list.csv', size: '20Kb' },
    ],
  },
  {
    id: 3,
    name: '3 Downloads',
    nodes: [
      {
        id: 1,
        name: 'Email data',
        nodes: [
          {
            id: 1,
            name: 'Personal.xls',
            size: '100Gb',
          },
          { id: 2, name: 'Work.xls' },
        ],
      },
      { id: 2, name: 'MacRestore.gzip' },
    ],
  },
];

const columns = [
  { name: 'name', header: 'Name', width: 800 },
  { name: 'size', header: 'Size', width: 800 },
];

const loadNode = ({ node, nodeProps }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (nodeProps.depth >= 4) {
        resolve([
          { id: 1, name: 'First child of ' + node.name },
          { id: 2, name: 'Second child of ' + node.name },
        ]);
      }
      resolve([
        { id: 1, name: 'First child of ' + node.name, nodes: null },
        { id: 2, name: 'Second child of ' + node.name, nodes: null },
      ]);
    }, 0);
  });
};

const defaultExpandedNodes = { 1: true, 2: true, 3: true, '3/1': true };

const App = () => {
  const [stickyTreeNodes, setStickyTreeNodes] = useState(true);

  return (
    <div>
      <h3>TreeGrid with sticky tree nodes</h3>

      <div style={{ marginBottom: 20 }}>
        <CheckBox
          theme="default-dark"
          checked={stickyTreeNodes}
          onChange={setStickyTreeNodes}
        >
          Use sticky tree nodes (expand nodes to have vertical scrollbar)
        </CheckBox>
      </div>
      <ReactDataGrid
        theme="default-dark"
        treeColumn="name"
        licenseKey={process.env.NEXT_PUBLIC_LICENSE_KEY}
        loadNode={loadNode}
        stickyGroupRows
        stickyTreeNodes={stickyTreeNodes}
        defaultExpandedNodes={defaultExpandedNodes}
        style={gridStyle}
        columns={columns}
        dataSource={treeData}
        checkboxColumn
      />
    </div>
  );
};

export default () => <App />;
