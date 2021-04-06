import React, { useState, useEffect } from 'react';
import styles from './TeamProjects.module.css';
import ReusableTable from '../ReusableTable/index'
import { CssBaseline, Paper } from '@material-ui/core';
import SearchInput from '../SearchInput';
import { useAppDispatch } from '../../app/hooks';
import { filterData } from '../ReusableTable/ReusableTableSlice';

export interface TeamProjectsProps {
  course: string,
  getFunction: () => Promise<any[]>,
  editComponent: Function
}

interface MainViewProps {
  detailedView: boolean,
  editComponent: Function
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

  const changeSearch = (value: string) => {
    setSearch(value);
  }

  useEffect(() => {
    const f = {
      column: 'Name',
      values: [ search ]
    }
    dispatch(filterData({table: 'Manage Team Projects', filters: [ f ]}));
  }, [search]);

  const columns = [
    { field: 'Name', width: 250, sortable: true },
    { field: 'Mentor', width: 250, sortable: true },
    { field: 'ReferenceProject', width: 250, sortable: true },
    { field: 'Section', width: 250, sortable: true },
  ];

  const Header = (detailedView: boolean) => {
    return detailedView ? HeaderText.EDIT : 
    (
    <div className={styles.header}>
        <h2>{HeaderText.MAIN}</h2>
        <SearchInput onSubmit={changeSearch} placeholder='Search for project name' />
    </div>      
    )
  } 

  const Table = () => {
    return (
      <div className={styles.table}>        
        <ReusableTable
          name="Manage Team Projects"
          getData={props.getFunction}
          columns={columns}
          onRowClick={(params, e) => {
              setDetailedView(true);
              setSelectedProjectId(params.row.id);
          }}
        />
      </div>      
    )
  }

const MainView = (props: MainViewProps) => {
    return props.detailedView ? <div onClick={() => setDetailedView(false)}>{props.editComponent()}</div> : <Table/>
  }

const EditView = () => {
  return props.editComponent(selectedProjectId, setDetailedView)
}

  return (
    <CssBaseline>
      <Paper aria-label='TeamProjectsHeader'>
        {Header(detailedView)}
      </Paper>

      <Paper className={styles.main}>
        <div className={styles.table}>        
        <ReusableTable
          name="Manage Team Projects"
          getData={props.getFunction}
          columns={columns}
          onRowClick={(params, e) => {
              setDetailedView(true);
              setSelectedProjectId(params.row.id);
          }}
        />
      </div>   
      </Paper>

    </CssBaseline>
  );
};


export default TeamProjects;