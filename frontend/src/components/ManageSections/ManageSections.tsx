import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
//
import { Container, CssBaseline, Paper } from '@material-ui/core';
import { GridValueFormatterParams } from '@material-ui/data-grid';
//
import styles from './ManageSections.module.css';
import AddButton from '../AddButton';
import SelectSortBy from '../SelectSortBy';
import SearchInput from '../SearchInput';
import Table from '../ReusableTable';
import { filterData, sortData } from '../ReusableTable/ReusableTableSlice';
import { useAppDispatch } from '../../app/hooks';
import SectionService from '../../api/Section.service';

export interface ManageSectionsProps {

}

const ManageSections: React.FC< ManageSectionsProps > = () => {
  const sectionService = new SectionService();

  const dispatch = useAppDispatch();
  const [sortBy, setSortBy] = useState('');
  const [search, setSearch] = useState('');
  const displayFormattedDate = (date: Date) => {
    if (!date) return '';

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

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

  const history = useHistory();

  const handleRowClick = (data: {id: string | number}) => {
    history.push(`/sections/${data.id}/edit`)
  }

  const sortByOptions = ['name', 'startDate', 'endDate', 'courseName'];
  const columns = [
    {field: 'name', headerName: 'Name', width: 200, sortable: true},
    {field: 'startDate', headerName: 'Start date', width: 200, sortable: true, valueFormatter: (params: GridValueFormatterParams) => displayFormattedDate((params.value) as Date)},
    {field: 'endDate', headerName: 'End date', width: 200, sortable: true, valueFormatter: (params: GridValueFormatterParams) => displayFormattedDate((params.value) as Date)},
    {field: 'courseName', headerName: 'Course name', width: 150, sortable: true},
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
          <span onClick={undefined} className={styles.addButton} aria-label='Add section'>
            <AddButton text='Add'/>
          </span>
          <span className={styles.selectSortBy}>
            <SelectSortBy onChange={changeSortBy} initialValue='' options={sortByOptions}/>
          </span>
        </div>
        <div className={styles.table}>
          <Table name='Sections' columns={columns} onRowClick={handleRowClick} getData={() => sectionService.getSections()}/>
        </div>
        </Paper>
    </Container>
  );
};

export default ManageSections;