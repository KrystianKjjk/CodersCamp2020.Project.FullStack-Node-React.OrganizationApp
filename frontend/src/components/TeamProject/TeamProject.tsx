import React from 'react';
import styles from './TeamProject.module.css'
import Button from '@material-ui/core/Button';

export interface TeamProjectProps {
  _id: string //id projektu wybranego w tabeli
}

const TeamProject: React.FC< TeamProjectProps > = props => {



  return (
    <div className={styles.teamProjectContainer}>
      <div className={styles.teamProjectHeader}>
        <span className={styles.teamProjectHeaderName}>Manage team project</span>
        <Button className={styles.buttonDelete}>Delete</Button>
        <Button className={styles.buttonEdit}>Edit</Button>
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