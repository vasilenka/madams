import styles from './Brand.module.scss';
import React from 'react';
import classnames from 'classnames';

import Text from './../Text/Text';

const Brand = ({ className, ...restProps }) => {
  return (
    <header className={styles.root}>
      <Text heading3 component="h3">
        madams.
      </Text>
    </header>
  );
};

export default Brand;
