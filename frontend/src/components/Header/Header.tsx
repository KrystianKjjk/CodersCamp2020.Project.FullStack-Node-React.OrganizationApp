import React from 'react';
import styles from './Header.module.css'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import {removeUserFromLocalStorage} from '../../app/utils'
import { useHistory } from 'react-router-dom';

interface HeaderProps {
  onLogout?: Function
}

const Header = (props: HeaderProps) => {

  const handleLogOut = () => {
    removeUserFromLocalStorage();
  }

  const history = useHistory();
  const routeChange = () => { 
    let path = `/`; 
    history.push(path);
}


  return (
    <div className={styles.header}>
        <div className={styles.logo}><span>.</span>Coders<span>Camp</span></div>
        <div className={styles.logout} onClick={() => {
          handleLogOut();
          routeChange();
          if (props.onLogout) props.onLogout();
        }
        }><PowerSettingsNewIcon style={{color:"rgba(255, 255, 255, 0.6)"}}></PowerSettingsNewIcon><span> Log out</span></div>
    </div>
   );
};

export default Header;
