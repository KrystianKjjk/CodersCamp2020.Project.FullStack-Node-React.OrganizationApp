import React, { useEffect, useRef, useState } from 'react';
import styles from './ManageSheet.module.css';
import AddButton from '../AddButton';
import UButton from '../UButton';
import Table from '../ReusableTable';
import FindModal from '../FindModal';
import { Container, CssBaseline, Link, Paper } from '@material-ui/core';
import { TeamProject, User, Participant, Grades, SheetGrade } from '../../models';
import _ from 'lodash';
import { SheetService, UserService } from '../../api';
import { GridSelectionModelChangeParams } from '@material-ui/data-grid';
import { useParams } from "react-router-dom";
import { fetchData, searchData, sortData } from '../ReusableTable/ReusableTableSlice';
import { useAppDispatch } from '../../app/hooks';

type Grade = (SheetGrade) & {quality: string};

function gradesObjectToArray(grades: Grades): Grade[] {
  return Object.entries(grades).map(([quality, grade]) => ({
    ...grade,
    quality,
    id: quality,
  }) )
};

function gradesArrayToObject(grades: Grade[]): Grades {
  return grades.reduce((obj, grade) => ({
      ...obj,
      [grade.quality]: _.omit(grade, 'quality'),
  }), {});
}

export interface ManageSheetProps { };

const ManageSheet: React.FC< ManageSheetProps > = () => {
  const api = new SheetService();
  const usersApi = new UserService();
  const mentorGradesTableName = 'Mentor Grades';
  const participantsTableName = 'Participants';
  const dispatch = useAppDispatch();
  
  const [loading, setLoading] = useState<'loading' | 'idle'>('loading');
  const [mentor, setMentor] = useState<User>();
  const [project, setProject] = useState<TeamProject>();
  const [reviewers, setReviewers] = useState<User[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [mentorGrades, setMentorGrades] = useState<Grade[]>([]);
  
  const selectedParticipants = useRef<string[]>([]);
  const selectedGrades = useRef<string[]>([]);
  // const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [openMentorsModal, setOpenMentorsModal] = useState<boolean>(false);
  const [openProjectsModal, setOpenProjectsModal] = useState<boolean>(false);
  const [openUsersModal, setOpenUsersModal] = useState<boolean>(false);
  const [openMentorGradesModal, setOpenMentorGradesModal] = useState<boolean>(false);

  // const selectedUsers = useRef<string[]>([]);

  let { sheetId } = useParams<{sheetId: string}>();
  console.log(sheetId);

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
        const participantsArr = sheet.participants.map(p => ({
          ...p,
          id: p.participantID,
        }))
        setParticipants(participantsArr);
        setMentorGrades( gradesObjectToArray(sheet.mentorGrades ?? {}) );
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

  let getParticipants = async () => api.getParticipants(sheetId);
  let getMentorGrades = async () => gradesObjectToArray( await api.getMentorGrades(sheetId) );

  const handleAddUserSelection = (row: User) => {
    setOpenUsersModal(false);
    api.addParticipant(sheetId, row.id);
    setParticipants([...participants, {...row, participantID: row.id}]);
    setTimeout(() => dispatch(fetchData(participantsTableName, getParticipants)), 300);
  };

  const handleParticipantSelection = (row: GridSelectionModelChangeParams) => {
    selectedParticipants.current = row.selectionModel as string[];
  }

  const deleteSelectedUsers = () => {
    selectedParticipants.current.forEach(user => {
      api.deleteParticipant(sheetId, user);
    })
    selectedParticipants.current = [];
    setTimeout(() => dispatch(fetchData(participantsTableName, getParticipants)), 300);
  }

  const handleGradeSelection = (row: GridSelectionModelChangeParams) => {
    selectedGrades.current = row.selectionModel as string[];
  }

  const deleteSelectedGrades = () => {
    const grades = gradesArrayToObject(mentorGrades);
    const newMentorGrades = _.omit(grades, selectedGrades.current)
    api.setMentorGrade(sheetId, newMentorGrades);
    selectedGrades.current = [];
    setMentorGrades( gradesObjectToArray(newMentorGrades) );
    setTimeout(() => dispatch(fetchData(mentorGradesTableName, getMentorGrades)), 300);
  }

  const addMentorGrade = (id: string, grade: Grade) => {
    const newGrades = {
      [grade.quality]: _.omit(grade, 'quality')
    }
    api.setMentorGrade(id, newGrades);
    setMentorGrades( gradesObjectToArray(newGrades) );
    setTimeout(() => dispatch(fetchData(mentorGradesTableName, getMentorGrades)), 300);
  }

  const mentorColumns = [
    {field: 'name', headerName: 'Mentor name', width: 270},
    {field: 'surname', headerName: 'Mentor surname', width: 250},
  ];

  const participantColumns = [
    {field: 'name', headerName: 'Participant name', width: 270},
    {field: 'surname', headerName: 'Participant surname', width: 250},
  ];

  const gradeColumns = [
    {field: 'quality', headerName: 'Quality', width: 270},
    {field: 'points', headerName: 'Points', width: 250},
    {field: 'comment', headerName: 'Comment', width: 250},
  ];

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
            { 
              // openProjectsModal && 
              // <FindModal<User> 
              //   onRowSelection={handleProjectSelection} 
              //   getData={() => usersApi.} 
              //   columns={mentorColumns}
              //   searchPlaceholder='Search by surname'
              //   searchBy='surname'
              //   name='Find mentor'
              //   open={openMentorsModal}
              //   handleClose={() => setOpenMentorsModal(false)}
              //   handleOpen={() => setOpenMentorsModal(true)}
              // />
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
                  getData={() => usersApi.getUsersOfType('Participant')} 
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
                aria-label='Participants table'
                name={participantsTableName} 
                columns={participantColumns} 
                getData={getParticipants} 
                checkboxSelection={true}
                onSelectionModelChange={handleParticipantSelection}
              />
            </div>
          </Paper>
          <Paper className={styles.container}>
            <div className={styles.manageContainer}>
              { 
                openMentorGradesModal && 
                <FindModal<Grade> 
                  onRowSelection={handleAddUserSelection} 
                  getData={() => Promise.resolve(mentorGrades)} 
                  columns={participantColumns}
                  searchPlaceholder='Search by surname'
                  searchBy='quality'
                  name="Add Grade"
                  open={openMentorGradesModal}
                  handleClose={() => setOpenMentorGradesModal(false)}
                  handleOpen={() => setOpenMentorGradesModal(true)}
                />
              }
              <h2 className={styles.manageHeader}>Mentor grades</h2>
              <div className={styles.buttons}>
                <AddButton 
                  aria-label='Add grade' 
                  text='Add'
                  onClick={() => addMentorGrade(sheetId, {quality: '---', points: 0})}
                  /*onClick={() => setOpenMentorGradesModal(true)*/
                />
                <UButton text="Delete" color="secondary" onClick={deleteSelectedGrades}/>
              </div>
            </div>
            <div className={styles.table}>
              <Table 
                aria-label='Grades table'
                name={mentorGradesTableName}
                columns={gradeColumns} 
                getData={getMentorGrades} 
                onSelectionModelChange={handleGradeSelection}
                checkboxSelection
              />
            </div>
          </Paper>
        </Container>)
      }
    </>
  );
};

export default ManageSheet;