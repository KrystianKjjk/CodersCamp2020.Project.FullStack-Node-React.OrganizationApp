import React, { useEffect } from "react";
import { Button, Box } from "@material-ui/core";
import { CourseListElementModel } from "../CourseList/CourseListSlice";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {deleteCourseAsync} from "../CourseList/CourseListSlice";
import { useAppDispatch } from "../../app/hooks";

export interface CourseListElementProps {
  course: CourseListElementModel;
}

const CourseListElement: React.FC<CourseListElementProps> = ({ course }) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      box: {
        border: "1px solid #666666",
        width: "25%",
        margin: "2%",
        backgroundColor: "#1C1C1C",
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

  const handleDeleteButtonClick = () => {
      dispatch(deleteCourseAsync(course._id));
  };

  const handleEditButtonClick = () => {
    history.push("courses/" + course._id);
  };

  return (
    <div className={classes.box}>
      <div className={classes.name}>{course.name}</div>
      <div>
        <Box display="flex" justifyContent="space-between" padding="4% 8%">
          <div className={classes.date}>Start date:</div>
          <div>{course.startDate.toISOString().split("T")[0]}</div>
        </Box>
        <Box display="flex" justifyContent="space-between" padding="4% 8%">
          <div className={classes.date}>End date:</div>
          <div>{course.endDate.toISOString().split("T")[0]}</div>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          padding="8% 20% 10% 20%"
        >
          <Button
            variant="contained"
            className={classes.buttonDelete}
            onClick={handleDeleteButtonClick}
          >
            DELETE
          </Button>
          <Button
            variant="contained"
            className={classes.buttonEdit}
            onClick={handleEditButtonClick}
          >
            EDIT
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default CourseListElement;
