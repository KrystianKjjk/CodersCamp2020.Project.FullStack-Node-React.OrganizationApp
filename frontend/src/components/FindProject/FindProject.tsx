import React, { useState } from 'react'
import { Backdrop, Fade, Modal, MuiThemeProvider } from '@material-ui/core'

import ReusableTable from '../ReusableTable'
import SearchInput from '../SearchInput'

import styles from './FindProject.module.css'
import { mainTheme } from '../../theme/customMaterialTheme'
import { useProjects } from '../../hooks'

export interface FindSectionProps {
  selectedProjectId?: string
  isOpen: boolean
  handleClose: any
  onSectionSelection: any
}

const FindProject: React.FC<FindSectionProps> = (props) => {
  const { data: projects, ...restData } = useProjects()
  const [searchedName, setSearchedName] = useState('')

  const handleRowClick = (params: any) => {
    props.onSectionSelection(params.row)
  }

  const onSearch = (name: string) => {
    setSearchedName(name)
  }

  const columns = [
    { field: 'projectName', width: 200, headerName: 'Project Name' },
    { field: 'sectionName', width: 200, headerName: 'section Name' },
    { field: 'startDate', width: 130, headerName: 'Start date' },
    { field: 'endDate', width: 130, headerName: 'End date' },
  ]
  const displayedProjects =
    projects &&
    projects.filter(
      (p) =>
        p.projectName.toLowerCase().includes(searchedName.toLowerCase()) ||
        p.sectionName.toLowerCase().includes(searchedName.toLowerCase()),
    )
  return (
    <MuiThemeProvider theme={mainTheme}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={styles.modal}
        open={props.isOpen}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.isOpen}>
          <div className={styles.container}>
            <div className={styles.container__header}>
              <span>Select project</span>
            </div>

            <div className={styles.container__body}>
              <div className={styles.container__body__search}>
                <SearchInput onSubmit={onSearch} placeholder="Search by name" />
              </div>
              <div className={styles.container__body__table}>
                <ReusableTable
                  name="Projects"
                  columns={columns}
                  onRowClick={handleRowClick}
                  data={displayedProjects}
                  {...restData}
                />
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </MuiThemeProvider>
  )
}

export default FindProject
