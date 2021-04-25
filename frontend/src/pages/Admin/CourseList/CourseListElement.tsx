import React from "react";
import { Box} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { deleteCourseAsync, setActiveCourse, CourseListElementModel } from "./CourseListSlice";
import { useAppDispatch } from "../../../app/hooks";
import UButton from "../../../components/UButton";
import {format} from "date-fns";

export interface CourseListElementProps {
  course: CourseListElementModel;
  isActive: boolean;
}

const CourseListElement: React.FC<CourseListElementProps> = ({
  course,
  isActive,
}) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      box: {
        border: "1px solid #666666",
        width: "25%",
        margin: "2%",
        backgroundColor: "#1C1C1C",
        "&:hover": {
          borderColor: "#2196F3",
          cursor: "pointer",
          outlineStyle: "solid",
          outlineColor: "#2196F3",
        },
      },
      boxActive: {
        borderColor: "#FBA846",
        outlineStyle: "solid",
        outlineColor: "#FBA846",
        backgroundColor: "#1C1C1C",
        "&:hover": {
          borderColor: "#FBA846",
          outlineColor: "#FBA846",
        },
      },
      name: {
        borderBottom: "1px solid #666666",
        padding: "5% 0",
        marginBottom: "10%",
      },
      buttonEdit: {
        backgroundColor: "#2196F3",
      },
      buttonDelete: {
        backgroundColor: "#F03738",
      },
      date: {
        fontWeight: "bold",
      },
    })
  );

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();


  const handleDeleteButtonClick = (event:any) => {
    dispatch(deleteCourseAsync(course._id))
    event.stopPropagation();
  };

  const handleEditButtonClick = (event: any) => {
    history.push("courses/" + course._id);
    event.stopPropagation();
  };

  const handleCourseClick = () => {
    dispatch(setActiveCourse(course));
  };

  const boxClasses = isActive
    ? `${classes.box} ${classes.boxActive}`
    : classes.box;

  return (
    <div className={boxClasses} onClick={handleCourseClick} data-testid="course-list-element">
      <div className={classes.name}>{course.name}</div>
      <div>
        <Box display="flex" justifyContent="space-between" padding="4% 8%">
          <div className={classes.date}>Start date:</div>
          <div>{format(new Date(course.startDate), "dd/MM/yyyy")}</div>
        </Box>
        <Box display="flex" justifyContent="space-between" padding="4% 8%">
          <div className={classes.date}>End date:</div>
          <div>{format(new Date(course.endDate), "dd/MM/yyyy")}</div>
        </Box>
        <Box display="flex" justifyContent="center" padding="7% 0%">
          <UButton
            text="DELETE"
            color="secondary"
            onClick={handleDeleteButtonClick}
          >
          </UButton>

          <UButton
            text="EDIT"
            color="primary"
            onClick={handleEditButtonClick}
          ></UButton>
        </Box>
      </div>
    </div>
  );
};

export default CourseListElement;
