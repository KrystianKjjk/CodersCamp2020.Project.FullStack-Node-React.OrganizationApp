import React, { useEffect, useState } from 'react';
import styles from './ManageTeam.module.css';
import AddButton from '../AddButton';
import UButton from '../UButton';
import Table from '../ReusableTable';
import FindModal from '../FindModal';
import { Container, CssBaseline, Link, Paper } from '@material-ui/core';
import { TeamInfo, TeamProject, User } from '../../models';
import { TeamService, UserService } from '../../api';


export interface ManageTeamProps {
  teamId: string;
  getTeamInfo: (id: string) => Promise<TeamInfo>;
  onClickAdd: () => void;
}

const ManageTeam: React.FC< ManageTeamProps > = ({ teamId, getTeamInfo, onClickAdd }) => {
  const api = new TeamService();
  const usersApi = new UserService();
  const [loading, setLoading] = useState<'loading' | 'idle'>('loading');
  const [mentor, setMentor] = useState<User>();
  const [projects, setProjects] = useState<TeamProject[]>();
  const [avgGrade, setAvgGrade] = useState<number>();
  const [maxPoints, setMaxPoints] = useState<number>();
  const [teamMembers, setTeamMembers] = useState<User[]>();
  const [openMentorsModal, setOpenMentorsModal] = useState<Boolean>(false);

  useEffect(() => {
    api.getTeam(teamId)
      .then(team => {
        setMentor(team.mentor);
        setProjects(team.projects);
        setAvgGrade(team.teamAvgGrade);
        setMaxPoints(team.maxPoints);
        setTeamMembers(team.users);
        setLoading('idle')
      });
  }, [teamId]);
  
  useEffect(() => {
    if(mentor)
      api.setMentor(teamId, mentor.id);
  }, [mentor])

  const handleMentorSelection = (row: User) => {
    setOpenMentorsModal(false);
    setMentor({ 
      id: row.id, 
      name: row.name, 
      surname: row.surname });
  };

  const columns = [
    {field: 'surname', headerName: 'Last name', width: 150, sortable: true},
    {field: 'name', headerName: 'First name', width: 150, sortable: true},
    {field: 'averageGrade', headerName: 'Average grade', width: 150, sortable: true},
    {field: 'status', headerName: 'Status', width: 150, sortable: true},
  ]
  const mentorColumns = [
    {field: 'name', width: 270},
    {field: 'surname', width: 250},
  ];
  
  return (
    <>
      {
        loading === 'loading' ? <p>...Loading</p> :
        mentor && (<Container className={styles.manageTeams} aria-label='Manage Teams'>
          <CssBaseline />
          <Paper className={styles.mainHeader}>
            <h2><Link href="/teams" color="inherit">Teams</Link> / <span className={styles.teamId}>{teamId}</span></h2>
          </Paper>
          <Paper className={styles.container}>
            <Container className={styles.manageHeader}>
              <h2>Manage Team</h2>
            </Container>
            <div>
            { openMentorsModal && (<FindModal onRowSelection={handleMentorSelection} dataPromise={usersApi.getMentors()} columns={mentorColumns}/>)}
              <ul className={styles.teamInfo}>
                <li className={styles.teamInfoRow}>
                  <span>Mentor:</span>
                  <span>{mentor.name} {mentor.surname}</span>
                  <UButton text="Change" color="primary" onClick={() => setOpenMentorsModal(true)}/>
                </li>
                <li className={styles.teamInfoRow}>
                  <span>Average grade:</span>
                  <span>{avgGrade}%</span>
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