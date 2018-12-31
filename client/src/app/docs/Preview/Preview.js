import styles from './Preview.module.scss';
import React from 'react';
import classnames from 'classnames';

const Preview = ({ children, className, ...restProps }) => {
  return (
    <div
      {...restProps}
      className={classnames({
        [styles.root]: true,
        [className]: className
      })}
    >
      {children}
    </div>
  );
};

export default Preview;
