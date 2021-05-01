import React, { useEffect, useRef } from 'react';
import { Paper, CssBaseline, Container } from '@material-ui/core';
import styles from './ManageUsers.module.css';
import SelectSortBy from '../../../components/SelectSortBy';
import SearchInput from '../../../components/SearchInput';
import Table from '../../../components/ReusableTable';
import { filterData, searchData, sortData } from '../../../components/ReusableTable/ReusableTableSlice';
import { useAppDispatch } from '../../../app/hooks';
import { UserService } from '../../../api';
import { useHistory } from 'react-router-dom';
import useMultipleSelect from '../../../hooks/useMultipleSelect';
import { userStatusDict, userTypeDict } from '../../../models';


export interface ManageUsersProps { };

const ManageUsers: React.FC< ManageUsersProps > = () => {

  const api = useRef<UserService>(new UserService());
  const history = useHistory();
  const tableName = 'Users';
  const dispatch = useAppDispatch();

  const [statusSelect, statusFilters] = useMultipleSelect({ 
    options: Object.values(userStatusDict),
    label: 'Filter by status',
  });
  const [typeSelect, typeFilters] = useMultipleSelect({ 
    options: Object.values(userTypeDict),
    label: 'Filter by type',
  });

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
    // const typeValues = Object.entries(typeFilters)
    //   .filter(([, value]) => value)
    //   .map(([key, value]) => key);
    console.log({typeSelect});
    console.log({statusFilters});
    // const statusValues = Object.entries(statusFilters)
    //   .filter(([, value]) => value)
    //   .map(([key, value]) => key);
    const filters = [
      {column: 'type', values: typeFilters},
      {column: 'status', values: statusFilters}
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
        <Paper className={styles.mainHeader}>
          <h2>Users</h2>
          <SearchInput onSubmit={changeSearch} placeholder='User last name or ID' />
        </Paper>
        <Paper className={styles.tableContainer}>
          <div className={styles.manageContainer}>
            <h2 className={styles.manageHeader}>Manage Users</h2>
            <div className={styles.filtersContainer}>
              {statusSelect}
              {typeSelect}
            </div>
            <span className={styles.selectSortBy}>
              <SelectSortBy onChange={changeSortBy} initialValue='' options={sortByOptions}/>
            </span>
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
