import React, { useState } from 'react'
import ConfirmationDialog from '../ConfirmationDialog'
import UButton from '../UButton'

type EventType = React.MouseEvent<HTMLButtonElement, MouseEvent>

export interface DeleteButtonProps {
  confirmTitle: string
  confirmContent: string
  onConfirm: (event?: EventType) => void
  onClose?: (event?: EventType) => void
}
const DeleteButton: React.FC<DeleteButtonProps> = ({
  confirmTitle,
  confirmContent,
  onConfirm,
  onClose,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const handleCancelConfirm = () => {
    setIsConfirmOpen(false)
    onClose && onClose()
  }
  return (
    <>
      <ConfirmationDialog
        title={confirmTitle}
        content={confirmContent}
        isOpen={isConfirmOpen}
        onClose={handleCancelConfirm}
        handleConfirm={onConfirm}
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
