import React from 'react';
import styles from './PageHeader.module.css';

export interface PageHeaderProps {
name:string
}

const PageHeader: React.FC< PageHeaderProps > = ({name}:PageHeaderProps) => {
  return (
    <div className={styles.header}>{name}</div>
  );
};

export default PageHeader;