import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import CourseSectionElement from './CourseSectionListElement'
import {
  Button,
  makeStyles,
  Theme,
  createStyles,
  Box,
  ThemeProvider,
  LinearProgress,
} from '@material-ui/core'
import PageHeader from '../../../components/PageHeader'
import UButton from '../../../components/UButton'

import DateFnsUtils from '@date-io/date-fns'
import { format } from 'date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { useHistory } from 'react-router-dom'
import { mainTheme } from '../../../theme/customMaterialTheme'
import ReusableGoBack from '../../../components/ReusableGoBack'
import { Course, SectionListElement } from '../../../models'
import useCourse, { updateCourseAsync } from '../../../hooks/useQuery/useCourse'
import { useAppSelector } from '../../../hooks/hooks'
import { resetSectionsToDelete } from './CourseDetailsSlice'
import { useMutationWithConfirm } from '../../../hooks'

export interface CourseProps {
  id: string
}

const CourseComponent = ({ match }: RouteComponentProps<CourseProps>) => {
  const history = useHistory()
  const { sectionsIdToDelete } = useAppSelector((state) => state.courseDetails)
  const [courseName, changeCourseName] = useState('')
  const [description, changeDescription] = useState('')
  const [startDate, changeStartDate] = useState<Date | null>(new Date())
  const [endDate, changeEndDate] = useState<Date | null>(new Date())
  const [isEdit, setIsEdit] = useState(false)
  const { isLoading, data, error } = useCourse(match.params.id)
  const { mutate: updateCourse } = useMutationWithConfirm(
    (vars: [Course, string[]]) => updateCourseAsync(...vars),
    {
      onSettled: () => resetSectionsToDelete(),
      invalidate: 'course',
    },
  )

  const classes = useStyles()

  const toggleEdit = () => {
    setIsEdit(!isEdit)
  }

  const handleCourseNameChange = (e: any) => {
    changeCourseName(e.target.value)
  }

  const handleDescriptionChange = (e: any) => {
    changeDescription(e.target.value)
  }

  const handleAddButtonClick = () => {
    history.push('/sections/create')
  }

  const handleSaveButtonClick = () => {
    const courseToSave: Course = {
      ...data!,
      name: courseName,
      description: description,
      startDate: startDate!.toISOString(),
      endDate: endDate!.toISOString(),
    }

    updateCourse([courseToSave, sectionsIdToDelete])
  }

  const handleStartDateChange = (date: Date | null) => {
    changeStartDate(date)
  }

  const handleEndDateChange = (date: Date | null) => {
    changeEndDate(date)
  }

  useEffect(() => {
    if (!data) {
      return
    }
    changeCourseName(data.name)
    changeDescription(data.description ?? '')
    changeStartDate(new Date(Date.parse(data.startDate)))
    changeEndDate(new Date(Date.parse(data.endDate)))
  }, [data])

  if (isLoading) return <LinearProgress />
  if (error) return <div>{(error as Error).message}</div>

  return (
    <div className={classes.root}>
      <PageHeader>
        <ReusableGoBack
          pageName="Course"
          pageLink="/courses"
          elementName={courseName}
        />
      </PageHeader>
      <div className={classes.container}>
        <div className={classes.header}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <h3>Manage course</h3>
            <Box marginRight="1%">
              <UButton
                text="EDIT"
                color="primary"
                onClick={toggleEdit}
              ></UButton>
            </Box>
          </Box>
        </div>
        <div className={classes.inputs}>
          {isEdit ? (
            <div>
              <TextField
                label="Course name"
                className={classes.nameInput}
                onChange={handleCourseNameChange}
                variant="outlined"
                value={courseName}
              ></TextField>
              <TextField
                label="Course description"
                variant="outlined"
                multiline
                onChange={handleDescriptionChange}
                value={description}
              ></TextField>
            </div>
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center">
              <h3>{courseName}</h3>
              <Box>
                <p>{description}</p>
              </Box>
            </Box>
          )}
        </div>
        <Box
          display="flex"
          justifyContent="start"
          borderTop="1px solid #666666"
          alignContent="space-between"
          margin="3% 0"
        >
          <Box marginLeft="3%" marginTop="2%" width="400px">
            <h4>Sections:</h4>
            {data?.sections.map((section: SectionListElement) => (
              <CourseSectionElement
                section={section}
                isEdit={isEdit}
                key={section._id}
              />
            ))}
            {isEdit && <UButton text="ADD" onClick={handleAddButtonClick} />}
          </Box>
          <Box marginTop="2%">
            <h4>Dates:</h4>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              {isEdit ? (
                <Box>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Start date"
                    inputVariant="outlined"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="End date"
                    inputVariant="outlined"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </Box>
              ) : (
                <Box display="flex">
                  <Box
                    paddingRight="6rem"
                    display="flex"
                    flexDirection="column"
                  >
                    <p>Start date:</p>
                    <p>End date:</p>
                  </Box>
                  <Box display="flex" flexDirection="column">
                    <p>{startDate ? format(startDate, 'dd/MM/yyyy') : ''}</p>
                    <p>{endDate ? format(endDate, 'dd/MM/yyyy') : ''}</p>
                  </Box>
                </Box>
              )}
            </MuiPickersUtilsProvider>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          borderTop="1px solid #666666"
        >
          {isEdit ? (
            <ThemeProvider theme={mainTheme}>
              <Button
                className={classes.button}
                onClick={handleSaveButtonClick}
                variant="text"
                disabled={!courseName || !startDate || !endDate}
              >
                SAVE
              </Button>
            </ThemeProvider>
          ) : null}
        </Box>
      </div>
    </div>
  )
}

export default CourseComponent

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '90%',
      },
    },
    nameInput: {
      '&.MuiTextField-root': {
        width: '100%',
        paddingBottom: '2%',
      },
    },
    container: {
      textAlign: 'left',
      fontFamily: 'Montserrat',
      backgroundColor: '#1C1C1C',
      border: '1px solid #666666',
    },
    inputs: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderTop: '1px solid #666666',
      paddingTop: '2%',
    },
    header: {
      paddingLeft: '3%',
    },
    datePicker: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '50px',
    },
    button: {
      backgroundColor: '#1a90ff',
      margin: '2% 0',
      width: '120px',
      '&:hover': {
        backgroundColor: '#2272bd',
      },
    },
  }),
)
