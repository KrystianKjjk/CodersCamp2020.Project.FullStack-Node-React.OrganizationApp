import React from 'react';
import { useHistory } from 'react-router-dom';
//
import { Container, CssBaseline, Paper } from '@material-ui/core';
import { GridValueFormatterParams } from '@material-ui/data-grid';
//
import styles from './ManageSections.module.css';
import SelectSortBy from '../../../components/SelectSortBy';
import SearchInput from '../../../components/SearchInput';
import Table from '../../../components/ReusableTable';
import { searchData, sortData } from '../../../components/ReusableTable/ReusableTableSlice';
import { useAppDispatch } from '../../../app/hooks';
import SectionService from '../../../api/ManageSection.service';
import UButton from "../../../components/UButton";
import { getActiveCourse } from '../../../app/utils';

export interface ManageSectionsProps {

}

const ManageSections: React.FC< ManageSectionsProps > = () => {
  const sectionService = new SectionService();

  const dispatch = useAppDispatch();
  const history = useHistory();
  const tableName = 'Sections';
  const courseActive = getActiveCourse();
  const displayFormattedDate = (date: number) => {
    if (!date) return '';
    const dateObject = new Date(date * 1000);

    return `${dateObject.toLocaleDateString()}`;
  }

  const changeSortBy = (value: string) => {
    dispatch(sortData({table: tableName, column: value }));
  };

  const changeSearch = (value: string) => {
    const searchQuery = {
      table: tableName,
      column: /^[0-9a-fA-F]{1,16}$/.test(value) ? 'id' : 'name',
      search: value,
    }
    dispatch(searchData(searchQuery));
  };
  
  const handleRowClick = (data: {id: string | number}) => {
    history.push(`/sections/${data.id}/edit`);
  };

  const handleAddClick = () => {
    history.push('/sections/create');
  };

  const sortByOptions = ['name', 'startDate', 'endDate', 'courseName'];
  const columns = [
    {field: 'name', headerName: 'Name', width: 200, sortable: true},
    {field: 'startDate', headerName: 'Start date', width: 200, sortable: true, valueFormatter: (params: GridValueFormatterParams) => displayFormattedDate((params.value) as number)},
    {field: 'endDate', headerName: 'End date', width: 200, sortable: true, valueFormatter: (params: GridValueFormatterParams) => displayFormattedDate((params.value) as number)},
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
          <span className={styles.addButton} aria-label='Add section'>
            <UButton text='ADD' color='primary' onClick={handleAddClick}/>
          </span>
          <span className={styles.selectSortBy}>
            <SelectSortBy onChange={changeSortBy} initialValue='' options={sortByOptions}/>
          </span>
        </div>
        <div className={styles.table}>
          <Table name={tableName} columns={columns} onRowClick={handleRowClick} getData={() => courseActive ? sectionService.getSectionsByCourseId(courseActive._id) : sectionService.getSections()}/>
        </div>
        </Paper>
    </Container>
  );
};

export default ManageSections;