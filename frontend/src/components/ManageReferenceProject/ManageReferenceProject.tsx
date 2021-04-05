import React from 'react';
import styles from './ManageReferenceProject.module.css';
import {useDispatch, useSelector} from "react-redux";
import {selectReferenceProjects} from "../ReferenceProjects/ReferenceProjectsSlice";

export interface ManageReferenceProjectProps {
}

const ManageReferenceProject = (props: any) => {
  const projectID = props.match.params.projectID;
  const dispatch = useDispatch();
  let project;

  useSelector((state: any) => {
    project = state.refProjects.refProjects.find((project: any) => project._id === projectID);
  });

  return (
      <div>

      </div>
  );
};

export default ManageReferenceProject;
