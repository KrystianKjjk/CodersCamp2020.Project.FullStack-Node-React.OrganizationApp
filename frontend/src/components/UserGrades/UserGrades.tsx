import React from 'react';
import styles from './UserGrades.module.css';

export interface UserGradesProps {
  name: string;
}

const UserGrades: React.FC< UserGradesProps > = props => {
  return (
    <div>
      {props.name}
    </div>
  );
};

export default UserGrades;