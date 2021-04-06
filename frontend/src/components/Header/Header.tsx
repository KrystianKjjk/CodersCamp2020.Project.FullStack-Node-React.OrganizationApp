import React from 'react';
import styles from './Header.module.css'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { getActiveCourse } from '../../app/ActiveCourse';

const Header: React.FC= () => {
 const activeCourse=getActiveCourse();
  return (
    <div className={styles.header}>
        <div className={styles.logo}><span>.</span>Coders<span>Camp</span></div>
        <div className={styles.logout}><div>Active course: {activeCourse?.name} </div><PowerSettingsNewIcon style={{color:"rgba(255, 255, 255, 0.6)"}}></PowerSettingsNewIcon><span> Log out</span></div>
    </div>
   );
};

export default Header;
