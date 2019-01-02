import styles from './DropdownContainer.module.scss';
import React, { Component } from 'react';
import classnames from 'classnames';

class DropdownContainer extends Component {
  render() {
    let { className, children, ...restProps } = this.props;
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
  }
}

export default DropdownContainer;
