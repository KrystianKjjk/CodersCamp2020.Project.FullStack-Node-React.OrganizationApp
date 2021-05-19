import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

import styles from './ListItemLink.module.css'

export interface ListItemLinkProps {
  path: string
  icon: React.ReactNode
  text: string
  onClick: (e: any) => void
  selected: boolean
}

const ListItemLink = ({ path, icon, text, onClick, selected }: ListItemLinkProps) => {
  return (
    <ListItem
      button
      component={Link}
      to={path}
      className={`${styles.ListItem} ${selected && styles.ListItemSelected}`}
      onClick={onClick}
    >
      <ListItemIcon className={`${styles.ListItemIcon} ${selected && styles.ListItemInsideSelected}`}>{icon}</ListItemIcon>
      <ListItemText className={`${styles.ListItemText} ${selected && styles.ListItemInsideSelected}`} primary={text} />
    </ListItem>
  )
}

export default ListItemLink
