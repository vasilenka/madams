import styles from './Navbar.module.scss';
import React from 'react';
import classnames from 'classnames';

import { ReactComponent as Logo } from './mid.svg';
import { ReactComponent as Github } from './github.svg';

import Text from './../Text/Text';

const Navbar = ({ className, ...restProps }) => {
  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.container)}>
        <div className={styles.brand}>
          <Text className={styles.name} heading4 component="h1">
            Madams
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
