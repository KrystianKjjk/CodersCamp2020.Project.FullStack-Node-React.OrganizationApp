import React from 'react'
import styles from './NameValuePair.module.css'

export interface NameValuePairProps {
  name: string
}

const NameValuePair: React.FC<NameValuePairProps> = ({ name, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.name}>{name}</div>
      <div className={styles.value}>{children}</div>
    </div>
  )
}

export default NameValuePair
