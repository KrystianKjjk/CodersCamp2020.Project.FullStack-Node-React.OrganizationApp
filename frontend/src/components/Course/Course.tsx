import React, { useEffect, useState } from "react";
import styles from "./Course.module.css";
import { RouteComponentProps } from "react-router-dom";
import { fetchCourseAsync, Course } from "./CourseSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

export interface CourseProps {
  id: string;
}

const CourseComponent = ({ match }: RouteComponentProps<CourseProps>) => {
  const dispatch = useAppDispatch();
  const { course } = useAppSelector((state) => state.course);
  const [courseName, changeCourseName] = useState("");
  const [description, changeDescription] = useState("");
  
  const handleCourseNameChange = (e: any) => {
    changeCourseName(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    changeDescription(e.target.value);
  };


  const handleSaveButtonClick =  () => {
    const courseToSave: Course = {...course!, name: courseName, description: description};
    console.log(courseToSave);
  };

  useEffect(() => {
    const courseId = match.params.id;
    dispatch(fetchCourseAsync(courseId));
  }, [match.params.id, dispatch]);

useEffect(()=>{
  if(!course){
    return;
  }
  changeCourseName(course.name);
  changeDescription(course.description??"");

}, [course]);

  if (!course) {
    return <div><CircularProgress /></div>;
   }
  return (<div>
    <div>
      <Input value={courseName} onChange={handleCourseNameChange}></Input>
      <TextField value={description} onChange={handleDescriptionChange}></TextField>
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
  </div>);
};

export default CourseComponent;
