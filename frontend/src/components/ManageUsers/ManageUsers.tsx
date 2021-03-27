import React, { ReactEventHandler, useEffect } from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import styles from './ManageUsers.module.css';
import AddButton from '../AddButton';
import SelectSortBy from '../SelectSortBy';
import SearchInput from '../SearchInput';

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
    sortBy: '',
    search: '',
  });
  const changeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const changeSortBy = (value: string) => {
    setState({ ...state, sortBy: value });
  };
  const changeSearch = (value: string) => {
    setState({ ...state, search: value})
  }
  const sortByOptions = ['Name', 'Surname', 'Type', 'Status'];
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div className={styles.container}>
      <div className={styles.mainHeader}>
        <h2>Users</h2>
        <SearchInput onSubmit={changeSearch} placeholder='User last name or ID' />
      </div>
      <div className={styles.manageContainer}>
        <h2 className={styles.manageHeader}>Manage Users</h2>
        <span className={styles.addButton}>
          <AddButton text='Add'/>
        </span>
        <span className={styles.selectSortBy}>
          <SelectSortBy onChange={changeSortBy} initialValue='' options={sortByOptions}/>
        </span>
        <h3 className={styles.checkboxesHeader}>Sorting options</h3>
        <div className={styles.checkboxContainer}>
          <span>
            <PrimaryCheckBox 
              name='active'
              checked={state.active}
              onChange={changeFilter}
            />
            <PrimaryCheckBox 
              name='archived'
              checked={state.archived}
              onChange={changeFilter}
            />
            <PrimaryCheckBox 
              name='resigned'
              checked={state.resigned}
              onChange={changeFilter}
            />
          </span>
          <span>
            <PrimaryCheckBox 
              name='candidate'
              checked={state.candidate}
              onChange={changeFilter}
            />
            <PrimaryCheckBox 
              name='participant'
              checked={state.participant}
              onChange={changeFilter}
            />
            <PrimaryCheckBox 
              name='mentor'
              checked={state.mentor}
              onChange={changeFilter}
            />
            <PrimaryCheckBox 
              name='admin'
              checked={state.admin}
              onChange={changeFilter}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;