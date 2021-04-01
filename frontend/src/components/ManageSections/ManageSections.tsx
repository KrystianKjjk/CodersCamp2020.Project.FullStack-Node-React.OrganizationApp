import React from 'react';
import styles from './ManageSections.module.css';

export interface ManageSectionsProps {
  name: string;
}

const ManageSections: React.FC< ManageSectionsProps > = props => {
  return (
    <div>
      {props.name}
    </div>
  );
};

export default ManageSections;