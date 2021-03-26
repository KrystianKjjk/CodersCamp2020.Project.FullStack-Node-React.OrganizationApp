import React, { useEffect, useRef } from 'react';
import styles from './TeamProject.module.css'
import Button from '@material-ui/core/Button';
import { selectTeamProjects } from './TeamProjectSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSelectedTeamData, updateSelectedTeamData, switchEditMode } from './TeamProjectSlice';

export interface TeamProjectProps {
  _id: string //id projektu wybranego w tabeli
}

const TeamProject: React.FC< TeamProjectProps > = props => {
  const teamProjects = useAppSelector(selectTeamProjects);  
  let selectedTeamProject = teamProjects.projects.find(element => element._id === props._id);

  const dispatch = useAppDispatch();

  return (
    teamProjects.projectEditMode ?
    (<div className={styles.teamProjectContainer}>
      <div className={styles.teamProjectHeader}>
        <span className={styles.teamProjectHeaderName}>Manage team project</span>
        <Button id={styles.buttonDelete}>Delete</Button>
        <Button id={styles.buttonEdit } onClick={() => dispatch(switchEditMode())}>Edit</Button>
      </div>

      <div className={styles.teamProjectDetailsContainer}>
      <div className={styles.attributeNamesContainer}>
        <div>Name:</div>
        <div>Reference project:</div>
        <div>Team mentor:</div>
        <div>Section name:</div>
        <div>Project URL:</div>
        <div>Description:</div>
      </div>
      <div className={styles.attributeValuesContainer}>
        <div>{selectedTeamProject!.projectName}</div>
        <div>{selectedTeamProject!.parentProjectIds}</div>
        <div>{selectedTeamProject!.teamId}</div>
        <div>{selectedTeamProject!.parentProjectIds}</div>
        <div>{selectedTeamProject!.projectUrl}</div>
        <div>{selectedTeamProject!.description}</div>
      </div>
      </div>
    </div>)
    :
    (<div className={styles.teamProjectContainer}>
      <div className={styles.teamProjectHeader}>
        <span className={styles.teamProjectHeaderName}>Manage team project</span>
        <Button id={styles.buttonDelete}>Delete</Button>
        <Button id={styles.buttonEdit} onClick={() => dispatch(switchEditMode())}>Edit</Button>
      </div>

      <div className={styles.teamProjectDetailsContainer}>
      <div className={styles.attributeNamesContainer}>
        <div>Name:</div>
        <div>Reference project:</div>
        <div>Team mentor:</div>
        <div>Section name:</div>
        <div>Project URL:</div>
        <div>Description:</div>
      </div>
      <div className={styles.attributeValuesContainer}>
        <div>{selectedTeamProject!.projectName}</div>
        <div>{selectedTeamProject!.parentProjectIds}</div>
        <div>{selectedTeamProject!.teamId}</div>
        <div>{selectedTeamProject!.parentProjectIds}</div>
        <div>{selectedTeamProject!.projectUrl}</div>
        <div>{selectedTeamProject!.description}</div>
      </div>
      </div>
    </div>)
  );
};

export default TeamProject;