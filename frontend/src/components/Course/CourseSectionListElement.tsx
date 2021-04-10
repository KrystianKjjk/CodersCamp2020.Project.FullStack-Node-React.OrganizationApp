import { Button, makeStyles, createStyles, Theme, Box } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import UButton from "../UButton";
import { deleteSection, SectionListElement } from "./CourseDetailsSlice";
interface CourseSectionElementProps {
  section: SectionListElement;
  isEdit: boolean;
}

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     button: {
//       backgroundColor: "#FF384A",
//       height: "10%",
//       width: "7%",
//       marginLeft: "3%",
//       marginRight: "26%"
//     },
//   })
// );

const CourseSectionElement = ({
  section,
  isEdit,
}: CourseSectionElementProps) => {
  // const classes = useStyles();

  const dispatch = useDispatch();
  const handleDeleteButtonClick = () => {
    dispatch(deleteSection(section._id));
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" width="400px">
      <Box><p>{section.name}</p></Box>
      {isEdit ? (
        <UButton text="DELETE" color="secondary" onClick={handleDeleteButtonClick}></UButton>
        // <Button className={classes.button} onClick={handleDeleteButtonClick}>
        //   DELETE
        // </Button>
      ) : null}
    </Box>
  );
};

export default CourseSectionElement;
