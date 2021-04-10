import React, { useRef } from 'react';
import styles from './ManageSheets.module.css';
import AddButton from '../AddButton';
import SelectSortBy from '../SelectSortBy';
import SearchInput from '../SearchInput';
import Table from '../ReusableTable';
import { fetchData, searchData, sortData } from '../ReusableTable/ReusableTableSlice';
import { useAppDispatch } from '../../app/hooks';
import { Container, CssBaseline, Paper } from '@material-ui/core';
import SheetService from '../../api/Sheet.service';
import { GridSelectionModelChangeParams } from '@material-ui/data-grid';
import UButton from '../UButton';


export interface ManageSheetsProps { };

const ManageSheets: React.FC< ManageSheetsProps > = () => {
  const api = new SheetService();
  const dispatch = useAppDispatch();
  const selectedSheets = useRef([] as string[]);

  const tableName = 'Sheets';

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
    await api.createSheet();
    dispatch(fetchData(tableName, api.getSheets));
  }

  const handleSheetSelection = (params: GridSelectionModelChangeParams) => {
    selectedSheets.current = params.selectionModel as string[];
  }

  const deleteSelectedSheets = () => {
    selectedSheets.current.forEach((sheetId) => {
      api.deleteSheet(sheetId);
    })
    dispatch(fetchData(tableName, api.getSheets));
    selectedSheets.current = [];
  }
  
  return (
    <Container className={styles.manageSheets} aria-label='Manage Sheets'>
      <CssBaseline />
      <Paper className={styles.mainHeader}>
        <h2>Sheets</h2>
        <span className={styles.searchInput}>
          <SearchInput onSubmit={changeSearch} placeholder='Search by ID or mentor surname' />
        </span>
      </Paper>
      <Paper className={styles.container}>
        <div className={styles.manageContainer}>
          <h2 className={styles.manageHeader}>Manage Sheets</h2>
          <div className={styles.buttons}>
            <AddButton text='Add' onClick={handleAddClick} aria-label='Add sheet'/>
            <UButton text="Delete" color="secondary" onClick={deleteSelectedSheets}/>
          </div>
          <span className={styles.selectSortBy}>
            <SelectSortBy onChange={changeSortBy} initialValue='' options={sortByOptions}/>
          </span>
        </div>
        <div className={styles.table}>
          <Table 
            name={tableName} 
            columns={columns} 
            getData={api.getSheets} 
            onSelectionModelChange={handleSheetSelection}
            checkboxSelection
          />
        </div>
      </Paper>
    </Container>
  );
};

export default ManageSheets;