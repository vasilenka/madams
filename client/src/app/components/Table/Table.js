import styles from './Table.module.scss';
import React, { Component } from 'react';
import classnames from 'classnames';

import TableRow from './../TableRow/TableRow';
import TableHeader from './../TableHeader/TableHeader';

class Table extends Component {
  render() {
    let { head, body, className, ...restProps } = this.props;
    return (
      <table
        {...restProps}
        className={classnames({
          [styles.root]: true,
          [className]: className
        })}
      >
        <thead>
          {head && (
            <TableHeader className={styles.tableHeader}>{head}</TableHeader>
          )}
        </thead>
        <tbody>
          {body &&
            body.map(row => (
              <TableRow className={styles.tableRow}>{row}</TableRow>
            ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
