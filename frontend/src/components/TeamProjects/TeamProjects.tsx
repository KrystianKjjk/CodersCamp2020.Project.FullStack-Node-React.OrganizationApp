import React, { useState, useEffect } from 'react';
import styles from './TeamProjects.module.css';
import ReusableTable from '../ReusableTable/index'
import { CssBaseline, Paper } from '@material-ui/core';
import SearchInput from '../SearchInput';
import { useAppDispatch } from '../../app/hooks';
import { filterData } from '../ReusableTable/ReusableTableSlice';
import TeamProject from '../TeamProject/index'
import { getTeamProjects } from '../../api/TeamProjects.service'

export interface TeamProjectsProps {}

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
    return detailedView ? <div className={styles.header}><h2>{HeaderText.EDIT}</h2></div> : 
    (
    <div className={styles.header}>
        <h2>{HeaderText.MAIN}</h2>
        <SearchInput onSubmit={changeSearch} placeholder='Search for project name' />
    </div>      
    )
  } 

const MainView = (props: MainViewProps) => {
    return props.detailedView ? <div onClick={() => setDetailedView(false)}><EditView/></div> : null
  }

const EditView = () => {
  //@ts-ignore
  return <TeamProject _id='123' changeViewFn={() => setDetailedView(false)}/>
}

  return (
    <CssBaseline>
      <Paper aria-label='TeamProjectsHeader'>
        {Header(detailedView)}
      </Paper>

      <Paper className={styles.main}>
        <MainView detailedView={detailedView}/>
        <div className={styles.table} style={{display : tableDisplay}}>        
        <ReusableTable
          name="Manage Team Projects"
          getData={getTeamProjects}
          columns={columns}
          onRowClick={(params, e) => {
              setDetailedView(true);
              setSelectedProjectId(params.row.id);
              console.log(selectedProjectId);
              setTableDisplay('none');
          }}
        />
      </div>   
      </Paper>
    </CssBaseline>
  );
};


export default TeamProjects;