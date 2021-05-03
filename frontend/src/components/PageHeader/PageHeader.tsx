import React from 'react';
import styles from './PageHeader.module.css';

export interface PageHeaderProps {
  name?:string | React.ReactElement
}

const PageHeader: React.FC< PageHeaderProps > = ({children}) => {
  return (
    <div className={styles.header}>{children}</div>
  );
};

export default PageHeader;