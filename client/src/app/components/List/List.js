import styles from './List.module.scss';
import React from 'react';
import classnames from 'classnames';

const List = ({ className, children, component, ...restProps }) => {
  const Component = component || 'div';
  return (
    <Component
      {...restProps}
      className={classnames({
        [styles.root]: true
      })}
    >
      {children}
    </Component>
  );
};

export default List;
