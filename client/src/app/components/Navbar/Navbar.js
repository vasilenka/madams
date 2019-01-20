import styles from './Navbar.module.scss';
import React, { } from 'react';
import classnames from 'classnames';

import Text from '../Text/Text';

const Navbar = ({ className, ...restProps }) => {
  return (
    <div {...restProps} className={classnames(styles.root)}>
      <div className={classnames(styles.container)}>
        <div className={styles.brand}>
          <Text className={styles.name} heading4 component="h1">
            #channel_name
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
