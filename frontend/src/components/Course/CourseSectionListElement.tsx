import { Button, makeStyles, createStyles, Theme } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteSection, SectionListElement } from "./CourseDetailsSlice";
interface CourseSectionElementProps {
  section: SectionListElement;
  isEdit: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      backgroundColor: "#FF384A",
      height: "10%",
      width: "7%",
      marginLeft: "3%",
    },
    sectionsDiv: {
      display: "flex",
      alignItems: "center",
      marginLeft: "5%",
    },
  })
);

const CourseSectionElement = ({
  section,
  isEdit,
}: CourseSectionElementProps) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const handleDeleteButtonClick = () => {
    dispatch(deleteSection(section._id));
  };

  return (
    <div className={classes.sectionsDiv}>
      <p>{section.name}</p>
      {isEdit ? (
        <Button className={classes.button} onClick={handleDeleteButtonClick}>
          DELETE
        </Button>
      ) : null}
    </div>
  );
};

export default CourseSectionElement;
