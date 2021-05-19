import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

import styles from './ListItemLink.module.css'
import { useSelector } from 'react-redux'
import { selectHeader } from '../Header/HeaderSlice'

export interface ListItemLinkProps {
  path: string
  icon: React.ReactNode
  text: string
  onClick: (e: any) => void
  selected: boolean
}

const ListItemLink = ({
  path,
  icon,
  text,
  onClick,
  selected,
}: ListItemLinkProps) => {
  const { showSmallMenu } = useSelector(selectHeader)

  return (
    <ListItem
      button
      component={Link}
      to={path}
      className={
        !showSmallMenu
          ? `${styles.ListItem} ${selected && styles.ListItemSelected}`
          : styles.ListItemSmall
      }
      onClick={onClick}
    >
      <div>
        <ListItemIcon
          className={`${styles.ListItemIcon} ${
            selected && styles.ListItemInsideSelected
          }`}
        >
          {icon}
        </ListItemIcon>
      </div>
      <ListItemText
        className={`${styles.ListItemText} ${
          selected && styles.ListItemInsideSelected
        }`}
        primary={text}
      />
    </ListItem>
  )
}

export default ListItemLink
