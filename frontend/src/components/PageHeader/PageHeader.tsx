import React, { ReactNode } from 'react';
import styles from './PageHeader.module.css';

export interface PageHeaderProps {
  name?: string,
  children?: ReactNode
}

const PageHeader: React.FC< PageHeaderProps > = (props:PageHeaderProps) => {
  return (
  <div className={styles.headerContainer}>
    {props.name}
    {props.children}
  </div>
    
  );
};

export default PageHeader;