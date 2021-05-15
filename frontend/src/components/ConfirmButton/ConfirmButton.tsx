import React, { useState } from 'react'
import ConfirmationDialog from '../ConfirmationDialog'
import UButton from '../UButton'

type EventType = React.MouseEvent<HTMLButtonElement, MouseEvent>

export interface ConfirmButtonProps {
  text: string
  confirmTitle: string
  confirmContent?: string
  onConfirm: (event?: EventType) => void
  onClose?: (event?: EventType) => void
}
const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  text,
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
        text={text}
        color="secondary"
        onClick={() => setIsConfirmOpen(true)}
      />
    </>
  )
}

export default ConfirmButton
