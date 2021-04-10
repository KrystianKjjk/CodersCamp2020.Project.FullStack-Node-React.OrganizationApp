import React from 'react';
import styles from './Header.module.css'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import {removeUserFromLocalStorage} from '../../app/utils'

const Header: React.FC= () => {

  const handleLogOut = () => {
    removeUserFromLocalStorage();
  }

  return (
    <div className={styles.header}>
        <div className={styles.logo}><span>.</span>Coders<span>Camp</span></div>
        <div className={styles.logout} onClick={() => handleLogOut()}><PowerSettingsNewIcon style={{color:"rgba(255, 255, 255, 0.6)"}}></PowerSettingsNewIcon><span> Log out</span></div>
    </div>
   );
};

export default Header;
