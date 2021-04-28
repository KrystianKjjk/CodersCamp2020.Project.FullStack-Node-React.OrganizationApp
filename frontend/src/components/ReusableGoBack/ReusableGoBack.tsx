import React from 'react';
import styles from './ReusableGoBack.module.css';

export interface ReusableGoBackProps {
  name: string;
}

const ReusableGoBack: React.FC< ReusableGoBackProps > = props => {
  return (
    <div>
      {props.name}
    </div>
  );
};

export default ReusableGoBack;