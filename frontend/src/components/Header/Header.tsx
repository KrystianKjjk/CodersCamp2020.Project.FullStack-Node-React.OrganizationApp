import React from 'react';
import styles from './Header.module.css'

export interface HeaderProps {

}

const Header: React.FC< HeaderProps > = props => {
  return (
    <div className={styles.header}>
        <div className={styles.logo}>.CodersCamp</div>
        <div className={styles.logout}>Log out</div>
    </div>
   );
};

export default Header;