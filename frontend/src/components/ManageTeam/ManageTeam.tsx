import React, { useEffect, useState } from 'react';
import styles from './ManageTeam.module.css';
import AddButton from '../AddButton';
import SelectSortBy from '../SelectSortBy';
import SearchInput from '../SearchInput';
import Table from '../ReusableTable';
import { filterData, sortData } from '../ReusableTable/ReusableTableSlice';
import { useAppDispatch } from '../../app/hooks';
import { Container, CssBaseline, Paper } from '@material-ui/core';


export interface ManageTeamProps {
  getTeamMembers: () => Promise<any[]>;
  onClickAdd: () => void;
}

const ManageTeam: React.FC< ManageTeamProps > = ({ getTeamMembers, onClickAdd }) => {

  const dispatch = useAppDispatch();
  
  const columns = [
    {field: 'surname', headerName: 'Last name', width: 200, sortable: true},
    {field: 'name', headerName: 'First name', width: 150, sortable: true},
    {field: 'averageGrade', headerName: 'Average grade', width: 250, sortable: true},
    {field: 'status', headerName: 'Status', width: 150, sortable: true},
  ]
  
  return (
    <Container className={styles.manageTeams} aria-label='Manage Teams'>
      <CssBaseline />
      <Paper className={styles.mainHeader}>
        <h2>Manage Team</h2>
      </Paper>
      <Paper className={styles.container}>
        <div className={styles.manageContainer}>
          <h2 className={styles.manageHeader}>Users</h2>
          <span onClick={onClickAdd} className={styles.addButton} aria-label='Add user'>
            <AddButton text='Add'/>
          </span>
        </div>
        <div className={styles.table}>
          <Table name='Team' columns={columns} getData={getTeamMembers}/>
        </div>
      </Paper>
    </Container>
  );
};

export default ManageTeam;