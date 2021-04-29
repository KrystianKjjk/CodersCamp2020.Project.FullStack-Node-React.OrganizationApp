import React, { useState } from 'react'
import ConfirmationDialog from '../ConfirmationDialog'
import UButton from '../UButton'

type EventType = React.MouseEvent<HTMLButtonElement, MouseEvent>

export interface DeleteButtonProps {
  confirmTitle: string
  confirmContent?: string
  onConfirm: (event?: EventType) => void
  onClose?: (event?: EventType) => void
}
const DeleteButton: React.FC<DeleteButtonProps> = ({
  confirmTitle,
  confirmContent = 'This action is irreversible.',
  onConfirm,
  onClose,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const handleCancelConfirm = (e?: EventType) => {
    setIsConfirmOpen(false)
    onClose && onClose(e)
  }
  const handleConfirm = (e?: EventType) => {
    onConfirm(e)
    setIsConfirmOpen(false)
  }
  return (
    <>
      <ConfirmationDialog
        title={confirmTitle}
        content={confirmContent}
        isOpen={isConfirmOpen}
        onClose={handleCancelConfirm}
        handleConfirm={handleConfirm}
        handleCancel={handleCancelConfirm}
      />
      <UButton
        text="DELETE"
        color="secondary"
        onClick={() => setIsConfirmOpen(true)}
      />
    </>
  )
}

export default DeleteButton
