import React from 'react'
import styles from './PageHeader.module.css'

export interface PageHeaderProps {
  name?: string
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <div className={styles.headerContainer}>
      {props.name}
      {props.children}
    </div>
  )
}

export default PageHeader
