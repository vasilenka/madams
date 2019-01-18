import React from 'react';
import styles from './ProjectLog.module.scss';

const ProjectLog = () => {
  return (
    <div className={styles.root}>
      <div className={styles.activityLog} />
      <div className={styles.inputForm} />
    </div>
  );
};

export default ProjectLog;
