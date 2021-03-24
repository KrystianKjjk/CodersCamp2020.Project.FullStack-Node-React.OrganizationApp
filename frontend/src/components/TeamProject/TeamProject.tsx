import React from 'react';
import styles from './TeamProject.module.css'
import Button from '@material-ui/core/Button';

export interface TeamProjectProps {
  _id: string,
  teamId: string,
  parentProjectIds: string,
  projectName: string,
  projectUrl: string,
  description: string
}

const TeamProject: React.FC< TeamProjectProps > = props => {
  


  return (
    <div className={styles.teamProjectContainer}>
      <div className="team-project-header">
        <span>HEADER</span>
        <Button className={styles.button}>Edit</Button>
        <Button className="button">Delete</Button>
      </div>

      <div className={styles.teamDetailsContainer}>
      <div className="attribute-names-container">
        <div >Name:</div>
        <div>Reference project:</div>
        <div>Team mentor:</div>
        <div>Section name:</div>
        <div>Project URL:</div>
        <div>Description:</div>
      </div>
      <div className="attribute-values-container">
        <div>{props.projectName}</div>
        <div>{props.parentProjectIds}</div>
        <div>{props.teamId}</div>
        <div>{props.parentProjectIds}</div>
        <div>{props.projectUrl}</div>
        <div>{props.description}</div>
      </div>
      </div>
      

    </div>
  );
};

export default TeamProject;