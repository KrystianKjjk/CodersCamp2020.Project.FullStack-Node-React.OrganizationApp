import React, { useState, useEffect } from 'react';
import styles from './TeamProjects.module.css';
import ReusableTable from '../../../components/ReusableTable/index'
import { CssBaseline, Paper } from '@material-ui/core';
import SearchInput from '../../../components/SearchInput';
import { useAppDispatch } from '../../../app/hooks';
import { filterData } from '../../../components/ReusableTable/ReusableTableSlice';
import TeamProject from '../TeamProject/index'
import {
  fetchData
} from '../../../components/ReusableTable/ReusableTableSlice';

export interface TeamProjectsProps {
  getFunction: () => Promise<any[]>
}

interface MainViewProps {
  detailedView: boolean
}

enum HeaderText {
  MAIN = "TEAM PROJECTS",
  EDIT = `EDIT TEAM PROJECT`
}

const TeamProjects: React.FC<TeamProjectsProps> = props => {
  
  const dispatch = useAppDispatch();
  const [detailedView, setDetailedView] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState({});  
  const [search, setSearch] = useState('');
  const [tableDisplay, setTableDisplay] = useState('initial');
  const getFunction = props.getFunction;

  const changeSearch = (value: string) => {
    setSearch(value);
  }

  useEffect(() => {
    const f = {
      column: 'Name',
      values: [ search ]
    }
    dispatch(filterData({table: 'Manage Team Projects', filters: [ f ]}));
  }, [search, dispatch]);

  const columns = [
    { field: 'Name', width: 250, sortable: true },
    { field: 'Mentor', width: 250, sortable: true },
    { field: 'ReferenceProject', width: 250, sortable: true },
    { field: 'Section', width: 250, sortable: true },
  ];

  const Header = (detailedView: boolean) => {
    return detailedView ? <><h2>{HeaderText.EDIT}</h2></> :
      (
        <>
          <h2>{HeaderText.MAIN}</h2>
          <SearchInput onSubmit={changeSearch} placeholder='Search for project name' />
        </>
      )
  }

const EditView = () => {
  
  //@ts-ignore
  return <TeamProject _id={selectedProjectId} changeViewFn={() => {
    setTableDisplay('initial');
    setDetailedView(false);
    dispatch(fetchData("Manage Team Projects", getFunction))
  }}/>
}

const MainView = (props: MainViewProps) => {
  return props.detailedView ? <div><EditView/></div> : null
}

  return (
    <CssBaseline>
      <Paper className={styles.header} aria-label='TeamProjectsHeader'>
        {Header(detailedView)}
      </Paper>

      <Paper className={styles.main}>
        <MainView detailedView={detailedView} />
        <div className={styles.table} style={{ display: tableDisplay }}>
          <ReusableTable
            name="Manage Team Projects"
            getData={getFunction}
            columns={columns}
            onRowClick={(params, e) => {
              setDetailedView(true);
              setSelectedProjectId(params.row.id);
              setTableDisplay('none');
            }}
          />
        </div>
      </Paper>
    </CssBaseline>
  );
};


export default TeamProjects;