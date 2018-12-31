import styles from './Header.module.scss';
import React from 'react';
import classnames from 'classnames';

import Text from './../../components/Text/Text';

const Header = ({ title, description, source, className, ...restProps }) => {
  return (
    <header {...restProps} className={classnames(styles.root)}>
      <Text heading1 className={styles.title} component="h1">
        {title}
      </Text>
      <Text large className={styles.description} component="p">
        {description}
      </Text>
    </header>
  );
};

export default Header;
