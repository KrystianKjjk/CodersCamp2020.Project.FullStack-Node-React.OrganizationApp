import React, { useEffect, useRef, useState } from 'react';
import styles from './ManageSheet.module.css';
import AddButton from '../AddButton';
import UButton from '../UButton';
import Table from '../ReusableTable';
import FindModal from '../FindModal';
import { Container, CssBaseline, Link, Paper } from '@material-ui/core';
import { User, Grades, SheetGrade, Reviewer } from '../../models';
import _ from 'lodash';
import { SheetService, UserService, getTeamProjects } from '../../api';
import { GridSelectionModelChangeParams } from '@material-ui/data-grid';
import { useParams } from "react-router-dom";
import { fetchData } from '../ReusableTable/ReusableTableSlice';
import { useAppDispatch } from '../../app/hooks';
import EditGradeModal from '../EditGradeModal';

type Grade = (SheetGrade) & {quality: string};

function gradesObjectToArray(grades: Grades): Grade[] {
  return Object.entries(grades).map(([quality, grade]) => ({
    ...grade,
    quality,
    id: quality,
  }) )
};

export interface ManageSheetProps { };

const ManageSheet: React.FC< ManageSheetProps > = () => {
  const api = new SheetService();
  const usersApi = new UserService();
  const mentorGradesTableName = 'Mentor Grades';
  const participantsTableName = 'Participants';
  const dispatch = useAppDispatch();
  
  const [loading, setLoading] = useState<'loading' | 'idle'>('loading');
  const [mentor, setMentor] = useState<User>();
  const [project, setProject] = useState({
    id: '',
    Name: '---',
    Mentor: '--- ---',
    projectUrl: '---',
    description: '---',
  });
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [mentorGrades, setMentorGrades] = useState<Grades>({});
  
  const selectedParticipants = useRef<string[]>([]);
  const selectedGrades = useRef<string[]>([]);
  
  const [openMentorsModal, setOpenMentorsModal] = useState<boolean>(false);
  const [openProjectsModal, setOpenProjectsModal] = useState<boolean>(false);
  const [openReviewersModal, setOpenReviewersModal] = useState<boolean>(false);
  const [openUsersModal, setOpenUsersModal] = useState<boolean>(false);

  const [editedGrade, setEditedGrade] = useState<Grade>({
    quality: '',
    points: 0,
  });

  let { sheetId } = useParams<{sheetId: string}>();

  const loadSheet = () => {
    api.getSheet(sheetId)
      .then(sheet => {
        setMentor({
          id: sheet.mentorID,
          name: sheet.mentorName,
          surname: sheet.mentorSurname,
        });
        setProject({
          id: sheet.projectID,
          Name: sheet.projectName,
          Mentor: `${sheet.mentorName} ${sheet.mentorSurname}`,
          projectUrl: sheet.projectUrl,
          description: sheet.projectDescription,
        });
        const reviewersArr = sheet.reviewers.map((rev) => ({
          ...rev,
          id: rev._id,
        }))
        setReviewers(reviewersArr);
        setMentorGrades(sheet.mentorGrades);
        setLoading('idle');
        setOpenUsersModal(false);
      });
  }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadSheet, []);

  const handleMentorSelection = (row: User) => {
    setOpenMentorsModal(false);
    api.setMentor(sheetId, row.id)
      .then(() => {
        setMentor({ 
          id: row.id, 
          name: row.name, 
          surname: row.surname });
      })
      .catch(error => console.log(error));
    
  };

  let getParticipants = async () => api.getParticipants(sheetId);
  let getMentorGrades = async () => gradesObjectToArray( await api.getMentorGrades(sheetId) );
  
  const handleAddUserSelection = (row: User) => {
    api.addParticipant(sheetId, row.id)
      .then(() => {
        loadSheet();
      })
      .catch(error => console.log(error));
  };

  const handleProjectSelection = (row: any) => {
    setOpenProjectsModal(false);
    api.setProject(sheetId, row.id)
      .then(() => setProject(row))
      .catch((error) => console.log(error));
  }

  const handleReviewerSelection = (row: any) => {
    setOpenReviewersModal(false);
    api.addReviewer(sheetId, row.id)
      .then(loadSheet)
      .catch(error => console.log(error));
  }

  const deleteReviewer = (id: string) => {
    const newReviewers = reviewers
      .map(rev => rev._id)
      .filter(rev => rev !== id);
    api.setReviewers(sheetId, newReviewers)
      .then(loadSheet)
      .catch(error => console.log(error));
  }

  const handleParticipantSelection = (row: GridSelectionModelChangeParams) => {
    selectedParticipants.current = row.selectionModel as string[];
  }

  const deleteSelectedUsers = () => {
    Promise.all( selectedParticipants.current.map(user => api.deleteParticipant(sheetId, user) ) )
      .then( () => loadSheet() );
    selectedParticipants.current = [];
  }

  const handleGradeSelection = (row: GridSelectionModelChangeParams) => {
    selectedGrades.current = row.selectionModel as string[];
  }

  const handleEditGrade = (grade: Grades) => {
    const newGrades = {
      ...mentorGrades,
      ...grade,
    }
    if (editedGrade.quality !== Object.keys(grade)[0])
      delete newGrades[editedGrade.quality];
    
    api.patchMentorGrade(sheetId, newGrades)
      .then( () => dispatch(fetchData(mentorGradesTableName, getMentorGrades)) )
      .catch(error => console.log(error));
  }

  const deleteSelectedGrades = () => {
    const newMentorGrades = _.omit(mentorGrades, selectedGrades.current)
    api.patchMentorGrade(sheetId, newMentorGrades)
      .then( () => dispatch(fetchData(mentorGradesTableName, getMentorGrades)) );
    selectedGrades.current = [];
    setMentorGrades(newMentorGrades);
  }

  const addMentorGrade = (id: string, grade: Grade) => {
    const newGrades = {
      [grade.quality]: _.omit(grade, 'quality')
    }
    api.setMentorGrade(id, newGrades)
      .then( () => dispatch(fetchData(mentorGradesTableName, getMentorGrades)) )
      .catch( error => console.log(error) );
    setMentorGrades( { ...mentorGrades, ...newGrades } );
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

  const projectColumns = [
    {field: 'Name', headerName: 'Name', width: 250},
    {field: 'Mentor', headerName: 'Mentor', width: 250},
    {field: 'projectUrl', headerName: 'Url', width: 250},
    {field: 'Section', headerName: 'Mentor', width: 250},
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
              openProjectsModal && 
              <FindModal<User> 
                onRowSelection={handleProjectSelection} 
                getData={getTeamProjects} 
                columns={projectColumns}
                searchPlaceholder='Search by name'
                searchBy='name'
                name='Find project'
                open={openProjectsModal}
                handleClose={() => setOpenProjectsModal(false)}
                handleOpen={() => setOpenProjectsModal(true)}
              />
            }
            { 
              openReviewersModal && 
              <FindModal<User> 
                onRowSelection={handleReviewerSelection} 
                getData={() => usersApi.getUsersOfType('Mentor')} 
                columns={mentorColumns}
                searchPlaceholder='Search by surname'
                searchBy='surname'
                name='Find mentor reviewer'
                open={openReviewersModal}
                handleClose={() => setOpenReviewersModal(false)}
                handleOpen={() => setOpenReviewersModal(true)}
              />
            }
              <ul className={styles.teamInfo}>
              <li className={styles.teamInfoRow}>
                  <span>Project:</span>
                  <span>{project.Name}</span>
                  <UButton test-id='change-mentor' text="Change" color="primary" onClick={() => setOpenProjectsModal(true)}/>
                </li>
                <li className={styles.teamInfoRow}>
                  <span>Mentor:</span>
                  <span>{mentor?.name ?? '---'} {mentor?.surname ?? '---'}</span>
                  <UButton test-id='change-mentor' text="Change" color="primary" onClick={() => setOpenMentorsModal(true)}/>
                </li>
                <li className={styles.reviewersInfo}>
                  <span>Reviewers:</span>
                  <ul className={styles.reviewers}>
                    {reviewers.map(reviewer => (
                      <li className={styles.reviewerInfoRow} key={reviewer._id}>
                        <span>{reviewer.name} {reviewer.surname}</span>
                        <UButton color="secondary" text="Delete" onClick={() => deleteReviewer(reviewer._id)} />
                      </li>  
                    ))}
                    <li>
                      <AddButton text="Add reviewer" onClick={() => setOpenReviewersModal(true)}/>
                    </li>
                  </ul>
                </li>
              </ul>
              
              <ul className={styles.teamInfo}>
              <li className={styles.teamInfoRow}>
                  <span>Url:</span>
                  <span>{project.projectUrl}</span>
                </li>
                <li className={styles.teamInfoRow}>
                  <span>Description:</span>
                  <span>{project.description}</span>
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
                editedGrade.quality && 
                <EditGradeModal
                  quality={editedGrade.quality}
                  initPoints={editedGrade.points}
                  initComment={editedGrade.comment}
                  initDescription={editedGrade.description}
                  onClickSave={handleEditGrade}
                  open={!!editedGrade.quality}
                  handleClose={() => setEditedGrade({quality: '', points: 0})}
                  handleOpen={() => 0}
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
                onRowClick={params => setEditedGrade({
                  quality: params.row.quality, 
                  points: params.row.points,
                  comment: params.row.comment,
                  description: params.row.description,
                })}
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