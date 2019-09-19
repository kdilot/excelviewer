import React from 'react';
import ReactJson from 'react-json-view';
import styles from './JsonViewLayout.module.scss';

const JsonViewLayout = (props) => {
  const {
    data,
    dataChange,
  } = props
  return (
    <div className={styles.jsonViewLayoutWrapper}>
      <ReactJson
        src={data}
        style={{ padding: '1rem', margin: '1rem', borderRadius: '10px' }}
        name={null}
        theme={"google"}
        displayDataTypes={false}
        // onAdd={(e) => { console.log(e) }}
        onEdit={(e) => { dataChange(e) }}
        iconStyle={"triangle"}
      />
    </div>
  );
};

export default JsonViewLayout;