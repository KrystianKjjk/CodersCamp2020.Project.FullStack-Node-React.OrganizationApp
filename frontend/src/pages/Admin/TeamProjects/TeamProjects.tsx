import React, { useState, useEffect } from 'react'
import styles from './TeamProjects.module.css'
import ReusableTable from '../../../components/ReusableTable/index'
import { CssBaseline, Paper } from '@material-ui/core'
import { useAppDispatch } from '../../../app/hooks'
import { filterData } from '../../../components/ReusableTable/ReusableTableSlice'
import { getTeamProjects } from '../../../api/TeamProjects.service'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../../components/PageHeader'
import SearchInput from '../../../components/SearchInput'

export interface TeamProjectsProps {}

const TeamProjects: React.FC<TeamProjectsProps> = () => {
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
    { field: 'id', width: 250, sortable: true },
    {
      field: 'name',
      width: 250,
      sortable: true,
      headerName: 'Mentor name',
    },
    {
      field: 'teamProjectName',
      width: 250,
      sortable: true,
      headerName: 'Project name',
    },
    { field: 'Section', width: 250, sortable: true },
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
        <div className={styles.table}>
          <ReusableTable
            name="Manage Team Projects"
            getData={getTeamProjects}
            columns={columns}
            onRowClick={
              (params, e) => console.log(params)

              // history.push(`/teamprojects/${params.id}`)
            }
          />
        </div>
      </Paper>
    </CssBaseline>
  )
}

export default TeamProjects
