import React, { useEffect, useState } from "react";
import styles from "./Course.module.css";
import { RouteComponentProps } from "react-router-dom";
import { fetchCourseAsync, Course } from "./CourseDetailsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  makeStyles,
  Theme,
  createStyles,
  Box,
} from "@material-ui/core";
import PageHeader from "../PageHeader";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers";
import { updateCourse } from "./CourseClient";

export interface CourseProps {
  id: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "90%",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          // borderColor: "#666666",
        },
        "&.Mui-focused fieldset": {
          // borderColor: "#1A90FF",
        },
      },
      "& .MuiInputLabel-root": {
        // color: theme.palette.text.primary,
      },
    },
    nameInput: {
      "&.MuiTextField-root": {
        width: "50%",
        paddingBottom: "2%",
      },
    },
    container: {
      textAlign: "left",
      fontFamily: "Montserrat",
      backgroundColor: "#1C1C1C",
      border: "1px solid #666666",
      //   display: 'flex',
      // flexWrap: 'wrap',
    },
    inputs: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderTop: "1px solid #666666",
      paddingTop: "2%",
    },
    header: {
      paddingLeft: "3%",
    },
    dateContainer: {
      display: "flex",
      justifyContent: "space-between",
      margin: "2% 15%",
    },
    datePicker: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "50px",
    },
    button: {
      backgroundColor: "#1A90FF",
      margin: "2% 0",
      width: "150px",
      "&:hover": {
        backgroundColor: "#67b5ff",
      },
    },
    buttonEdit: {
      backgroundColor: "#1A90FF",
      width: "90px",
      height: "50%",
      marginRight:'3%',
      "&:hover": {
        backgroundColor: "#67b5ff",
      },
    },
    buttonAlignment: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

const CourseComponent = ({ match }: RouteComponentProps<CourseProps>) => {
  const dispatch = useAppDispatch();
  const { course } = useAppSelector((state) => state.courseDetails);
  const [courseName, changeCourseName] = useState("");
  const [description, changeDescription] = useState("");
  const [startDate, changeStartDate] = useState<Date | null>(new Date());
  const [endDate, changeEndDate] = useState<Date | null>(new Date());
  const [isEdit, setIsEdit] = useState(false);

  const classes = useStyles();

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleCourseNameChange = (e: any) => {
    changeCourseName(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    changeDescription(e.target.value);
  };

  const handleSaveButtonClick = () => {
    const courseToSave: Course = {
      ...course!,
      name: courseName,
      description: description,
      startDate: startDate!,
      endDate: endDate!,
    };

    updateCourse(courseToSave);
    // console.log(courseToSave);
  };

  // const handleSaveButtonClick = async () => {
  //   const course: CourseCreateObject = {
  //     name: courseName,
  //     description: description,
  //     startDate: startDate!,
  //     endDate: endDate!,
  //   };

  //   createCourse(course).then((response: any) => {
  //     const createdCourse: Course = response.data;
  //     history.push("courses/" + createdCourse._id);
  //   });
  // };

  const handleStartDateChange = (date: Date | null) => {
    changeStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    changeEndDate(date);
  };

  useEffect(() => {
    const courseId = match.params.id;
    dispatch(fetchCourseAsync(courseId));
  }, [match.params.id, dispatch]);

  useEffect(() => {
    if (!course) {
      return;
    }
    changeCourseName(course.name);
    changeDescription(course.description ?? "");
    changeStartDate(course.startDate);
    changeEndDate(course.endDate);
  }, [course]);

  if (!course) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  // return (<div>
  //   <div>
  //     <Input value={courseName} onChange={handleCourseNameChange}></Input>
  //     <TextField value={description} onChange={handleDescriptionChange}></TextField>
  //   </div>
  //   <div>
  //     <p>Sections:</p>
  //     <p>Dates:</p>
  //     <input type="date"></input>
  //     <input type="date"></input>
  //     <Button
  //       onClick={handleSaveButtonClick}
  //       variant="contained"
  //       color="primary"
  //       disabled={!courseName || !description}
  //     >
  //       SAVE
  //     </Button>
  //   </div>
  // </div>);
  return (
    <div className={classes.root}>
      <PageHeader name={"EDIT COURSE"}></PageHeader>
      <div className={classes.container}>
        <div className={classes.header}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <h3>Manage course</h3>
            <Button
              onClick={toggleEdit}
              variant="contained"
              className={classes.buttonEdit}
            >
              EDIT
            </Button>
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
            </div>
          ) : (
            <p>{courseName}</p>
          )}
          {isEdit ? (
            <TextField
              label="Course description"
              variant="outlined"
              multiline
              onChange={handleDescriptionChange}
              value={description}
            ></TextField>
          ) : (
            <p>{description}</p>
          )}
        </div>
        <div>
          <div className={classes.dateContainer}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              {isEdit ? (
                <DatePicker
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
              ) : (
                <p>{startDate?.toISOString().split("T")[0]}</p>
              )}
              {isEdit?(
              <DatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="End date"
              inputVariant="outlined"
              value={endDate}
              onChange={handleEndDateChange}
            />):(<p>{endDate?.toISOString().split("T")[0]}</p>)
            
            }
              
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.buttonAlignment}>
            {isEdit?(
              <Button
              className={classes.button}
              onClick={handleSaveButtonClick}
              variant="contained"
              disabled={!courseName || !startDate || !endDate}
            >
              SAVE
            </Button>
            ):(null)}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseComponent;
