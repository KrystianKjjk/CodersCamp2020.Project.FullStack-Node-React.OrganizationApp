import React, { useEffect, useRef, useState } from 'react';
import styles from './ManageTeam.module.css';
import AddButton from '../AddButton';
import UButton from '../UButton';
import Table from '../ReusableTable';
import FindModal from '../FindModal';
import { Container, CssBaseline, Link, Paper } from '@material-ui/core';
import { TeamInfo, TeamProject, User } from '../../models';
import { TeamService, UserService } from '../../api';
import { GridSelectionModelChangeParams } from '@material-ui/data-grid';


export interface ManageTeamProps {
  teamId: string;
  getTeamInfo: (id: string) => Promise<TeamInfo>;
  onClickAdd: () => void;
}

const ManageTeam: React.FC< ManageTeamProps > = ({ teamId, onClickAdd }) => {
  const api = new TeamService();
  const usersApi = new UserService();
  const [loading, setLoading] = useState<'loading' | 'idle'>('loading');
  const [mentor, setMentor] = useState<User>();
  const [projects, setProjects] = useState<TeamProject[]>([]);
  const [avgGrade, setAvgGrade] = useState<number>();
  const [maxPoints, setMaxPoints] = useState<number>();
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [openMentorsModal, setOpenMentorsModal] = useState<boolean>(false);
  const [openUsersModal, setOpenUsersModal] = useState<boolean>(false);
  const selectedUsers = useRef<string[]>([]);

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
    const avg = teamMembers
      .reduce((acc: number, user: User) => user.averageGrade ?? 0 + acc, 0) / teamMembers.length;
    setAvgGrade(avg);
  }, [teamMembers])

  const handleMentorSelection = (row: User) => {
    setOpenMentorsModal(false);
    api.setMentor(teamId, row.id);
    setMentor({ 
      id: row.id, 
      name: row.name, 
      surname: row.surname });
  };

  let getTeamMemebers = () => Promise.resolve(teamMembers as User[]);

  const handleAddUserSelection = (row: User) => {
    setOpenUsersModal(false);
    api.addUserToTeam(teamId, row.id);
    console.log(row);
    setTeamMembers([...teamMembers, row]);
    getTeamMemebers = () => Promise.resolve(teamMembers as User[]);
  };

  const columns = [
    {field: 'surname', headerName: 'Last name', width: 150, sortable: true},
    {field: 'name', headerName: 'First name', width: 150, sortable: true},
    {field: 'averageGrade', headerName: 'Average grade', width: 150, sortable: true},
    {field: 'status', headerName: 'Status', width: 150, sortable: true},
  ]

  const handleUserSelection = (params: GridSelectionModelChangeParams) => {
    selectedUsers.current = params.selectionModel as string[];
    console.log(params)
  }

  const deleteSelectedUsers = () => {
    selectedUsers.current.forEach((user) => {
      api.deleteUserFromTeam(teamId, user);
    })
    setTeamMembers( teamMembers.filter( (user) => !( selectedUsers.current.includes(user.id) ) ) )
    selectedUsers.current = [];
  }

  const mentorColumns = [
    {field: 'name', width: 270},
    {field: 'surname', width: 250},
  ];
  
  return (
    <>
      {
        loading === 'loading' ? <p>...Loading</p> :
        (<Container className={styles.manageTeams} aria-label='Manage Teams'>
          <CssBaseline />
          <Paper className={styles.mainHeader}>
            <h2><Link href="/teams" color="inherit">Teams</Link> / <span className={styles.teamId}>{teamId}</span></h2>
          </Paper>
          <Paper className={styles.container}>
            <Container className={styles.manageHeader}>
              <h2>Manage Team</h2>
            </Container>
            <div>
            { 
              openMentorsModal && 
              <FindModal<User> 
                onRowSelection={handleMentorSelection} 
                getData={() => usersApi.getUsersOfType('Mentor')} 
                columns={mentorColumns}
                searchPlaceholder='Search by surname'
                searchBy='surname'
                name='Find mentor'
                open={openMentorsModal}
                handleClose={() => setOpenMentorsModal(false)}
                handleOpen={() => setOpenMentorsModal(true)}
              />
            }
              <ul className={styles.teamInfo}>
                <li className={styles.teamInfoRow}>
                  <span>Mentor:</span>
                  <span>{mentor?.name ?? '---'} {mentor?.surname ?? '---'}</span>
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
              { 
                openUsersModal && 
                <FindModal<User> 
                  onRowSelection={handleAddUserSelection} 
                  getData={() => usersApi.getParticipantsNotInTeam()} 
                  columns={mentorColumns}
                  searchPlaceholder='Search by surname'
                  searchBy='surname'
                  name="Find participant"
                  open={openUsersModal}
                  handleClose={() => setOpenUsersModal(false)}
                  handleOpen={() => setOpenUsersModal(true)}
                />
              }
              <h2 className={styles.manageHeader}>Users</h2>
              <div className={styles.buttons}>
                <AddButton 
                  aria-label='Add user' 
                  text='Add'
                  onClick={() => setOpenUsersModal(true)}
                />
                <UButton text="Delete" color="secondary" onClick={deleteSelectedUsers}/>
              </div>
            </div>
            <div className={styles.table}>
              <Table 
                name='Team' 
                columns={columns} 
                getData={getTeamMemebers} 
                checkboxSelection={true}
                onSelectionModelChange={(params) => handleUserSelection(params)}
              />
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