import React from 'react';
import styles from './DashboardPage.module.scss';
import Text from '../../components/Text/Text';

const DashboardPage = () => {
  return (
    <div className={styles.root}>
      <Text component="h2" heading2>
        Welcome to The Madams
      </Text>
      <br />
      <br />
      <Text large component="p">
        This project initiated by
      </Text>
      <Text large component="p">
        Khairani Ummah, the awesome Head of Ops team at
      </Text>
      <Text large component="p">
        Meridian.id
      </Text>
    </div>
  );
};

export default DashboardPage;
