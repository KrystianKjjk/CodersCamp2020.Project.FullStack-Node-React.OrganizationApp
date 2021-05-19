import React from 'react';
import styles from './MenuSmall.module.css';

export interface MenuSmallProps {
  name: string;
}

const MenuSmall: React.FC< MenuSmallProps > = props => {
  return (
    <div>
      {props.name}
    </div>
  );
};

export default MenuSmall;