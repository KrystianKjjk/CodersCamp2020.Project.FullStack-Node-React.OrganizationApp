import React, { useRef } from 'react'
import styles from './ManageTeams.module.css'
import AddButton from '../../../components/AddButton'
import SelectSortBy from '../../../components/SelectSortBy'
import SearchInput from '../../../components/SearchInput'
import ReusableTable from '../../../components/ReusableTable'
import { Container, CssBaseline, Paper } from '@material-ui/core'
import { GridSelectionModelChangeParams } from '@material-ui/data-grid'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../../components/PageHeader'
import DeleteButton from '../../../components/DeleteButton'
import {
  useTeams,
  sortTeams,
  searchTeam,
  useCreateTeam,
  useDeleteTeam,
  useAppSelector,
} from '../../../hooks'
import { Team } from '../../../models'

export interface ManageTeamsProps {}

const ManageTeams: React.FC<ManageTeamsProps> = () => {
  const history = useHistory()
  const { activeCourse } = useAppSelector((state) => state.courseList)
  const selectedTeams = useRef([] as string[])
  const { data: teams, isLoading, isFetching, error } = useTeams(activeCourse?._id)
  const { mutate: createTeam } = useCreateTeam()
  const { mutate: deleteTeam } = useDeleteTeam()

  const tableName = 'Teams'

  const changeSortBy = (value: string) => {
    sortTeams(value as keyof Team)
  }

  const changeSearch = (value: string) => {
    const column = /^[0-9a-fA-F]{1,16}$/.test(value) ? 'id' : 'surname'
    searchTeam(column, value)
  }

  const sortByOptions = ['name', 'surname', 'courseName']
  const columns = [
    {
      field: 'surname',
      headerName: 'Mentor surname',
      width: 200,
      sortable: true,
    },
    { field: 'name', headerName: 'Mentor name', width: 150, sortable: true },
    {
      field: 'courseName',
      headerName: 'Course name',
      width: 250,
      sortable: true,
    },
  ]

  const handleTeamSelection = (params: GridSelectionModelChangeParams) => {
    selectedTeams.current = [...params.selectionModel] as string[]
  }

  const deleteSelectedTeams = () => {
    selectedTeams.current.forEach((teamId) => {
      deleteTeam(teamId)
    })
    selectedTeams.current = []
  }

  const handleRowClick = (data: { id: string | number }) => {
    history.push(`/teams/${data.id}`)
  }

  return (
    <Container className={styles.manageTeams} aria-label="Manage Teams">
      <CssBaseline />
      <PageHeader name="Teams">
        <SearchInput
          onSubmit={changeSearch}
          placeholder="Search by ID or mentor surname"
        />
      </PageHeader>
      <Paper className={styles.container}>
        <div className={styles.manageContainer}>
          <h2 className={styles.manageHeader}>Manage Teams</h2>
          <div className={styles.buttons}>
            <AddButton
              text="Add"
              onClick={() => createTeam(activeCourse?._id)}
              aria-label="Add team"
            />
            <DeleteButton
              confirmTitle={`Are you sure you want to delete selected (${selectedTeams.current.length}) teams?`}
              onConfirm={deleteSelectedTeams}
            />
          </div>
          <span className={styles.selectSortBy}>
            <SelectSortBy
              onChange={changeSortBy}
              initialValue=""
              options={sortByOptions}
            />
          </span>
        </div>
        <div className={styles.table}>
          <ReusableTable
            name={tableName}
            columns={columns}
            data={teams}
            error={error}
            isLoading={isLoading}
            isFetching={isFetching}
            onSelectionModelChange={handleTeamSelection}
            onRowClick={handleRowClick}
            checkboxSelection
          />
        </div>
      </Paper>
    </Container>
  )
}

export default ManageTeams
