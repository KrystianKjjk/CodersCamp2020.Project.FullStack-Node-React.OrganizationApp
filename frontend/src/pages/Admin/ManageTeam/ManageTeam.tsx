import React, { useRef, useState } from 'react'
import styles from './ManageTeam.module.css'
import AddButton from '../../../components/AddButton'
import UButton from '../../../components/UButton'
import ReusableTable from '../../../components/ReusableTable'
import { Container, CssBaseline, Paper } from '@material-ui/core'
import { User } from '../../../models'
import { GridSelectionModelChangeParams } from '@material-ui/data-grid'
import { useParams } from 'react-router-dom'
import DeleteButton from '../../../components/DeleteButton'
import PageHeader from '../../../components/PageHeader'
import ReusableGoBack from '../../../components/ReusableGoBack'
import {
  useAddUserToTeam,
  useDeleteUserFromTeam,
  useParticipantsNotInTeam,
  useSetMentor,
  useTeam,
  useUsersOfType,
} from '../../../hooks'
import FindModal from '../../../components/FindModal/FindModal'

export interface ManageTeamProps {}

const ManageTeam: React.FC<ManageTeamProps> = () => {
  const [openMentorsModal, setOpenMentorsModal] = useState<boolean>(false)
  const [openUsersModal, setOpenUsersModal] = useState<boolean>(false)

  const selectedUsers = useRef<string[]>([])

  let { teamId } = useParams<{ teamId: string }>()
  const { data: team, isLoading, isFetching, error } = useTeam(teamId)
  const participantsNotInTeamQuery = useParticipantsNotInTeam({
    enabled: openUsersModal,
  })
  const mentorsQuery = useUsersOfType('Mentor', {
    enabled: openMentorsModal,
  })
  const { mutate: setMentor } = useSetMentor()
  const { mutate: addUserToTeam } = useAddUserToTeam()
  const { mutate: deleteUserFromTeam } = useDeleteUserFromTeam()

  const handleMentorSelection = (row: User) => {
    setOpenMentorsModal(false)
    setMentor([teamId, row.id])
  }

  const handleAddUserSelection = (row: User) => {
    setOpenUsersModal(false)
    addUserToTeam([teamId, row.id])
  }

  const columns = [
    { field: 'surname', headerName: 'Last name', width: 150, sortable: true },
    { field: 'name', headerName: 'First name', width: 150, sortable: true },
    {
      field: 'averageGrade',
      headerName: 'Average grade',
      width: 150,
      sortable: true,
    },
    { field: 'status', headerName: 'Status', width: 150, sortable: true },
  ]

  const handleUserSelection = (params: GridSelectionModelChangeParams) => {
    selectedUsers.current = params.selectionModel as string[]
  }

  const deleteSelectedUsers = () => {
    selectedUsers.current.forEach((user) => {
      deleteUserFromTeam([teamId, user])
    })
    selectedUsers.current = []
  }

  const mentorColumns = [
    { field: 'name', headerName: 'Mentor name', width: 270 },
    { field: 'surname', headerName: 'Mentor surname', width: 250 },
  ]

  const participantColumns = [
    { field: 'name', headerName: 'Participant name', width: 270 },
    { field: 'surname', headerName: 'Participant surname', width: 250 },
  ]

  const projectColumns = [
    { field: 'name', headerName: 'Name', width: 270 },
    { field: 'overallGrade', headerName: 'Overall grade', width: 270 },
    { field: 'sectionName', headerName: 'Section', width: 270 },
  ]

  return (
    <Container className={styles.manageTeams} aria-label="Manage Teams">
      <CssBaseline />
      <PageHeader>
        <ReusableGoBack
          pageName="Teams"
          pageLink="/teams"
          elementName={
            team?.mentor
              ? `${team?.mentor?.name} ${team?.mentor?.surname}`
              : teamId
          }
        />
      </PageHeader>
      <Paper className={styles.container}>
        <Container className={styles.manageHeader}>
          <h2>Manage Team</h2>
        </Container>
        <div>
          {openMentorsModal && (
            <FindModal<User>
              onRowSelection={handleMentorSelection}
              query={mentorsQuery}
              queryKey='Mentors'
              columns={mentorColumns}
              searchPlaceholder="Search by surname"
              searchBy="surname"
              name="Find mentor"
              open={openMentorsModal}
              handleClose={() => setOpenMentorsModal(false)}
              handleOpen={() => setOpenMentorsModal(true)}
            />
          )}
          <ul className={styles.teamInfo}>
            <li className={styles.teamInfoRow}>
              <span>Mentor:</span>
              <span>
                {team?.mentor?.name ?? '---'} {team?.mentor?.surname ?? '---'}
              </span>
              <UButton
                test-id="change-mentor"
                text="Change"
                color="primary"
                onClick={() => setOpenMentorsModal(true)}
              />
            </li>
            <li className={styles.teamInfoRow}>
              <span>Average grade:</span>
              <span>{team?.teamAvgGrade}%</span>
            </li>
          </ul>
        </div>
      </Paper>
      <Paper className={styles.container}>
        <div className={styles.manageContainer}>
          {openUsersModal && (
            <FindModal<User>
              onRowSelection={handleAddUserSelection}
              query={participantsNotInTeamQuery}
              queryKey="participantsNotInTeam"
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
              aria-label="Add user"
              text="Add"
              onClick={() => setOpenUsersModal(true)}
            />
            <DeleteButton
              confirmTitle={`Are you sure you want to delete selected (${selectedUsers.current.length}) users?`}
              onConfirm={deleteSelectedUsers}
            />
          </div>
        </div>
        <div className={styles.table}>
          <ReusableTable
            aria-label="Team members table"
            name="Team"
            columns={columns}
            data={team?.users}
            isLoading={isLoading}
            isFetching={isFetching}
            error={error}
            checkboxSelection={true}
            onSelectionModelChange={handleUserSelection}
          />
        </div>
        <div className={styles.manageContainer}>
          <h2 className={styles.manageHeader}>Projects</h2>
        </div>
        <div className={styles.table}>
          <ReusableTable
            name="TeamProjects"
            columns={projectColumns}
            data={team?.projects}
            isLoading={isLoading}
            isFetching={isFetching}
            error={error}
          />
        </div>
      </Paper>
    </Container>
  )
}

export default ManageTeam
