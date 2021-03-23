import React from 'react';
import styles from './TeamProject.module.css';

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
    <div className="team-project">
      <div className="team-project-header">
        <span>HEADER</span>
        <button>delete</button>
        <button>edit</button>
      </div>
      <div className="attribute-names-container">
        <div>Name:</div>
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
  );
};

export default TeamProject;