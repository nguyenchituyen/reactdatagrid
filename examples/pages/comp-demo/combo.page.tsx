import React, { useCallback, useEffect, useState } from 'react';
//@ts-ignore
import Combobox from '@inovua/reactdatagrid-community/packages/ComboBox';

const App = () => {
  const [dataSource] = useState([
    { id: 1, label: 'ONE' },
    { id: 2, label: 'TWO' },
    { id: 3, label: 'THREE' },
    { id: 4, label: 'FOUR' },
    { id: 5, label: 'FIVE' },
  ]);

  const [value, setValue] = useState([1]);

  useEffect(() => {
    setTimeout(() => {
      setValue([++value[0] % dataSource.length]);
    }, 5000);
  }, [value, dataSource]);

  const onChange = useCallback(
    val => {
      setValue(val);
    },
    [setValue]
  );

  return (
    <div className="App">
      <Combobox
        id={'foo-combo'}
        style={{ width: 300 }}
        theme={'default-dark'}
        itemEllipsis
        collapseOnSelect
        dataSource={dataSource}
        value={value}
        onChange={onChange}
        placeholder={'Select...'}
        relativeToViewport
        autoBlur
        clearValueOnEmpty={false}
        multiple={true}
        wrapMultiple={false}
      />
    </div>
  );
};

export default () => <App />;
