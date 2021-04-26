import React, { ReactEventHandler, useEffect, useRef, useState } from 'react';
import { FormControlLabel, Checkbox, Paper, CssBaseline, Container } from '@material-ui/core';
import styles from './ManageUsers.module.css';
import SelectSortBy from '../SelectSortBy';
import SearchInput from '../SearchInput';
import Table from '../ReusableTable';
import { filterData, searchData, sortData } from '../ReusableTable/ReusableTableSlice';
import { useAppDispatch } from '../../app/hooks';
import { UserService } from '../../api';
import { useHistory } from 'react-router-dom';
import PageHeader from '../PageHeader';

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
        style={{color: '#fff'}}
      />
    }
    label={name}
  />
);

export interface ManageUsersProps { };

const ManageUsers: React.FC< ManageUsersProps > = () => {

  const api = useRef<UserService>(new UserService());
  const history = useHistory();
  const tableName = 'Users';
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

  const changeStatusFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusFilters({ ...statusFilters, [event.target.name]: event.target.checked });
  };
  const changeTypeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeFilters({ ...typeFilters, [event.target.name]: event.target.checked });
  };
  const changeSortBy = (value: string) => {
    dispatch(sortData({table: tableName, column: value }));
  };
  const changeSearch = (value: string) => {
    const searchQuery = {
      table: tableName,
      column: /^[0-9a-fA-F]{1,16}$/.test(value) ? 'id' : 'surname',
      search: value,
    }
    dispatch(searchData(searchQuery));
  }

  useEffect(() => {
    const typeValues = Object.entries(typeFilters)
      .filter(([, value]) => value)
      .map(([key, value]) => key);
    const statusValues = Object.entries(statusFilters)
      .filter(([, value]) => value)
      .map(([key, value]) => key);
    const filters = [
      {column: 'type', values: typeValues},
      {column: 'status', values: statusValues}
    ];
    dispatch(filterData({table: tableName, filters }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeFilters, statusFilters]);
  
  const sortByOptions = ['name', 'surname', 'type', 'status'];
  const columns = [
    {field: 'name', headerName: 'Name', width: 150, sortable: true},
    {field: 'surname', headerName: 'Surname', width: 150, sortable: true},
    {field: 'type', headerName: 'Type', width: 150, sortable: true},
    {field: 'status', headerName: 'Status', width: 150, sortable: true},
  ];

  function handleSelection(params: any, e: any) {
    const userID = params.row.id;
    const path = `users/${userID}`;
    history.push(path);
  }
  
  return (
      <Container className={styles.container} aria-label='Manage Users'>
        <CssBaseline />
        <PageHeader name="Users">
          <SearchInput onSubmit={changeSearch} placeholder='User last name or ID' />
        </PageHeader>
        <Paper className={styles.tableContainer}>
          <div className={styles.manageContainer}>
            <h2 className={styles.manageHeader}>Manage Users</h2>
            <span className={styles.selectSortBy}>
              <SelectSortBy onChange={changeSortBy} initialValue='' options={sortByOptions}/>
            </span>
            <h3 className={styles.checkboxesHeader}>Filter options</h3>
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
          {api.current &&
            <Table
                name={tableName}
                columns={columns}
                getData={api.current.getUsers}
                onRowClick={handleSelection}
            />
          }
        </Paper>
      </Container>
  );
};

export default ManageUsers;
