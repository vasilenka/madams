import styles from './Brand.module.scss';
import React from 'react';
// import classnames from 'classnames';

import Text from './../Text/Text';
// import DropdownContainer from './../DropdownContainer/DropdownContainer';

const Brand = ({ className, ...restProps }) => {
  return (
    <header className={styles.root}>
      <div className={styles.company}>
        <Text heading3 component="h1" className={styles.companyName}>
          madams.
        </Text>
      </div>
      <div className={styles.user}>
        <span className={styles.userStatus} />
        <Text small className={styles.username}>
          .herlambang
        </Text>
      </div>
    </header>
  );
};

export default Brand;
