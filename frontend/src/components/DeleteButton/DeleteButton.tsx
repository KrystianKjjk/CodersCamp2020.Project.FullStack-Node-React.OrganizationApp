import React from 'react'
import ConfirmButton from '../ConfirmButton'

type EventType = React.MouseEvent<HTMLButtonElement, MouseEvent>

export interface DeleteButtonProps {
  confirmTitle: string
  confirmContent?: string
  onConfirm: (event?: EventType) => void
  onClose?: (event?: EventType) => void
}
const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  return <ConfirmButton {...props} text={'DELETE'} />
}

export default DeleteButton
