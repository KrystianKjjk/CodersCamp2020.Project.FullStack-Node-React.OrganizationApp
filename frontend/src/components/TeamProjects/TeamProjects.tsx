import React, { useState, useEffect } from 'react';
import styles from './TeamProjects.module.css';
import ReusableTable from '../ReusableTable/index'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import getTeamProjects from '../../api/getTeamProjects'
import { Button } from '@material-ui/core';


export interface TeamProjectsProps {
  course: string;
}

enum HeaderText {
  MAIN = "TEAM PROJECTS",
  EDIT = `EDIT TEAM PROJECT`
}


const TeamProjects: React.FC<TeamProjectsProps> = props => {

  const [detailedView, setDetailedView] = useState(false);
  const [selectedProjectData, setSelectedProjectData] = useState({});

  const dispatch = useAppDispatch();

  const getProjects = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRmYmFlMWEyZTM4ZDAwMTVlZTQxZWQiLCJ0eXBlIjozLCJpYXQiOjE2MTY3OTA3NDksImV4cCI6MTYxNjc5MTk0OX0.cYNseRM97U7IgwXKVQgRwBVd7SQWpeHJ4grgWUqsf6w';
    // window.localStorage.getItem('token')''
    return getTeamProjects(token);
  }

  const columns = [
    { field: 'Name', width: 300 },
    { field: 'URL', width: 200 },
    { field: 'Description', width: 500 }
  ];

  const Header = (detailedView: boolean): HeaderText => {
    return detailedView ? HeaderText.EDIT : HeaderText.MAIN
  }

  const Table = () => {
    return (
      <div className={styles.table}>
        <Button className={styles.editButton}>Edit</Button>
        <ReusableTable
          name="Manage Team Projects"
          getData={getProjects}
          columns={columns}
          onRowClick={(params, e) => {
              setDetailedView(true);
              setSelectedProjectData(params.row);
          }}

        />
      </div>
    )
  }
  //@ts-ignore
  const MainView = (props) => {
    return props.detailedView ? <div onClick={() => setDetailedView(false)}>Placeholder for edit mode</div> : <Table/>
  }

  return (
    <div>
      <div className={styles.header}>
        <h2>{Header(detailedView)}</h2>
      </div>

      <div className={styles.main}>
        <MainView detailedView={detailedView}/>
      </div>
    </div>
  );
};

export default TeamProjects;