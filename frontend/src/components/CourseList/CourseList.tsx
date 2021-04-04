import React, { useEffect } from "react";
import styles from "./CourseList.module.css";
import { fetchCoursesAsync } from "./CourseListSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CourseListElement from "../CourseList/CourseListElement";

export interface CourseListProps {}

const CourseList: React.FC<CourseListProps> = (props) => {
  const dispatch = useAppDispatch();
  const { courseList } = useAppSelector((state) => state.courseList);

  useEffect(() => {
    dispatch(fetchCoursesAsync());
  }, [dispatch]);

  const listElements = courseList.map((courseListElement) => (
    <CourseListElement key={courseListElement._id} course={courseListElement} />
  ));

  return <div className={styles.container}>{listElements}</div>;
};

export default CourseList;
