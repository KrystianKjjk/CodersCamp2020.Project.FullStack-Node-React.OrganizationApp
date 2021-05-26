import React, { useState } from 'react'
import { CourseCreateObject, Course } from '../../../models'
import TextField from '@material-ui/core/TextField'
import { Button, ThemeProvider } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../../components/PageHeader'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import 'date-fns'

import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { mainTheme } from '../../../theme/customMaterialTheme'
import { createCourse } from '../../../api'

export interface CourseCreateProps {}

const CourseCreate: React.FC<CourseCreateProps> = (props) => {
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
          width: '50%',
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
      dateContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '2% 15%',
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
      buttonAlignment: {
        display: 'flex',
        justifyContent: 'center',
      },
    }),
  )

  const classes = useStyles()

  const [courseName, changeCourseName] = useState('')
  const [description, changeDescription] = useState('')
  const [startDate, changeStartDate] = useState<Date | null>(new Date())
  const [endDate, changeEndDate] = useState<Date | null>(new Date())
  const history = useHistory()

  const handleCourseNameChange = (e: any) => {
    changeCourseName(e.target.value)
  }

  const handleDescriptionChange = (e: any) => {
    changeDescription(e.target.value)
  }

  const handleStartDateChange = (date: Date | null) => {
    changeStartDate(date)
  }

  const handleEndDateChange = (date: Date | null) => {
    changeEndDate(date)
  }

  const handleSaveButtonClick = async () => {
    const course: CourseCreateObject = {
      name: courseName,
      description: description,
      startDate: startDate!,
      endDate: endDate!,
    }

    createCourse(course).then((response: any) => {
      const createdCourse: Course = response.data
      history.push('/courses/' + createdCourse._id)
    })
  }

  return (
    <div className={classes.root}>
      <PageHeader name={'Create Course'} />
      <div className={classes.container}>
        <div className={classes.header}>
          <h3>Manage course</h3>
        </div>
        <div className={classes.inputs}>
          <TextField
            label="Course name"
            className={classes.nameInput}
            onChange={handleCourseNameChange}
            variant="outlined"
          ></TextField>
          <TextField
            label="Course description"
            variant="outlined"
            multiline
            onChange={handleDescriptionChange}
          ></TextField>
        </div>
        <div>
          <div className={classes.dateContainer}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline1"
                label="Start date"
                inputVariant="outlined"
                value={startDate}
                onChange={handleStartDateChange}
              />
              <DatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline2"
                label="End date"
                inputVariant="outlined"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </MuiPickersUtilsProvider>
          </div>
          <ThemeProvider theme={mainTheme}>
            <div className={classes.buttonAlignment}>
              <Button
                className={classes.button}
                onClick={handleSaveButtonClick}
                variant="text"
                disabled={!courseName || !startDate || !endDate}
              >
                SAVE
              </Button>
            </div>
          </ThemeProvider>
        </div>
      </div>
    </div>
  )
}

export default CourseCreate
