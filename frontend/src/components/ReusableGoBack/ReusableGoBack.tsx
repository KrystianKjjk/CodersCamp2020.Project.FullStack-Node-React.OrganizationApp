import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import React from 'react';
import styles from './ReusableGoBack.module.css';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

export interface ReusableGoBackProps {
  pageName: string;
  pageLink: string;
  elementName: string;
}

const ReusableGoBack: React.FC< ReusableGoBackProps > = props => {
  return (
    <div className={styles.container_goback}>
      <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumbs}>
          <Link href={props.pageLink} color="textPrimary" className={styles.breadcrumbs_link}> 
            <ArrowBackRoundedIcon className={styles.icon_back} />
            {props.pageName}
          </Link>
        <Typography>{props.elementName}</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default ReusableGoBack;