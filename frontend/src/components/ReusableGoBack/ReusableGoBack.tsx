import { Breadcrumbs, Link, Typography } from '@material-ui/core'
import React from 'react'
import styles from './ReusableGoBack.module.css'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded'
import { useHistory } from 'react-router-dom'

export interface ReusableGoBackProps {
  pageName: string
  pageLink?: string
  elementName: string
}

const ReusableGoBack: React.FC<ReusableGoBackProps> = ({
  pageName,
  elementName,
}) => {
  const history = useHistory()
  return (
    <div className={styles.container_goback}>
      <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumbs}>
        <Link
          onClick={() => history.goBack()}
          color="textPrimary"
          className={styles.breadcrumbs_link}
        >
          <ArrowBackRoundedIcon className={styles.icon_back} />
          {pageName}
        </Link>
        <Typography>{elementName}</Typography>
      </Breadcrumbs>
    </div>
  )
}

export default ReusableGoBack
