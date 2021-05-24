import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon } from '@material-ui/core'

import styles from './ListItemLink.module.css'
import { useSelector } from 'react-redux'
import { selectMenu } from '../Menu/MenuSlice'

export interface ListItemLinkProps {
  path: string
  icon: React.ReactNode
  text: string
  selected: boolean
}

const ListItemLink = ({
  path,
  icon,
  text,
  selected,
}: ListItemLinkProps) => {
  const { showSmallMenu } = useSelector(selectMenu)

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
      <p
        className={`${ showSmallMenu ? styles.ListItemTextSmall : styles.ListItemText} ${
          selected && styles.ListItemInsideSelected
        }`}
      >
        {text}{' '}
      </p>
    </ListItem>
  )
}

export default ListItemLink
