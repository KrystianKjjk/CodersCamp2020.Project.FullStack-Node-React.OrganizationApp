import React, { useState } from "react";
import { createCourse } from "../Course/CourseClient";
import {
  CourseCreateObject,
  Course
} from "../Course/CourseSlice";

import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export interface CourseCreateProps {}

const CourseCreate: React.FC<CourseCreateProps> = (props) => {
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
