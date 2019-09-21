import React from 'react';
import { JsonToCsv, Title } from 'component';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import styles from './TableLayout.module.scss';

const TableLayout = (props) => {
  const {
    data,
    tableChange
  } = props
  return (
    data.map((m, i) =>
      <div key={i} className={styles.tableLayoutWrapper}>
        <Title data={<h4>{m.name}</h4>} />
        <JsonToCsv data={m.data} sheet={m.name} />
        <HotTable
          id={m.name}
          data={m.data}
          width={'100%'}
          height={'auto'}
          colHeaders={Object.keys(m.data[0])[0] === '0' ? true : Object.keys(m.data[0])}
          rowHeaders={true}
          columnSorting={true}
          // readOnly={true}
          afterChange={(e) => { tableChange(e, m.name) }}
          className={"htCenter"}
          licenseKey={'non-commercial-and-evaluation'}
        />
      </div>
    )
  );
};

export default TableLayout;