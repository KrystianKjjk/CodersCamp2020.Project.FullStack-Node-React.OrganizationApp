import React, { useEffect, useRef } from 'react';
import styles from './TeamProject.module.css'
import Button from '@material-ui/core/Button';
import { selectTeamProjects, 
  getProjectById, 
  saveProjectById, 
  deleteProjectById, 
  switchEditMode, 
  switchDeleteMode,
  setProjectValue } from './TeamProjectSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { BooleanArraySupportOption } from 'prettier';
import { BooleanLiteral } from 'typescript';
import { AnyAction } from 'redux';

export interface TeamProjectProps {
  _id: string //id projektu wybranego w tabeli
}

interface deleteModalProps {
  projectDeleteMode: boolean;
  _id: string;
}

const TeamProject: React.FC< TeamProjectProps > = props => {
  const { projectEditMode, projectDeleteMode, loading, hasErrors, project }  = useAppSelector(selectTeamProjects);  
  let selectedTeamProject = project;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProjectById(props._id));
  }, [dispatch]);

  const DeleteModal = (props: deleteModalProps) => {
    const projectDeleteMode = props.projectDeleteMode;
    if (projectDeleteMode) {
      return  (
        <div className = {styles.deleteModal}>
          Do you really want to delete this project?
          <br/><br/>
          <Button id={styles.buttonDelete} onClick={() => dispatch(deleteProjectById(props._id))}>Delete</Button>  
        </div>)      
    }
    return null
  }
//@ts-ignore
  const handleChange = (e) => {
    dispatch(setProjectValue(e.target))
  }

  return (
    projectEditMode ?   
    (<form className={styles.teamProjectContainer} onSubmit={handleChange}>
      <div className={styles.teamProjectHeader}>
        <span className={styles.teamProjectHeaderName}>Manage team project</span>
        <Button id={styles.buttonEdit} onClick={() => dispatch(saveProjectById(selectedTeamProject))}>Save</Button>
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
        <input
          type='projectName' 
          className={styles.input} 
          defaultValue={selectedTeamProject!.projectName}
          onChange={handleChange}
          ></input>
        <div>{selectedTeamProject!.parentProjectIds}</div>
        <div>{selectedTeamProject!.teamId}</div>
        <div>{selectedTeamProject!.parentProjectIds}</div>
        <input 
          className={styles.input} 
          defaultValue={selectedTeamProject!.projectUrl}
          ></input>
        <textarea 
          className={styles.input} 
          defaultValue={selectedTeamProject!.description}
          ></textarea>
      </div>
      </div>
    </form>)
    :
    (<div className={styles.teamProjectContainer}>
      <div className={styles.teamProjectHeader}>
        <span className={styles.teamProjectHeaderName}>Manage team project</span>
        <Button id={styles.buttonDelete} onClick={() => dispatch(switchDeleteMode())}>Delete</Button>
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
      <DeleteModal projectDeleteMode={projectDeleteMode} _id={selectedTeamProject._id}/>
      
    </div>)
  );

  
};

export default TeamProject;