import React from 'react';
import styles from './TeamProjects.module.css';
import ReusableTable from '../ReusableTable/index'

export interface TeamProjectsProps {
  course: string;
}



const TeamProjects: React.FC< TeamProjectsProps > = props => {

  const fetchProjects = () => {
    
  }

  return (
    <div>
      <ReusableTable name="Team Projects" getData="" columns="" />
    </div>
  );
};

export default TeamProjects;