import React from 'react';
import styles from './HeaderRegistration.module.css'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const HeaderRegistration: React.FC= () => {
  return (
    <div className={styles.header}>
        <div className={styles.logo}><span>.</span>Coders<span>Camp</span></div>
        <div></div>
    </div>
   );
};

export default HeaderRegistration;
