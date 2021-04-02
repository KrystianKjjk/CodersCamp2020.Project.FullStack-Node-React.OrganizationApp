import React from 'react';
import styles from './ReferenceProjects.module.css';

export interface ReferenceProjectsProps {
  name: string;
}

const ReferenceProjects: React.FC< ReferenceProjectsProps > = props => {
  return (
    <div>
      {props.name}
    </div>
  );
};

export default ReferenceProjects;