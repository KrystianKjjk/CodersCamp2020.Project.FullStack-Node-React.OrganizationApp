import React, { useEffect, useState } from 'react';
import styles from './ManageSections.module.css';
import AddButton from '../AddButton';
import SelectSortBy from '../SelectSortBy';
import SearchInput from '../SearchInput';
import Table from '../ReusableTable';
import { filterData, sortData } from '../ReusableTable/ReusableTableSlice';
import { useAppDispatch } from '../../app/hooks';
import { Container, CssBaseline, Paper } from '@material-ui/core';

export interface ManageSectionsProps {
  getSections: () => Promise<any[]>;
  onClickAdd: () => void;
}

const ManageSections: React.FC< ManageSectionsProps > = ({ getSections, onClickAdd }) => {

  const dispatch = useAppDispatch();
  const [sortBy, setSortBy] = useState('');
  const [search, setSearch] = useState('');

  const changeSortBy = (value: string) => {
    setSortBy(value);
  };
  const changeSearch = (value: string) => {
    setSearch(value);
  }

  useEffect(() => {
    dispatch(sortData({table: 'Sections', column: sortBy }));
  }, [sortBy]);
  useEffect(() => {
    const f = {
      column: /^[0-9a-fA-F]{1,16}$/.test(search) ? 'id' : 'name',
      values: [ search ],
    }
    dispatch(filterData({table: 'Sections', filters: [ f ]}));
  }, [search]);

  const sortByOptions = ['name', 'startDate', 'endDate', 'courseName'];
  const columns = [
    {field: 'name', headerName: 'Name', width: 150, sortable: true},
    {field: 'startDate', headerName: 'Start date', width: 100, sortable: true},
    {field: 'endDate', headerName: 'End date', width: 100, sortable: true},
    {field: 'courseName', headerName: 'Course name', width: 200, sortable: true},
  ]

  return (
    <Container className={styles.manageSections} aria-label='Manage Sections'>
      <CssBaseline />
      <Paper className={styles.mainHeader}>
        <h2>Sections</h2>
        <span className={styles.searchInput}>
          <SearchInput onSubmit={changeSearch} placeholder='Search by ID or section name' />
        </span>
      </Paper>
      <Paper className={styles.container}>
        <div className={styles.manageContainer}>
          <h2 className={styles.manageHeader}>Manage Sections</h2>
          <span onClick={onClickAdd} className={styles.addButton} aria-label='Add section'>
            <AddButton text='Add'/>
          </span>
          <span className={styles.selectSortBy}>
            <SelectSortBy onChange={changeSortBy} initialValue='' options={sortByOptions}/>
          </span>
        </div>
        <div className={styles.table}>
          <Table name='Sections' columns={columns} getData={getSections}/>
        </div>
        </Paper>
    </Container>
  );
};

export default ManageSections;