import React, { useEffect, useState } from 'react';
import styles from './ManageTeam.module.css';
import AddButton from '../AddButton';
import Table from '../ReusableTable';
import { useAppDispatch } from '../../app/hooks';
import { Container, CssBaseline, Paper } from '@material-ui/core';


interface Project {
  name: string;
  overallGrade: number;
  sectionName: string;
  url: string;
  description: string;
};

export interface User {
  id: string;
  name: string;
  surname: string;
  status: string;
  averageGrade: number;
};

export interface TeamInfo {
  id: string;
  mentor: {
    name: string;
    surname: string;
  };
  users: User[];
  projects: Project[];
  teamAvgGrade: number;
  maxPoints: number;
}
export interface ManageTeamProps {
  teamId: string;
  getTeamInfo: (id: string) => Promise<TeamInfo>;
  onClickAdd: () => void;
}

const ManageTeam: React.FC< ManageTeamProps > = ({ teamId, getTeamInfo, onClickAdd }) => {

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<'loading' | 'idle'>('loading');
  const [teamInfo, setTeamInfo] = useState<TeamInfo>();
  const [teamMembers, setTeamMembers] = useState<User[]>();

  useEffect(() => {
    getTeamInfo(teamId)
      .then(team => {
        setTeamInfo(team);
        setTeamMembers(team.users);
        setLoading('idle');
      });
  }, [teamId]);
  
  const columns = [
    {field: 'surname', headerName: 'Last name', width: 200, sortable: true},
    {field: 'name', headerName: 'First name', width: 150, sortable: true},
    {field: 'averageGrade', headerName: 'Average grade', width: 250, sortable: true},
    {field: 'status', headerName: 'Status', width: 150, sortable: true},
  ]
  
  return (
    <>
      {
        loading === 'loading' ? <p>...Loading</p> :
        (<Container className={styles.manageTeams} aria-label='Manage Teams'>
          <CssBaseline />
          <Paper className={styles.mainHeader}>
            <h2>Manage Team</h2>
          </Paper>
          <Paper className={styles.container}>
            <div className={styles.manageContainer}>
              <h2 className={styles.manageHeader}>Users</h2>
              <span onClick={onClickAdd} className={styles.addButton} aria-label='Add user'>
                <AddButton text='Add'/>
              </span>
            </div>
            <div className={styles.table}>
              <Table name='Team' columns={columns} getData={() => Promise.resolve(teamMembers)}/>
            </div>
          </Paper>
        </Container>)
      }
    </>
  );
};

export default ManageTeam;