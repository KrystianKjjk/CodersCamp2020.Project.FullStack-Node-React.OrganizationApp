import React, { useEffect, useState } from 'react';
import styles from './ManageTeam.module.css';
import AddButton from '../AddButton';
import Table from '../ReusableTable';
import { Button, Container, CssBaseline, Link, Paper } from '@material-ui/core';
import { TeamInfo, User } from '../../models';


export interface ManageTeamProps {
  teamId: string;
  getTeamInfo: (id: string) => Promise<TeamInfo>;
  onClickAdd: () => void;
}

const ManageTeam: React.FC< ManageTeamProps > = ({ teamId, getTeamInfo, onClickAdd }) => {

  const [loading, setLoading] = useState<'loading' | 'idle'>('loading');
  const [teamInfo, setTeamInfo] = useState<TeamInfo>();
  const [teamMembers, setTeamMembers] = useState<User[]>();

  useEffect(() => {
    getTeamInfo(teamId)
      .then(team => {
        setTeamInfo(team);
        setTeamMembers(team.users);
      });
  }, [teamId]);
  useEffect(() => {
    if(teamMembers && teamInfo) setLoading('idle');
  }, [teamInfo, teamMembers])
  
  const columns = [
    {field: 'surname', headerName: 'Last name', width: 150, sortable: true},
    {field: 'name', headerName: 'First name', width: 150, sortable: true},
    {field: 'averageGrade', headerName: 'Average grade', width: 150, sortable: true},
    {field: 'status', headerName: 'Status', width: 150, sortable: true},
  ]
  
  return (
    <>
      {
        loading === 'loading' ? <p>...Loading</p> :
        teamInfo && (<Container className={styles.manageTeams} aria-label='Manage Teams'>
          <CssBaseline />
          <Paper className={styles.mainHeader}>
            <h2><Link href="/teams" color="inherit">Teams</Link> / <span className={styles.teamId}>{teamId}</span></h2>
          </Paper>
          <Paper className={styles.container}>
            <Container className={styles.manageHeader}>
              <h2>Manage Team</h2>
            </Container>
            <div>
              <ul className={styles.teamInfo}>
                <li className={styles.teamInfoRow}>
                  <span>Mentor:</span>
                  <span>{teamInfo.mentor.name} {teamInfo.mentor.surname}</span>
                  <Button>Change</Button>
                </li>
                <li className={styles.teamInfoRow}>
                  <span>Average grade:</span>
                  <span>{teamInfo.teamAvgGrade}%</span>
                </li>
              </ul>
            </div>
          </Paper>
          <Paper className={styles.container}>
            <div className={styles.manageContainer}>
              <h2 className={styles.manageHeader}>Users</h2>
              <span onClick={onClickAdd} className={styles.addButton} aria-label='Add user'>
                <AddButton text='Add'/>
              </span>
            </div>
            <div className={styles.table}>
              <Table name='Team' columns={columns} getData={() => Promise.resolve(teamMembers as User[])}/>
            </div>
            <div className={styles.manageContainer}>
              <h2 className={styles.manageHeader}>Projects</h2>
            </div>
            <div>
              Project
            </div>
          </Paper>
        </Container>)
      }
    </>
  );
};

export default ManageTeam;