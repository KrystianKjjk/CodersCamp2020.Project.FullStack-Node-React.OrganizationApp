import React, { useState, useEffect } from 'react'
import styles from './TeamProjects.module.css'
import ReusableTable from '../../../components/ReusableTable/index'
import { CssBaseline, Paper } from '@material-ui/core'
import { useAppDispatch } from '../../../hooks/hooks'
import { filterData } from '../../../components/ReusableTable/ReusableTableSlice'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../../components/PageHeader'
import SearchInput from '../../../components/SearchInput'
import { useTeamProjects } from '../../../hooks/useQuery/useTeamProjects'

export interface TeamProjectsProps {}

const TeamProjects: React.FC<TeamProjectsProps> = () => {
  const info = useTeamProjects()
  const history = useHistory()
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState('')

  useEffect(() => {
    const f = {
      column: 'Name',
      values: [search],
    }
    dispatch(filterData({ table: 'Manage Team Projects', filters: [f] }))
  }, [search, dispatch])

  const columns = [
    {
      field: 'teamProjectName',
      width: 250,
      sortable: true,
      headerName: 'Project name',
    },
    {
      field: 'mentorName',
      width: 250,
      sortable: true,
      headerName: 'Mentor name',
    },
    { field: 'sectionName', width: 250, sortable: true, headerName: 'Section' },
  ]

  return (
    <CssBaseline>
      <PageHeader name={'Team Projects'}>
        <SearchInput
          onSubmit={setSearch}
          placeholder="Search for project name"
        />
      </PageHeader>
      <Paper className={styles.main}>
        <ReusableTable
          name={'Team projects'}
          columns={columns}
          onRowClick={(params) => history.push(`/teamprojects/${params.id}`)}
          {...info}
        />
      </Paper>
    </CssBaseline>
  )
}

export default TeamProjects
