import React from 'react';
import styles from './ContentBox.module.css';

export interface ContentBoxProps {

}

const ContentBox: React.FC< ContentBoxProps > = props => {
  return (
      <div className={styles.content}>Content</div>
  );
};

export default ContentBox;