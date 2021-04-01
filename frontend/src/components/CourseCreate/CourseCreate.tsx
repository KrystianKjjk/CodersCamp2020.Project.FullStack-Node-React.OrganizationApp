import React, { useState } from "react";
import styles from "./CourseCreate.module.css";
// import 'date-fns';
// import Grid from '@material-ui/core/Grid';
// import MomentUtils from '@date-io/moment';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

export interface CourseCreateProps {}

const CourseCreate: React.FC<CourseCreateProps> = (props) => {
  let [courseName, changeCourseName] = useState("");
  let [description, changeDescription] = useState("");

  const handleCourseNameChange = (e: any) => {
    changeCourseName(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    changeDescription(e.target.value);
  };

  const handleSaveButtonClick = () => {
    const inputsState = { courseName, description };
    console.log(inputsState);
  };

  return (
    <div>
      <div>
        <Input onChange={handleCourseNameChange}></Input>
        <TextField onChange={handleDescriptionChange}></TextField>
      </div>
      <div>
        <p>Sections:</p>
        <p>Dates:</p>
        <input type="date"></input>
        <input type="date"></input>
        <Button
          onClick={handleSaveButtonClick}
          variant="contained"
          color="primary"
          disabled={!courseName || !description}
        >
          SAVE
        </Button>
      </div>
    </div>
  );
};

export default CourseCreate;
