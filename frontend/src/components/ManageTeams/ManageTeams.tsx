import React, { useEffect, useState } from 'react';
import styles from './ManageTeams.module.css';
import AddButton from '../AddButton';
import SelectSortBy from '../SelectSortBy';
import SearchInput from '../SearchInput';
import Table from '../ReusableTable';
import { filterData, sortData } from '../ReusableTable/ReusableTableSlice';
import { useAppDispatch } from '../../app/hooks';


export interface ManageTeamsProps {
  getTeams: () => Promise<any[]>;
  onClickAdd: () => void;
}

const ManageTeams: React.FC< ManageTeamsProps > = ({ getTeams, onClickAdd }) => {

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
    dispatch(sortData({table: 'Teams', column: sortBy }));
  }, [sortBy]);
  useEffect(() => {
    const f = {
      column: /^[0-9a-fA-F]{1,16}$/.test(search) ? 'id' : 'surname',
      values: [ search ],
    }
    dispatch(filterData({table: 'Teams', filters: [ f ]}));
  }, [search]);

  const sortByOptions = ['name', 'surname', 'type', 'status'];
  const columns = [
    {field: 'surname', headerName: 'Mentor surname', width: 150, sortable: true},
    {field: 'name', headerName: 'Mentor name', width: 150, sortable: true},
    {field: 'courseName', headerName: 'Course name', width: 150, sortable: true},
  ]
  
  return (
    <div className={styles.container} aria-label='Manage Teams'>
      <div className={styles.mainHeader}>
        <h2>Teams</h2>
        <SearchInput onSubmit={changeSearch} placeholder='Search by ID or mentor surname' />
      </div>
      <div className={styles.manageContainer}>
        <h2 className={styles.manageHeader}>Manage Teams</h2>
        <span onClick={onClickAdd} className={styles.addButton} aria-label='Add team'>
          <AddButton text='Add'/>
        </span>
        <span className={styles.selectSortBy}>
          <SelectSortBy onChange={changeSortBy} initialValue='' options={sortByOptions}/>
        </span>
        <h3 className={styles.checkboxesHeader}>Sorting options</h3>
      </div>
      <Table name='Teams' columns={columns} getData={getTeams}/>
    </div>
  );
};

export default ManageTeams;