import React from 'react';
import styles from './ManageTeams.module.css';

export interface ManageTeamsProps {
  name: string;
}

const ManageTeams: React.FC< ManageTeamsProps > = props => {
  return (
    <div>
      {props.name}
    </div>
  );
};

export default ManageTeams;