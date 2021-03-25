import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  name: string;
}

const Button: React.FC< ButtonProps > = props => {
  return (
    <div>
      {props.name}
    </div>
  );
};

export default Button;