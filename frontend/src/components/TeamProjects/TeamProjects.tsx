import React, { useEffect } from 'react';
import styles from './TeamProjects.module.css';
import ReusableTable from '../ReusableTable/index'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import getTeamProjects from '../../api/getTeamProjects'
import { Button } from '@material-ui/core';


export interface TeamProjectsProps {
  course: string;
}
const TeamProjects: React.FC< TeamProjectsProps > = props => {
  const dispatch = useAppDispatch();   
 
  const getProjects = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRmYmFlMWEyZTM4ZDAwMTVlZTQxZWQiLCJ0eXBlIjozLCJpYXQiOjE2MTY3OTA3NDksImV4cCI6MTYxNjc5MTk0OX0.cYNseRM97U7IgwXKVQgRwBVd7SQWpeHJ4grgWUqsf6w';
    // window.localStorage.getItem('token')''
    return getTeamProjects(token);
  }

  const columns = [ 
                    {field: 'Name', width: 300}, 
                    {field: 'URL', width: 200}, 
                    {field: 'Description', width: 500}
                  ];

  return (
    <div>   
      <div className={styles.header}>
        <h2>TEAM PROJECTS</h2>

      </div>

      <div className={styles.table}>
      <Button className={styles.editButton}
      <ReusableTable name="" getData={getProjects} columns={columns}/>
      </div>        
    </div>
  );
};

export default TeamProjects;