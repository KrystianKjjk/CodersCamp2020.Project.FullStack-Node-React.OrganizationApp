import React, { useEffect, useState } from 'react'
import { Backdrop, Fade, Modal, MuiThemeProvider } from '@material-ui/core'

import BaseService from '../../app/baseService'
import SectionsService from '../../api/sections.service'
import ReusableTable from '../ReusableTable'
import SearchInput from '../SearchInput'

import styles from './FindProject.module.css'
import { mainTheme } from '../../theme/customMaterialTheme'

export interface FindSectionProps {
  selectedProjectId?: string
  isOpen: boolean
  handleClose: any
  onSectionSelection: any
}

const FindProject: React.FC<FindSectionProps> = (props) => {
  const sectionsService = new SectionsService(new BaseService())

  const [isUpdate, setIsUpdate] = useState(false)
  const [search, setSearch] = useState('')
  const [sections, setSections] = useState<any>([])
  const [filteredSections, setFilteredSections] = useState<any>([])

  useEffect(() => {
    getSections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const result = sections.filter((section: any) => {
      return section.name.match(search)
    })
    setIsUpdate(false)
    setFilteredSections([...result])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  useEffect(() => {
    setIsUpdate(false)
  }, [sections])

  useEffect(() => {
    setIsUpdate(true)
  }, [filteredSections])

  function onSearch(name: string) {
    setSearch(name)
  }

  function handleRowClick(params: any) {
    const sectionID = params.row.id
    const sectionName = params.row.Name
    props.onSectionSelection(sectionID, sectionName)
  }

  function getSections() {
    const activeCourse = localStorage.getItem('activeCourse')
    const courseID: string = activeCourse ? JSON.parse(activeCourse)._id : null
    if (!courseID) return

    sectionsService
      .getSectionsByCourseId(courseID)
      .then((res) => {
        if (res.status === 200) {
          setSections([...res.data])
          setFilteredSections([...res.data])
        } else throw Error
      })
      .catch((err) => {})
  }
  function getSectionsTable(): Promise<[]> {
    const sectionsTmp = filteredSections.map((section: any) => ({
      id: section._id,
      name: section.name,
      StartDate: new Date(section.startDate).toLocaleDateString(),
      EndDate: new Date(section.endDate).toLocaleDateString(),
    }))
    return Promise.resolve(sectionsTmp)
  }

  const columns = [
    { field: 'name', width: 270, headerName: 'Name' },
    { field: 'StartDate', width: 130, headerName: 'Start date' },
    { field: 'EndDate', width: 130, headerName: 'End date' },
    { field: 'projectName', width: 250, headerName: 'Project name' },
  ]

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
              <span>Find Section</span>
            </div>

            <div className={styles.container__body}>
              <div className={styles.container__body__search}>
                <SearchInput onSubmit={onSearch} placeholder="Search by name" />
              </div>
              <div className={styles.container__body__table}>
                {isUpdate && (
                  <ReusableTable
                    name="Sections"
                    getData={getSectionsTable}
                    columns={columns}
                    onRowClick={handleRowClick}
                  />
                )}
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </MuiThemeProvider>
  )
}

export default FindProject
