import React, { ReactEventHandler, useEffect } from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import styles from './ManageUsers.module.css';

interface CheckboxProps {
  name: string;
  checked: boolean;
  onChange: ReactEventHandler;
}

const PrimaryCheckBox: React.FC<CheckboxProps> = ({ name, checked, onChange }) => (
  <FormControlLabel
    className={styles.checkbox}
    control={
      <Checkbox
        name={name}
        checked={checked}
        onChange={onChange}
        color="primary"
      />
    }
    label={name}
  />
);

export interface ManageUsersProps {
  
}

const ManageUsers: React.FC< ManageUsersProps > = props => {
  const [state, setState] = React.useState({
    active: false,
    archived: false,
    resigned: false,
    candidate: false,
    participant: false,
    mentor: false,
    admin: false,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div className={styles.container}>
      <h3>Sorting options</h3>
      <div className={styles.checkboxContainer}>
        <span>
          <PrimaryCheckBox 
            name='active'
            checked={state.active}
            onChange={handleChange}
          />
          <PrimaryCheckBox 
            name='archived'
            checked={state.archived}
            onChange={handleChange}
          />
          <PrimaryCheckBox 
            name='resigned'
            checked={state.resigned}
            onChange={handleChange}
          />
        </span>
        <span>
          <PrimaryCheckBox 
            name='candidate'
            checked={state.candidate}
            onChange={handleChange}
          />
          <PrimaryCheckBox 
            name='participant'
            checked={state.participant}
            onChange={handleChange}
          />
          <PrimaryCheckBox 
            name='mentor'
            checked={state.mentor}
            onChange={handleChange}
          />
          <PrimaryCheckBox 
            name='admin'
            checked={state.admin}
            onChange={handleChange}
          />
        </span>
      </div>
    </div>
  );
};

export default ManageUsers;