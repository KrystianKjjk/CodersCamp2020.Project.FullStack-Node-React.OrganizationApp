import React, { useState } from "react";
import { createCourse } from "../Course/CourseClient";
import { CourseCreateObject, Course } from "../Course/CourseSlice";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import PageHeader from "../PageHeader";
import moduleStyles from "./CourseCreate.module.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";


export interface CourseCreateProps {}

const CourseCreate: React.FC<CourseCreateProps> = (props) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        "& .MuiTextField-root": {
          margin: theme.spacing(1),
          width: "90%",
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "#1A90FF",
          },
        },
      },
      nameInput: {
        "&.MuiTextField-root":{
          width:"50%"
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
        // width: "50%",
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
        width: '150px',
        "&:hover": {
          backgroundColor: "#67b5ff",
        },
      },
      buttonAlignment:{
        display: "flex",
        justifyContent: "center"
      },
    })
  );

  const classes = useStyles();

  const [courseName, changeCourseName] = useState("");
  const [description, changeDescription] = useState("");
  const history = useHistory();

  const handleCourseNameChange = (e: any) => {
    changeCourseName(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    changeDescription(e.target.value);
  };

  const handleSaveButtonClick = async () => {
    const course: CourseCreateObject = {
      name: courseName,
      description: description,
      startDate: new Date(2021, 3, 1),
      endDate: new Date(2021, 3, 4),
    };
    createCourse(course).then((response: any) => {
      const createdCourse: Course = response.data;
      history.push("courses/" + createdCourse._id);
    });
  };

  return (
    <div className={classes.root}>
      <PageHeader name={"CREATE COURSE"}></PageHeader>
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
            <TextField
              id="date"
              label="Start date"
              type="date"
              className={classes.datePicker}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="date"
              label="End date"
              type="date"
              className={classes.datePicker}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className={classes.buttonAlignment}>
          <Button
          className={classes.button}
            onClick={handleSaveButtonClick}
            variant="contained"
            disabled={!courseName || !description}
          >
            SAVE
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreate;
