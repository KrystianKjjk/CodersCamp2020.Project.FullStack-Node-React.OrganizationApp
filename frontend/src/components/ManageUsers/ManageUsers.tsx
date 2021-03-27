import React, { ReactEventHandler, useEffect, useState } from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import styles from './ManageUsers.module.css';
import AddButton from '../AddButton';
import SelectSortBy from '../SelectSortBy';
import SearchInput from '../SearchInput';
import Table from '../ReusableTable';
import { filterData, sortData } from '../ReusableTable/ReusableTableSlice';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { values } from 'lodash';


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
  getUsers: () => Promise<any[]>;
}

const ManageUsers: React.FC< ManageUsersProps > = ({ getUsers }) => {
  const dispatch = useAppDispatch();
  const [statusFilters, setStatusFilters] = useState({
    Active: false,
    Archived: false,
    Resigned: false,
  });
  const [typeFilters, setTypeFilters] = useState({
    Candidate: false,
    Participant: false,
    Mentor: false,
    Admin: false,
  });
  const [sortBy, setSortBy] = useState('');
  const [search, setSearch] = useState('');

  const changeStatusFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusFilters({ ...statusFilters, [event.target.name]: event.target.checked });
  };
  const changeTypeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeFilters({ ...typeFilters, [event.target.name]: event.target.checked });
  };
  const changeSortBy = (value: string) => {
    setSortBy(value);
  };
  const changeSearch = (value: string) => {
    setSearch(value);
  }
  
  useEffect(() => {
    const values = Object.entries(statusFilters)
      .filter(([, value]) => value)
      .map(([key, value]) => key);
    dispatch(filterData({table: 'Users', column: 'status', values }));
  }, [statusFilters]);
  useEffect(() => {
    const values = Object.entries(typeFilters)
      .filter(([, value]) => value)
      .map(([key, value]) => key);
    dispatch(filterData({table: 'Users', column: 'type', values }));
  }, [typeFilters]);
  useEffect(() => {
    dispatch(sortData({table: 'Users', column: sortBy }));
  }, [sortBy]);
  useEffect(() => {
    if ( search.match(/[0-9a-f]{16}/) )
      dispatch(filterData({table: 'Users', column: 'id', values: [search] }));
    else
      dispatch(filterData({table: 'Users', column: 'surname', values: [search] }));
  }, [search]);

  const sortByOptions = ['name', 'surname', 'type', 'status'];
  const columns = [
    {field: 'name', headerName: 'Name', width: 150, sortable: true},
    {field: 'surname', headerName: 'Surname', width: 150, sortable: true},
    {field: 'type', headerName: 'Type', width: 150, sortable: true},
    {field: 'status', headerName: 'Status', width: 150, sortable: true},
  ]
  
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
              name='Active'
              checked={statusFilters.Active}
              onChange={changeStatusFilter}
            />
            <PrimaryCheckBox 
              name='Archived'
              checked={statusFilters.Archived}
              onChange={changeStatusFilter}
            />
            <PrimaryCheckBox 
              name='Resigned'
              checked={statusFilters.Resigned}
              onChange={changeStatusFilter}
            />
          </span>
          <span>
            <PrimaryCheckBox 
              name='Candidate'
              checked={typeFilters.Candidate}
              onChange={changeTypeFilter}
            />
            <PrimaryCheckBox 
              name='Participant'
              checked={typeFilters.Participant}
              onChange={changeTypeFilter}
            />
            <PrimaryCheckBox 
              name='Mentor'
              checked={typeFilters.Mentor}
              onChange={changeTypeFilter}
            />
            <PrimaryCheckBox 
              name='Admin'
              checked={typeFilters.Admin}
              onChange={changeTypeFilter}
            />
          </span>
        </div>
      </div>
      <Table name='Users' columns={columns} getData={getUsers}/>
    </div>
  );
};

export default ManageUsers;