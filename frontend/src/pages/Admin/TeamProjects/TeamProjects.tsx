import React, { useState, useEffect } from 'react'
import styles from './TeamProjects.module.css'
import ReusableTable from '../../../components/ReusableTable/index'
import { CssBaseline, Paper } from '@material-ui/core'
import SearchInput from '../../../components/SearchInput'
import { useAppDispatch } from '../../../hooks/hooks'
import { filterData } from '../../../components/ReusableTable/ReusableTableSlice'
import TeamProject from '../TeamProject/index'
import { fetchData } from '../../../components/ReusableTable/ReusableTableSlice'
import PageHeader from '../../../components/PageHeader'

export interface TeamProjectsProps {
  getFunction: () => Promise<any[]>
}

interface MainViewProps {
  detailedView: boolean
}

enum HeaderText {
  MAIN = 'Team Projects',
  EDIT = `Edit Team Project`,
}

const TeamProjects: React.FC<TeamProjectsProps> = (props) => {
  const dispatch = useAppDispatch()
  const [detailedView, setDetailedView] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState({})
  const [search, setSearch] = useState('')
  const [tableDisplay, setTableDisplay] = useState('initial')
  const getFunction = props.getFunction

  const changeSearch = (value: string) => {
    setSearch(value)
  }

  useEffect(() => {
    const f = {
      column: 'Name',
      values: [search],
    }
    dispatch(filterData({ table: 'Manage Team Projects', filters: [f] }))
  }, [search, dispatch])

  const columns = [
    { field: 'Name', width: 250, sortable: true },
    { field: 'Mentor', width: 250, sortable: true },
    { field: 'ReferenceProject', width: 250, sortable: true },
    { field: 'Section', width: 250, sortable: true },
  ]

  const Header = (detailedView: boolean) => {
    return detailedView ? (
      <PageHeader name={HeaderText.EDIT} />
    ) : (
      <PageHeader name={HeaderText.MAIN}>
        <SearchInput
          onSubmit={changeSearch}
          placeholder="Search for project name"
        />
      </PageHeader>
    )
  }

  const EditView = () => {
    return (
      <TeamProject
        //@ts-ignore
        _id={selectedProjectId}
        changeViewFn={() => {
          setTableDisplay('initial')
          setDetailedView(false)
          dispatch(fetchData('Manage Team Projects', getFunction))
        }}
      />
    )
  }

  const MainView = (props: MainViewProps) => {
    return props.detailedView ? (
      <div>
        <EditView />
      </div>
    ) : null
  }

  return (
    <CssBaseline>
      <div>{Header(detailedView)}</div>

      <Paper className={styles.main}>
        <MainView detailedView={detailedView} />
        <div className={styles.table} style={{ display: tableDisplay }}>
          <ReusableTable
            name="Manage Team Projects"
            getData={getFunction}
            columns={columns}
            onRowClick={(params, e) => {
              setDetailedView(true)
              setSelectedProjectId(params.row.id)
              setTableDisplay('none')
            }}
          />
        </div>
      </Paper>
    </CssBaseline>
  )
}

export default TeamProjects
