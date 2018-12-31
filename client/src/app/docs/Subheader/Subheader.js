import styles from './Subheader.module.scss';
import React from 'react';

import Text from './../../components/Text/Text';

const Subheader = ({ title, description, className, ...restProps }) => {
  return (
    <header {...restProps} className={styles.root}>
      <Text heading2 className={styles.title} component="h2">
        {title}
      </Text>
      {description && (
        <Text className={styles.description} large component="p">
          {description}
        </Text>
      )}
    </header>
  );
};

export default Subheader;
