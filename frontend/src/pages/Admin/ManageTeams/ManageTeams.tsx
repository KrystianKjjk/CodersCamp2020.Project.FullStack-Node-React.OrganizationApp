import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, CssBaseline, Paper } from '@material-ui/core'
import { GridSelectionModelChangeParams } from '@material-ui/data-grid'
import styles from './ManageTeams.module.css'
import AddButton from '../../../components/AddButton'
import SelectSortBy from '../../../components/SelectSortBy'
import SearchInput from '../../../components/SearchInput'
import ReusableTable from '../../../components/ReusableTable'
import PageHeader from '../../../components/PageHeader'
import DeleteButton from '../../../components/DeleteButton'
import {
  useTeams,
  sortTeams,
  searchTeam,
  useDeleteTeam,
  useAppSelector,
} from '../../../hooks'
import { Team } from '../../../models'
import { CreateTeam } from '../CreateTeam'

export interface ManageTeamsProps {}

const ManageTeams: FC<ManageTeamsProps> = () => {
  const history = useHistory()
  const { activeCourse } = useAppSelector((state) => state.courseList)
  const [selectedTeams, setSelectedTeams] = useState<string[]>([])
  const { data: teams, isLoading, isFetching, error } = useTeams(
    activeCourse?._id,
  )
  const { mutate: deleteTeam } = useDeleteTeam()
  const [isCreateTeam, setIsCreateTeam] = useState(false)

  // TODO: mobile view

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
    setSelectedTeams([...params.selectionModel] as string[])
  }

  const deleteSelectedTeams = () => {
    selectedTeams.forEach((teamId) => {
      deleteTeam(teamId)
    })
    setSelectedTeams([])
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
          {isCreateTeam ? (
            <CreateTeam setIsCreateTeam={setIsCreateTeam} />
          ) : (
            <>
              <h2 className={styles.manageHeader}>Manage Teams</h2>
              <span className={styles.selectSortBy}>
                <SelectSortBy
                  onChange={changeSortBy}
                  initialValue=""
                  options={sortByOptions}
                />
              </span>
              <div className={styles.buttons}>
                <AddButton
                  text="Add"
                  onClick={() => setIsCreateTeam(true)}
                  aria-label="Add team"
                />
                <DeleteButton
                  confirmTitle={`Are you sure you want to delete selected (${selectedTeams.length}) teams?`}
                  onConfirm={deleteSelectedTeams}
                />
              </div>
            </>
          )}
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
