import 'highlight.js/styles/github-gist.css';
import styles from './Code.module.scss';
import React from 'react';
import classnames from 'classnames';
import Highlight from 'react-highlight';

const Code = ({ children, className, ...restProps }) => {
  return <Highlight className={classnames(styles.root)}>{children}</Highlight>;
};

export default Code;
