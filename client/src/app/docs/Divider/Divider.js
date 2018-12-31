import styles from './Divider.module.scss';
import React from 'react';
import classnames from 'classnames';

const Divider = ({
  className,
  transparent,
  small,
  medium,
  large,
  ...restProps
}) => {
  return (
    <div
      {...restProps}
      className={classnames({
        [styles.root]: true,
        [styles.normal]: !transparent,
        [styles.transparent]: transparent,
        [styles.small]: small,
        [styles.medium]: medium,
        [styles.large]: large,
        [className]: className
      })}
    />
  );
};

export default Divider;
