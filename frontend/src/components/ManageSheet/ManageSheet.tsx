import React, { useEffect, useRef, useState } from 'react';
import styles from './ManageSheet.module.css';
import AddButton from '../AddButton';
import UButton from '../UButton';
import Table from '../ReusableTable';
import FindModal from '../FindModal';
import { Container, CssBaseline, Link, Paper } from '@material-ui/core';
import { TeamProject, User, Participant } from '../../models';
import { SheetService, UserService } from '../../api';
import { GridSelectionModelChangeParams } from '@material-ui/data-grid';
import { useParams } from "react-router-dom";


export interface ManageSheetProps { };

const ManageSheet: React.FC< ManageSheetProps > = () => {
  const api = new SheetService();
  const usersApi = new UserService();
  
  const [loading, setLoading] = useState<'loading' | 'idle'>('loading');
  const [mentor, setMentor] = useState<User>();
  const [project, setProject] = useState<TeamProject>();
  const [reviewers, setReviewers] = useState<User[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  // const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [openMentorsModal, setOpenMentorsModal] = useState<boolean>(false);
  const [openProjectsModal, setOpenProjectsModal] = useState<boolean>(false);
  const [openUsersModal, setOpenUsersModal] = useState<boolean>(false);

  // const selectedUsers = useRef<string[]>([]);

  let { sheetId } = useParams<{sheetId: string}>();

  useEffect(() => {
    api.getSheet(sheetId)
      .then(sheet => {
        setMentor({
          id: sheet.mentorID,
          name: sheet.mentorName,
          surname: sheet.mentorSurname,
        });
        setProject({
          id: sheet.projectID,
          name: sheet.projectName,
          url: sheet.projectUrl,
          description: sheet.projectDescription,
        });
        const reviewersArr = sheet.reviewers.map((rev) => ({
          ...rev,
          id: rev._id,
        }))
        setReviewers(reviewersArr);
        setParticipants(sheet.participants);
        setLoading('idle');
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetId]);

  const handleMentorSelection = (row: User) => {
    setOpenMentorsModal(false);
    api.setMentor(sheetId, row.id);
    setMentor({ 
      id: row.id, 
      name: row.name, 
      surname: row.surname });
  };

  let getParticipants = () => Promise.resolve(participants as Participant[]);

  const handleAddUserSelection = (row: User) => {
    setOpenUsersModal(false);
    api.addParticipantToSheet(sheetId, row.id);
    setParticipants([...participants, row]);
    getParticipants = () => Promise.resolve(participants as Participant[]);
  };

  // const columns = [
  //   {field: 'surname', headerName: 'Last name', width: 150, sortable: true},
  //   {field: 'name', headerName: 'First name', width: 150, sortable: true},
  //   {field: 'averageGrade', headerName: 'Average grade', width: 150, sortable: true},
  //   {field: 'status', headerName: 'Status', width: 150, sortable: true},
  // ]

  // const handleUserSelection = (params: GridSelectionModelChangeParams) => {
  //   selectedUsers.current = params.selectionModel as string[];
  // }

  // const deleteSelectedUsers = () => {
  //   selectedUsers.current.forEach((user) => {
  //     api.deleteUserFromTeam(sheetId, user);
  //   })
  //   setTeamMembers( teamMembers.filter( (user) => !( selectedUsers.current.includes(user.id) ) ) )
  //   selectedUsers.current = [];
  // }

  const mentorColumns = [
    {field: 'name', headerName: 'Mentor name', width: 270},
    {field: 'surname', headerName: 'Mentor surname', width: 250},
  ];

  const participantColumns = [
    {field: 'name', headerName: 'Participant name', width: 270},
    {field: 'surname', headerName: 'Participant surname', width: 250},
  ];

  // const projectColumns = [
  //   {field: 'name', headerName: 'Name', width: 270},
  //   {field: 'overallGrade', headerName: 'Overall grade', width: 270},
  //   {field: 'sectionName', headerName: 'Section', width: 270},
  // ];

  return (
    <>
      {
        loading === 'loading' ? <p>...Loading</p> :
        (<Container className={styles.manageSheet} aria-label='Manage Sheet'>
          <CssBaseline />
          <Paper className={styles.mainHeader}>
            <h2>
              <Link href="/teams" color="inherit">Sheets</Link>
              <span> / </span>
              <span className={styles.sheetId}>{mentor ? `${mentor.name} ${mentor.surname}` : sheetId}</span>
            </h2>
          </Paper>
          <Paper className={styles.container}>
            <Container className={styles.manageHeader}>
              <h2>Manage Sheet</h2>
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
                  <span>Project:</span>
                  <span>{project?.name ?? '---'}</span>
                  <UButton test-id='change-mentor' text="Change" color="primary" onClick={() => setOpenProjectsModal(true)}/>
                </li>
                <li className={styles.teamInfoRow}>
                  <span>Mentor:</span>
                  <span>{mentor?.name ?? '---'} {mentor?.surname ?? '---'}</span>
                  <UButton test-id='change-mentor' text="Change" color="primary" onClick={() => setOpenMentorsModal(true)}/>
                </li>
              </ul>
              <ul className={styles.teamInfo}>
              <li className={styles.teamInfoRow}>
                  <span>Url:</span>
                  <span>{project?.url ?? '---'}</span>
                </li>
                <li className={styles.teamInfoRow}>
                  <span>Description:</span>
                  <span>{project?.description ?? '---'}</span>
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
                  columns={participantColumns}
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
                  aria-label='Add participant' 
                  text='Add'
                  onClick={() => setOpenUsersModal(true)}
                />
                <UButton text="Delete" color="secondary" onClick={deleteSelectedUsers}/>
              </div>
            </div>
            <div className={styles.table}>
              <Table 
                aria-label='Team members table'
                name='Team' 
                columns={columns} 
                getData={getTeamMemebers} 
                checkboxSelection={true}
                onSelectionModelChange={handleUserSelection}
              />
            </div>
            <div className={styles.manageContainer}>
              <h2 className={styles.manageHeader}>Projects</h2>
            </div>
            <div className={styles.table}>
              <Table 
                name='TeamProjects' 
                columns={projectColumns} 
                getData={() => Promise.resolve(projects)} 
              />
            </div>
          </Paper>
        </Container>)
      }
    </>
  );
};

export default ManageSheet;