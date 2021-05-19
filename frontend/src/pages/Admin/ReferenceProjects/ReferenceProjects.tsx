import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'

import UButton from '../../../components/UButton'
import { ReusableTableReactQuery } from '../../../components/ReusableTable'

import styles from './ReferenceProjects.module.css'
import { mainTheme } from '../../../theme/customMaterialTheme'
import PageHeader from '../../../components/PageHeader'
import { useProjects } from '../../../hooks'
import useSnackbar from '../../../hooks/useSnackbar'

export interface ReferenceProjectsProps {}

const ReferenceProjects: React.FC<ReferenceProjectsProps> = () => {
  const history = useHistory()
  const { data: refProjects, isLoading, error, isFetching } = useProjects()
  const { showError } = useSnackbar()
  const activeCourse = localStorage.getItem('activeCourse')
  // const courseID: string = activeCourse ? JSON.parse(activeCourse)._id : null

  const columns = [
    { field: 'Name', width: 500 },
    { field: 'Section name', width: -1 },
  ]

  function handleSelection(params: any, e: any) {
    const sectionID: string = params.row.id
    const path = `projects/${sectionID}`
    history.push(path)
  }

  function handleAddButton(e: any) {
    const path = `projects/add`
    history.push(path)
  }

  if (error) showError((error as Error).message)

  if (isLoading) return <CircularProgress className={styles.loading} />

  return (
    <ThemeProvider theme={mainTheme}>
      <PageHeader name="Projects" />
      <Box className={styles.container}>
        <Box display="flex" className={styles.container__header}>
          <span>Manage Reference Projects</span>
          <div className={styles.container__header__button}>
            <UButton text="ADD" color="primary" onClick={handleAddButton} />
          </div>
        </Box>
        <div className={styles.projectsTable}>
          <ReusableTableReactQuery
            name=""
            columns={columns}
            onRowClick={handleSelection}
            isLoading={isLoading}
            error={error}
            data={refProjects}
            isFetching={isFetching}
          />
        </div>
      </Box>
    </ThemeProvider>
  )
}

export default ReferenceProjects
