import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns'
import 'date-fns'
//
import {
  Container,
  CssBaseline,
  Paper,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  LinearProgress,
} from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import styles from './SectionView.module.css'
import { NewSectionData } from '../../../models/Section.model'
import StyledTextField from '../../../components/StyledTextField'
import UButton from '../../../components/UButton'
import DeleteButton from '../../../components/DeleteButton'
import PageHeader from '../../../components/PageHeader'
import ReusableGoBack from '../../../components/ReusableGoBack'
import {
  useCourses,
  useCreateSection,
  useDeleteSection,
  usePatchSection,
  useProjectForSection,
  useSection,
} from '../../../hooks'
import useSnackbar from '../../../hooks/useSnackbar'

const SectionView = () => {
  const [sectionName, setSectionName] = useState('')
  const [courseName, setCourseName] = useState('')
  const [courseId, setCourseId] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [referenceProject, setReferenceProject] = useState('')
  const coursesQuery = useCourses()
  const [isInEditMode, setIsInEditMode] = useState(false)

  const { id } = useParams<Record<'id', string>>()
  const { data: section, isLoading, isFetching, error } = useSection(id)
  const projectQuery = useProjectForSection(id)
  const { mutate: patchSection } = usePatchSection()
  const { mutate: addSection } = useCreateSection()
  const { mutate: deleteSection } = useDeleteSection()
  const { showError } = useSnackbar()
  const history = useHistory()

  useEffect(() => {
    setReferenceProject(projectQuery.data?.projectName ?? '---')
  }, [projectQuery.data])

  useEffect(() => {
    if (section) {
      setSectionName(section.name)
      setCourseName(section.courseName)
      setCourseId(section.courseId)
      setDescription(section.description || '')
      setStartDate(
        section.startDate ? new Date(section.startDate * 1000) : undefined,
      )
      setEndDate(section.endDate ? new Date(section.endDate * 1000) : undefined)
    }
  }, [section])

  const saveSection = async () => {
    const sectionData: NewSectionData = {
      name: sectionName,
      startDate: startDate?.toISOString() || undefined,
      endDate: endDate?.toISOString() || undefined,
      description: description,
      course: courseId,
    }

    id ? patchSection([id, sectionData]) : addSection(sectionData)
    setIsInEditMode(false)
  }

  const handleDeleteClick = async () => {
    deleteSection(id)
    history.push('/sections')
  }

  const renderButtonEditSave = () => {
    return isInEditMode ? (
      <span
        onClick={saveSection}
        className={styles.saveButton}
        aria-label="Save section"
      >
        <UButton
          text="SAVE"
          color="primary"
          onClick={() => setIsInEditMode(true)}
        />
      </span>
    ) : (
      <span className={styles.editButton} aria-label="Edit section">
        <UButton
          text="EDIT"
          color="primary"
          onClick={() => setIsInEditMode(true)}
        />
      </span>
    )
  }

  const renderSectionName = () => {
    return isInEditMode ? (
      <div className={styles.textFieldSectionName}>
        <InputLabel>Section Name</InputLabel>
        <StyledTextField
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
        />
      </div>
    ) : (
      <span className={styles.section_title}> {sectionName} </span>
    )
  }

  const renderDescription = () => {
    return isInEditMode ? (
      <div className={styles.textFieldDescription}>
        <InputLabel>Description</InputLabel>
        <StyledTextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline={true}
        />
      </div>
    ) : (
      <span> Description: {description} </span>
    )
  }

  const handleChangeCourse = (e: any) => {
    const newCourseId = e.target.value
    const newCourse = coursesQuery.data?.find(
      (course) => course.name === newCourseId,
    )
    const newCourseName = newCourse ? newCourse.name : ''

    setCourseId(newCourseId)
    setCourseName(newCourseName)
  }

  const renderCourse = () => {
    return isInEditMode ? (
      <div className={styles.textFieldCourse}>
        <InputLabel>Select Course</InputLabel>
        <Select
          variant="outlined"
          className={styles.select}
          value={courseId}
          onChange={handleChangeCourse}
        >
          <MenuItem disabled>Pick a course</MenuItem>
          {coursesQuery.data?.map((course) => (
            <MenuItem value={course._id} key={course._id}>
              {course.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    ) : (
      <span className={styles.course_title}> {courseName}</span>
    )
  }

  const renderButtonDelete = () => {
    return (
      id &&
      !isInEditMode && (
        <DeleteButton
          confirmTitle="Are you sure you want to delete this section?"
          onConfirm={handleDeleteClick}
        />
      )
    )
  }

  const displayedError = error ?? coursesQuery.error ?? projectQuery.error
  if (displayedError) showError((displayedError as Error).message)

  if (isLoading || coursesQuery.isLoading || projectQuery.isLoading)
    return <CircularProgress />

  if (isFetching || coursesQuery.isFetching || projectQuery.isFetching)
    return <LinearProgress />

  return (
    <Container className={styles.manageSections} aria-label="Manage Section">
      <CssBaseline />
      <PageHeader>
        <ReusableGoBack
          pageName="Sections"
          pageLink="/sections"
          elementName={sectionName}
        />
      </PageHeader>
      <Paper className={styles.container}>
        <div className={styles.manageContainer}>
          <h2 className={styles.manageHeader}>Manage Section</h2>
          <div className={styles.buttonContainer}>
            <span className={styles.deleteButton} aria-label="Delete section">
              {renderButtonDelete()}
            </span>
            {renderButtonEditSave()}
          </div>
        </div>
        <div className={styles.manageDescription}>
          {renderSectionName()}
          {renderCourse()}
          {renderDescription()}
        </div>
        <div className={styles.manageSectionInfo}>
          <div className={styles.manageSectionMaterial}>
            <h3>Materials:</h3>
            <span>Introduction</span>
          </div>
          <div className={styles.manageSectionDates}>
            <h3>Dates:</h3>
            <div className={styles.textFieldDateContainerOnEdit}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  disableToolbar={!isInEditMode}
                  disabled={!isInEditMode}
                  variant="inline"
                  format="dd/MM/yyyy"
                  label="Start date"
                  inputVariant="outlined"
                  value={startDate}
                  onChange={(e) => setStartDate(e || undefined)}
                />
                <DatePicker
                  disableToolbar={!isInEditMode}
                  disabled={!isInEditMode}
                  variant="inline"
                  format="dd/MM/yyyy"
                  label="End date"
                  inputVariant="outlined"
                  autoOk
                  value={endDate}
                  onChange={(e) => setEndDate(e || undefined)}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div className={styles.manageSectionRefPro}>
            <h3>Reference project:</h3>
            <p>{referenceProject}</p>
          </div>
        </div>
      </Paper>
    </Container>
  )
}

export default SectionView
