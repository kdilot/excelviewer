import React from 'react';
import styles from './Title.module.scss';

const Title = (props) => {
  const {
    data,
  } = props
  return (
      <div className={styles.title}>
       {data}
       </div>
  );
};

export default Title;