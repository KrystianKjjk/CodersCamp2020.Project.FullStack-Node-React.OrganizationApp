import React, { useEffect, useState } from 'react';
import styles from './TeamProject.module.css'
import Button from '@material-ui/core/Button';
import { selectTeamProjects, 
  getProjectById, 
  saveProjectById, 
  deleteProjectById, 
  switchEditMode, 
  switchDeleteMode } from './TeamProjectSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export interface TeamProjectProps {
  _id: string, //id projektu wybranego w tabeli
  changeViewFn: Function
}

interface deleteModalProps {
  projectDeleteMode: boolean;
  _id: string;
}

const TeamProject: React.FC< TeamProjectProps > = props => {
  const { projectEditMode, projectDeleteMode, project }  = useAppSelector(selectTeamProjects);  
  let selectedTeamProject = project;

  const dispatch = useAppDispatch();  
  const [projectName, setProjectName] = useState(project.projectName);
  const [projectUrl, setProjectUrl] = useState(project.projectUrl);
  const [projectDescription, setProjectDescription] = useState(project.description);

  // const token = window.localStorage....
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRmYmFlMWEyZTM4ZDAwMTVlZTQxZWQiLCJ0eXBlIjozLCJpYXQiOjE2MTY3OTA3NDksImV4cCI6MTYxNjc5MTk0OX0.cYNseRM97U7IgwXKVQgRwBVd7SQWpeHJ4grgWUqsf6w'

  useEffect(() => {
    dispatch(getProjectById(props._id, token));
  }, [dispatch]);  

  useEffect(() => {
    setProjectName(project.projectName);
    setProjectUrl(project.projectUrl);
    setProjectDescription(project.description);
  }, [projectEditMode]);   

  const DeleteModal = (props: deleteModalProps) => {
    const projectDeleteMode = props.projectDeleteMode;
    if (projectDeleteMode) {
      return  (
        <div className = {styles.deleteModal} onClick={() => dispatch(switchDeleteMode())}>
          Do you really want to delete this project?
          <br/><br/>
          <Button id={styles.buttonDelete} onClick={() => dispatch(deleteProjectById(props._id, token))}>Delete</Button>  
        </div>)      
    }
    return null
  }  

  const handleSave = () => {
    const newProjectData = {
      ...project,
      teamId: project.teamId,
      projectName: projectName,
      projectUrl: projectUrl,
      description: projectDescription
    }
    dispatch(saveProjectById(newProjectData, props._id, token));
    dispatch(getProjectById(props._id, token));
  }

  const handleChange = (setState: Function, e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement> ) => {
    setState(e.target.value);
  }

  return (
    projectEditMode ?   
    (<div className={styles.teamProjectContainer}>
      <div className={styles.teamProjectHeader}>
        <span className={styles.teamProjectHeaderName}>Manage team project</span>
        <Button id={styles.buttonEdit} onClick={() => handleSave()}>Save</Button>
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
          className={styles.input} 
          defaultValue={selectedTeamProject!.projectName}
          onChange={(e) => handleChange(setProjectName, e)}
          ></input>
        <div>{selectedTeamProject!.referenceProjectName}</div>
        <div>{selectedTeamProject!.mentor}</div>
        <div>{selectedTeamProject!.sectionName}</div>
        <input 
          className={styles.input} 
          defaultValue={selectedTeamProject!.projectUrl}
          onChange={(e) => handleChange(setProjectUrl, e)}
          ></input>
        <textarea 
          className={styles.input} 
          defaultValue={selectedTeamProject!.description}
          onChange={(e) => handleChange(setProjectDescription, e)}
          ></textarea>
      </div>
      </div>
    </div>)
    :
    (<div className={styles.teamProjectContainer}>
      <div className={styles.teamProjectHeader}>
        <span className={styles.teamProjectHeaderName}>Manage team project</span>
        <Button id={styles.buttonDelete} onClick={() => dispatch(switchDeleteMode())}>Delete</Button>
        <Button id={styles.buttonEdit} onClick={() => dispatch(switchEditMode())}>Edit</Button>
        <Button id={styles.buttonEdit} onClick={() => props.changeViewFn()}>Back</Button>
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
        <div>{selectedTeamProject!.referenceProjectName}</div>
        <div>{selectedTeamProject!.mentor}</div>
        <div>{selectedTeamProject!.sectionName}</div>
        <div>{selectedTeamProject!.projectUrl}</div>
        <div className={styles.description}>{selectedTeamProject!.description}</div>
      </div>      
      </div>  
      <DeleteModal projectDeleteMode={projectDeleteMode} _id={selectedTeamProject._id}/>
      
    </div>)
  );

  
};

export default TeamProject;