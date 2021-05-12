import React, { useState, useEffect } from 'react'
import styles from './TeamProjects.module.css'
import ReusableTable, {
  ReusableTableReactQuery,
} from '../../../components/ReusableTable/index'
import { CssBaseline, Paper } from '@material-ui/core'
import { useAppDispatch } from '../../../hooks/hooks'
import { filterData } from '../../../components/ReusableTable/ReusableTableSlice'
import { getTeamProjects } from '../../../api/TeamProjects.service'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../../components/PageHeader'
import SearchInput from '../../../components/SearchInput'
import ReusableGoBack from '../../../components/ReusableGoBack'
import { useTeamProjects } from '../../../hooks/useQuery/useTeamProjects'

export interface TeamProjectsProps {}

const TeamProjects: React.FC<TeamProjectsProps> = () => {
  const { data, ...restQuery } = useTeamProjects()
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
      field: 'name',
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
        <div className={styles.table}>
          <ReusableTableReactQuery
            name={'Team projects'}
            columns={columns}
            onRowClick={(params) => history.push(`/teamprojects/${params.id}`)}
            {...restQuery}
            data={data?.map((d) => ({
              id: d.id,
              name: d.mentor ? `${d.mentor?.name} ${d.mentor?.surname}` : '-',
              projectName: d.referenceProject?.projectName ?? '-',
              sectionName: (() => {
                console.log('SA', d.section?.sectionName ?? '-')
                return d.section?.sectionName ?? '-'
              })(),
              teamProjectName: d.teamProjectName,
            }))}
          />
        </div>
      </Paper>
    </CssBaseline>
  )
}

export default TeamProjects
