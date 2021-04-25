import React, { useRef, useState } from 'react';
import styles from './ManageTeams.module.css';
import AddButton from '../AddButton';
import SelectSortBy from '../SelectSortBy';
import SearchInput from '../SearchInput';
import Table from '../ReusableTable';
import { fetchData, searchData, sortData } from '../ReusableTable/ReusableTableSlice';
import { useAppDispatch } from '../../app/hooks';
import { Container, CssBaseline, Paper } from '@material-ui/core';
import { TeamService } from '../../api';
import { GridSelectionModelChangeParams } from '@material-ui/data-grid';
import UButton from '../UButton';
import { useHistory } from 'react-router-dom';
import ConfirmationDialog from '../ConfirmationDialog';


export interface ManageTeamsProps { };

const ManageTeams: React.FC< ManageTeamsProps > = () => {
  const api = new TeamService();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const selectedTeams = useRef([] as string[]);
  const [isOpen, setIsOpen]=useState(false);

  const tableName = 'Teams';

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

  const sortByOptions = ['name', 'surname', 'courseName'];
  const columns = [
    {field: 'surname', headerName: 'Mentor surname', width: 200, sortable: true},
    {field: 'name', headerName: 'Mentor name', width: 150, sortable: true},
    {field: 'courseName', headerName: 'Course name', width: 250, sortable: true},
  ]

  const handleAddClick = async () => {
    await api.createTeam();
    dispatch(fetchData(tableName, api.getTeams));
  }

  const handleTeamSelection = (params: GridSelectionModelChangeParams) => {
    selectedTeams.current = params.selectionModel as string[];
  }

  const deleteSelectedTeams = () => {
    selectedTeams.current.forEach((teamId) => {
      api.deleteTeam(teamId);
    })
    dispatch(fetchData(tableName, api.getTeams));
    selectedTeams.current = [];
    setIsOpen(false);
  }

  const handleRowClick = (data: {id: string | number}) => {
    history.push(`/teams/${data.id}`);
  };

  const handleOpenDeleteConfirmation = () => {
    setIsOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setIsOpen(false);
  };
  
  return (
    <Container className={styles.manageTeams} aria-label='Manage Teams'>
      <ConfirmationDialog
            title="Are you sure you want to delete this team?"
            content="This action is irreversible."
            isOpen={isOpen}
            onClose={handleCloseDeleteConfirmation }
            handleConfirm={deleteSelectedTeams}
            handleCancel={handleCloseDeleteConfirmation}
        />
      <CssBaseline />
      <Paper className={styles.mainHeader}>
        <h2>Teams</h2>
        <span className={styles.searchInput}>
          <SearchInput onSubmit={changeSearch} placeholder='Search by ID or mentor surname' />
        </span>
      </Paper>
      <Paper className={styles.container}>
        <div className={styles.manageContainer}>
          <h2 className={styles.manageHeader}>Manage Teams</h2>
          <div className={styles.buttons}>
            <AddButton text='Add' onClick={handleAddClick} aria-label='Add team'/>
            <UButton text="Delete" color="secondary" onClick={handleOpenDeleteConfirmation}/>
          </div>
          <span className={styles.selectSortBy}>
            <SelectSortBy onChange={changeSortBy} initialValue='' options={sortByOptions}/>
          </span>
        </div>
        <div className={styles.table}>
          <Table 
            name={tableName} 
            columns={columns} 
            getData={api.getTeams} 
            onSelectionModelChange={handleTeamSelection}
            onRowClick={handleRowClick}
            checkboxSelection
          />
        </div>
      </Paper>
    </Container>
  );
};

export default ManageTeams;