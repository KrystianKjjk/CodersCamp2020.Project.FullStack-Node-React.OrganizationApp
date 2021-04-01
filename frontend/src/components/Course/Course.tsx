import React from 'react';
import styles from './Course.module.css';

export interface CourseProps {
  name: string;
}

const Course: React.FC< CourseProps > = props => {
  return (
    <div>
      {props.name}
    </div>
  );
};

export default Course;