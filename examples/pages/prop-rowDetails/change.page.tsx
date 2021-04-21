/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import DataGrid, { TypeFooterRow } from '@inovua/reactdatagrid-enterprise';

import people from '../people';

const gridStyle = { minHeight: 550 };

const renderRowDetails = ({ data }) => {
  return (
    <div style={{ padding: 20 }}>
      <h3>Row details:</h3>
      <table>
        <tbody>
          {Object.keys(data).map((name, i) => {
            return (
              <tr key={i}>
                <td>{name}</td>
                <td>{data[name]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const columns = [
  { name: 'id', header: 'Id', defaultVisible: false, defaultWidth: 80 },
  { name: 'name', header: 'Name', defaultWidth: 120 },
  { name: 'email', header: 'Email', defaultWidth: 120 },
  { name: 'country', header: 'Country', defaultWidth: 120 },
  { name: 'city', header: 'City', defaultWidth: 120 },
  { name: 'age', header: 'Age', type: 'number', defaultWidth: 120 },
];

const App = () => {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div>
      <div>
        <button onClick={() => setShowDetails(prev => !prev)}>
          Toggle Details
        </button>
      </div>

      <DataGrid
        idProperty="id"
        style={gridStyle}
        rowExpandHeight={400}
        licenseKey={process.env.NEXT_PUBLIC_LICENSE_KEY}
        renderRowDetails={showDetails ? renderRowDetails : undefined}
        columns={columns}
        dataSource={people}
      />
    </div>
  );
};

export default () => <App />;
