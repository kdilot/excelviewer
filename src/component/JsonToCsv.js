import React from 'react';
import CsvDownload from 'react-json-to-csv';
import styles from './JsonToCsv.module.scss';

const JsonToCsv = (props) => {
  const {
    data,
    sheet
  } = props
  return (
    <div className={styles.wrapper}>
      <CsvDownload
        data={data}
        filename={`${sheet}.csv`}
        style={{
          padding: '0.3rem',
          background: 'rgba(128, 128, 128, 0.5)',
          border: '1px solid rgba(128, 128, 128, 0.5)',
          cursor: 'pointer',
          borderRadius: '5px',
        }}
      >
        Download CSV
      </CsvDownload>
    </div>
  );
};

export default JsonToCsv;