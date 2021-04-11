import {Box } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import UButton from "../UButton";
import { deleteSection, SectionListElement } from "./CourseDetailsSlice";
interface CourseSectionElementProps {
  section: SectionListElement;
  isEdit: boolean;
}

const CourseSectionElement = ({
  section,
  isEdit,
}: CourseSectionElementProps) => {

  const dispatch = useDispatch();
  const handleDeleteButtonClick = () => {
    dispatch(deleteSection(section._id));
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" width="400px">
      <Box><p>{section.name}</p></Box>
      {isEdit ? (
        <UButton text="DELETE" color="secondary" onClick={handleDeleteButtonClick}></UButton>
      ) : null}
    </Box>
  );
};

export default CourseSectionElement;
