import React, { useEffect, useState } from "react";
import styles from "./CourseList.module.css";
import { fetchCoursesAsync } from "./CourseListSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CourseListElement from "../CourseList/CourseListElement";
import { getActiveCourse } from "../../app/ActiveCourse";

export interface CourseListProps {}

const CourseList: React.FC<CourseListProps> = (props) => {
  const dispatch = useAppDispatch();
  const { courseList } = useAppSelector((state) => state.courseList);
  const activeCourse= getActiveCourse();
  const [activeCourseId, setActiveCourseId]=useState(activeCourse?._id);
  useEffect(() => {
    dispatch(fetchCoursesAsync());
  }, [dispatch]);

  const listElements = courseList.map((courseListElement) => (
    <CourseListElement key={courseListElement._id} course={courseListElement} isActive={(courseListElement._id===activeCourseId)} setActiveCourseId={setActiveCourseId} />
  ));

  return <div className={styles.container}>{listElements}</div>;
};

export default CourseList;
