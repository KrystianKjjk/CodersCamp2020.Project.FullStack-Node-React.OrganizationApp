import React, { useEffect } from "react";
import styles from "./CourseList.module.css";
import { fetchCoursesAsync } from "./CourseListSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CourseListElement from "../CourseList/CourseListElement";
import PageHeader from "../PageHeader";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import UButton from "../UButton";

export interface CourseListProps {}

const CourseList: React.FC<CourseListProps> = (props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { courseList, activeCourse } = useAppSelector(
    (state) => state.courseList
  );

  useEffect(() => {
    dispatch(fetchCoursesAsync());
  }, [dispatch]);

  const listElements = courseList.map((courseListElement) => (
    <CourseListElement
      key={courseListElement._id}
      course={courseListElement}
      isActive={courseListElement._id === activeCourse?._id}
    />
  ));

  const handleAddButtonClick = (event: any) => {
    history.push("coursecreate/");
  };

  return (
    <div>
      <PageHeader name="COURSES"></PageHeader>
      <div>
        <div className={styles.manageCourseBar}>
          <h3>Manage courses</h3>
          <UButton
            text="ADD"
            color="primary"
            onClick={handleAddButtonClick}
          ></UButton>
        </div>
        <div className={styles.listContainer}>{listElements}</div>
      </div>
    </div>
  );
};

export default CourseList;
