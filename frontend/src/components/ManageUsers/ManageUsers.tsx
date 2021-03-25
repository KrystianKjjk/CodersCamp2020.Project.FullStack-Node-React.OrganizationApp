import React from 'react';
import styles from './ManageUsers.module.css';

export interface ManageUsersProps {
  name: string;
}

const ManageUsers: React.FC< ManageUsersProps > = props => {
  return (
    <div>
      {props.name}
    </div>
  );
};

export default ManageUsers;