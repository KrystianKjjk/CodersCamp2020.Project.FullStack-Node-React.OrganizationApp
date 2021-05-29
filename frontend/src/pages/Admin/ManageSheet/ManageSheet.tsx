import React, { useEffect, useRef, useState } from 'react'
import styles from './ManageSheet.module.css'
import AddButton from '../../../components/AddButton'
import UButton from '../../../components/UButton'
import ReusableTable from '../../../components/ReusableTable'
import { Container, CssBaseline, Paper } from '@material-ui/core'
import { User, Grades, SheetGrade, Reviewer } from '../../../models'
import _ from 'lodash'
import { GridSelectionModelChangeParams } from '@material-ui/data-grid'
import { useParams } from 'react-router-dom'
import EditGradeModal from '../../../components/EditGradeModal'
import DeleteButton from '../../../components/DeleteButton'
import PageHeader from '../../../components/PageHeader'
import ReusableGoBack from '../../../components/ReusableGoBack'
import {
  useAddReviewer,
  useAddUserToSheet,
  useDeleteUserFromSheet,
  usePatchMentorGrade,
  useSetMentorForSheet,
  useSetMentorGrade,
  useSetProjectForSheet,
  useSetReviewersForSheet,
  useSheet,
  useUsersOfType,
} from '../../../hooks'
import FindModal from '../../../components/FindModal/FindModal'
import { useTeamProjects } from '../../../hooks/useQuery/useTeamProjects'
import { TeamProjectDto } from '../../../api/TeamProjects.api'

type Grade = SheetGrade & { quality: string }

function gradesObjectToArray(grades: Grades): Grade[] {
  return Object.entries(grades).map(([quality, grade]) => ({
    ...grade,
    quality,
    id: quality,
  }))
}

export interface ManageSheetProps {}

const ManageSheet: React.FC<ManageSheetProps> = () => {
  const mentorGradesTableName = 'Mentor Grades'
  const participantsTableName = 'Participants'

  const [loading, setLoading] = useState<'loading' | 'idle'>('loading')
  const [mentor, setMentor] = useState<User>()
  const [project, setProject] = useState({
    id: '',
    Name: '---',
    Mentor: '--- ---',
    projectUrl: '---',
    description: '---',
  })
  const [reviewers, setReviewers] = useState<Reviewer[]>([])
  const [mentorGrades, setMentorGrades] = useState<Grades>({})

  const selectedParticipants = useRef<string[]>([])
  const selectedGrades = useRef<string[]>([])

  const [openMentorsModal, setOpenMentorsModal] = useState<boolean>(false)
  const [openProjectsModal, setOpenProjectsModal] = useState<boolean>(false)
  const [openReviewersModal, setOpenReviewersModal] = useState<boolean>(false)
  const [openUsersModal, setOpenUsersModal] = useState<boolean>(false)

  const [editedGrade, setEditedGrade] = useState<Grade>({
    quality: '',
    points: 0,
  })

  let { sheetId } = useParams<{ sheetId: string }>()
  const { data: sheet, error, isLoading, isFetching } = useSheet(sheetId)
  const { mutate: setMentorForSheet } = useSetMentorForSheet(sheetId, {})
  const { mutate: setProjectForSheet } = useSetProjectForSheet(sheetId, {})
  const { mutate: addParticipant } = useAddUserToSheet(sheetId, {})
  const { mutate: deleteParticipant } = useDeleteUserFromSheet(sheetId, {})
  const { mutate: addReviewer } = useAddReviewer(sheetId, {})
  const { mutate: setReviewersForSheet } = useSetReviewersForSheet(sheetId, {})
  const { mutate: patchMentorGrade } = usePatchMentorGrade(sheetId, {})
  const { mutate: setMentorGrade } = useSetMentorGrade(sheetId, {})
  // TODO: Mentor reviewers grades
  // const { mutate: patchMentorReviewerGrade } = usePatchMentorReviewerGrade(
  //   sheetId,
  //   {},
  // )
  // const { mutate: setMentorReviewerGrade } = useSetMentorReviewerGrade(
  //   sheetId,
  //   {},
  // )
  const participantsQuery = useUsersOfType('Participant', {
    enabled: openUsersModal,
  })
  const mentorsQuery = useUsersOfType('Mentor', {
    enabled: openMentorsModal || openReviewersModal,
  })
  const teamProjectsQuery = useTeamProjects({
    enabled: openProjectsModal,
  })

  useEffect(() => {
    if (sheet) {
      setMentor({
        id: sheet.mentorID,
        name: sheet.mentorName,
        surname: sheet.mentorSurname,
      })
      setProject({
        id: sheet.projectID,
        Name: sheet.projectName,
        Mentor: `${sheet.mentorName} ${sheet.mentorSurname}`,
        projectUrl: sheet.projectUrl,
        description: sheet.projectDescription,
      })
      const reviewersArr = sheet.reviewers.map((rev) => ({
        ...rev,
        id: rev._id,
      }))
      setReviewers(reviewersArr)
      setMentorGrades(sheet.mentorGrades)
      setLoading('idle')
      setOpenUsersModal(false)
    }
  }, [sheet])

  const handleMentorSelection = (row: User) => {
    setOpenMentorsModal(false)
    setMentorForSheet(row.id)
  }

  const handleAddUserSelection = (row: User) => {
    addParticipant(row.id)
  }

  const handleProjectSelection = (row: any) => {
    setOpenProjectsModal(false)
    setProjectForSheet(row.id)
  }

  const handleReviewerSelection = (row: any) => {
    setOpenReviewersModal(false)
    addReviewer(row.id)
  }

  const deleteReviewer = (id: string) => {
    const newReviewers = reviewers
      .map((rev) => rev._id)
      .filter((rev) => rev !== id)
    setReviewersForSheet(newReviewers)
  }

  const handleParticipantSelection = (row: GridSelectionModelChangeParams) => {
    selectedParticipants.current = row.selectionModel as string[]
  }

  const deleteSelectedUsers = () => {
    selectedParticipants.current.forEach((user) => deleteParticipant(user))
    selectedParticipants.current = []
  }

  const handleGradeSelection = (row: GridSelectionModelChangeParams) => {
    selectedGrades.current = row.selectionModel as string[]
  }

  const handleEditGrade = (grade: Grades) => {
    const newGrades = {
      ...mentorGrades,
      ...grade,
    }
    if (editedGrade.quality !== Object.keys(grade)[0])
      delete newGrades[editedGrade.quality]

    patchMentorGrade(newGrades)
  }

  const deleteSelectedGrades = () => {
    const newMentorGrades = _.omit(mentorGrades, selectedGrades.current)
    patchMentorGrade(newMentorGrades)
    selectedGrades.current = []
    setMentorGrades(newMentorGrades)
  }

  const addMentorGrade = (id: string, grade: Grade) => {
    const newGrades = {
      [grade.quality]: _.omit(grade, 'quality'),
    }
    setMentorGrade(newGrades)
    setMentorGrades({ ...mentorGrades, ...newGrades })
  }

  const mentorColumns = [
    { field: 'name', headerName: 'Mentor name', width: 270 },
    { field: 'surname', headerName: 'Mentor surname', width: 250 },
  ]

  const participantColumns = [
    { field: 'name', headerName: 'Participant name', width: 270 },
    { field: 'surname', headerName: 'Participant surname', width: 250 },
  ]

  const gradeColumns = [
    { field: 'quality', headerName: 'Quality', width: 270 },
    { field: 'points', headerName: 'Points', width: 250 },
    { field: 'comment', headerName: 'Comment', width: 250 },
  ]

  const projectColumns = [
    { field: 'teamProjectName', headerName: 'Name', width: 250 },
    { field: 'mentorName', headerName: 'Mentor', width: 250 },
    { field: 'projectUrl', headerName: 'Url', width: 250 },
    { field: 'sectionName', headerName: 'Section', width: 250 },
  ]

  if (loading === 'loading') return <p>...Loading</p>

  return (
    <Container className={styles.manageSheet} aria-label="Manage Sheet">
      <CssBaseline />
      <PageHeader>
        <ReusableGoBack
          pageName="Sheets"
          pageLink="/gradesheets"
          elementName={mentor ? `${mentor.name} ${mentor.surname}` : sheetId}
        />
      </PageHeader>

      <Paper className={styles.container}>
        <Container className={styles.manageHeader}>
          <h2>Manage Sheet</h2>
        </Container>
        <div>
          {openMentorsModal && (
            <FindModal<User>
              onRowSelection={handleMentorSelection}
              query={mentorsQuery}
              queryKey="Mentors"
              columns={mentorColumns}
              searchPlaceholder="Search by surname"
              searchBy="surname"
              name="Find mentor"
              open={openMentorsModal}
              handleClose={() => setOpenMentorsModal(false)}
              handleOpen={() => setOpenMentorsModal(true)}
            />
          )}
          {openProjectsModal && (
            <FindModal<TeamProjectDto>
              onRowSelection={handleProjectSelection}
              query={teamProjectsQuery}
              queryKey="teamProjects"
              columns={projectColumns}
              searchPlaceholder="Search by name"
              searchBy="teamProjectName"
              name="Find project"
              open={openProjectsModal}
              handleClose={() => setOpenProjectsModal(false)}
              handleOpen={() => setOpenProjectsModal(true)}
            />
          )}
          {openReviewersModal && (
            <FindModal<User>
              onRowSelection={handleReviewerSelection}
              query={mentorsQuery}
              queryKey="Mentors"
              columns={mentorColumns}
              searchPlaceholder="Search by surname"
              searchBy="surname"
              name="Find mentor reviewer"
              open={openReviewersModal}
              handleClose={() => setOpenReviewersModal(false)}
              handleOpen={() => setOpenReviewersModal(true)}
            />
          )}
          <ul className={styles.teamInfo}>
            <li className={styles.teamInfoRow}>
              <span>Project:</span>
              <span>{project.Name}</span>
              <UButton
                test-id="change-mentor"
                text="Change"
                color="primary"
                onClick={() => setOpenProjectsModal(true)}
              />
            </li>
            <li className={styles.teamInfoRow}>
              <span>Mentor:</span>
              <span>
                {mentor?.name ?? '---'} {mentor?.surname ?? '---'}
              </span>
              <UButton
                test-id="change-mentor"
                text="Change"
                color="primary"
                onClick={() => setOpenMentorsModal(true)}
              />
            </li>
            <li className={styles.reviewersInfo}>
              <span>Reviewers:</span>
              <ul className={styles.reviewers}>
                {reviewers.map((reviewer) => (
                  <li className={styles.reviewerInfoRow} key={reviewer._id}>
                    <span>
                      {reviewer.name} {reviewer.surname}
                    </span>
                    <DeleteButton
                      confirmTitle={`Are you sure you want to delete reviewer ${reviewer.name} ${reviewer.surname}?`}
                      onConfirm={() => deleteReviewer(reviewer._id)}
                    />
                  </li>
                ))}
                <li>
                  <AddButton
                    text="Add reviewer"
                    onClick={() => setOpenReviewersModal(true)}
                  />
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
          {openUsersModal && (
            <FindModal<User>
              onRowSelection={handleAddUserSelection}
              query={participantsQuery}
              queryKey="Participants"
              columns={participantColumns}
              searchPlaceholder="Search by surname"
              searchBy="surname"
              name="Find participant"
              open={openUsersModal}
              handleClose={() => setOpenUsersModal(false)}
              handleOpen={() => setOpenUsersModal(true)}
            />
          )}
          <h2 className={styles.manageHeader}>Users</h2>
          <div className={styles.buttons}>
            <AddButton
              aria-label="Add participant"
              text="Add"
              onClick={() => setOpenUsersModal(true)}
            />
            <DeleteButton
              confirmTitle="Are you sure you want to delete this user?"
              onConfirm={deleteSelectedUsers}
            />
          </div>
        </div>
        <div className={styles.table}>
          <ReusableTable
            aria-label="Participants table"
            name={participantsTableName}
            columns={participantColumns}
            data={sheet?.participants.map((user) => ({
              id: user.participantID,
              name: user.name,
              surname: user.surname,
            }))}
            isLoading={isLoading}
            isFetching={isFetching}
            error={error}
            checkboxSelection={true}
            onSelectionModelChange={handleParticipantSelection}
          />
        </div>
      </Paper>
      <Paper className={styles.container}>
        <div className={styles.manageContainer}>
          {editedGrade.quality && (
            <EditGradeModal
              quality={editedGrade.quality}
              initPoints={editedGrade.points}
              initComment={editedGrade.comment}
              initDescription={editedGrade.description}
              onClickSave={handleEditGrade}
              open={!!editedGrade.quality}
              handleClose={() => setEditedGrade({ quality: '', points: 0 })}
              handleOpen={() => 0}
            />
          )}
          <h2 className={styles.manageHeader}>Mentor grades</h2>
          <div className={styles.buttons}>
            <AddButton
              aria-label="Add grade"
              text="Add"
              onClick={() =>
                addMentorGrade(sheetId, { quality: '---', points: 0 })
              }
            />
            <DeleteButton
              confirmTitle="Are you sure you want to delete this grade?"
              onConfirm={deleteSelectedGrades}
            />
          </div>
        </div>
        <div className={styles.table}>
          <ReusableTable
            aria-label="Grades table"
            name={mentorGradesTableName}
            columns={gradeColumns}
            data={gradesObjectToArray(sheet?.mentorGrades ?? {})}
            isLoading={isLoading}
            isFetching={isFetching}
            error={error}
            onSelectionModelChange={handleGradeSelection}
            onRowClick={(params) =>
              setEditedGrade({
                quality: params.row.quality,
                points: params.row.points,
                comment: params.row.comment,
                description: params.row.description,
              })
            }
            checkboxSelection
          />
        </div>
      </Paper>
    </Container>
  )
}

export default ManageSheet
