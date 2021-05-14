import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

export interface ListItemLinkProps {
  path: string
  icon: React.ReactNode
  text: string
}

const ListItemLink = ({ path, icon, text }: ListItemLinkProps) => {
  return (
    <ListItem button component={Link} to={path}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}

export default ListItemLink
