import { Box } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import UButton from '../../../components/UButton'
import { deleteSection, SectionListElement } from './CourseDetailsSlice'
import ConfirmationDialog from '../../../components/ConfirmationDialog'

interface CourseSectionElementProps {
  section: SectionListElement
  isEdit: boolean
}

const CourseSectionElement = ({
  section,
  isEdit,
}: CourseSectionElementProps) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const handleDeleteButtonClick = () => {
    dispatch(deleteSection(section._id))
  }

  const handleOpenDeleteConfirmation = (event: any) => {
    setIsOpen(true)
    event.stopPropagation()
  }

  const handleCloseDeleteConfirmation = (event: any) => {
    setIsOpen(false)
    event.stopPropagation()
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="350px"
    >
      <ConfirmationDialog
        title="Are you sure you want to delete this section?"
        content="This action is irreversible."
        isOpen={isOpen}
        onClose={handleCloseDeleteConfirmation}
        handleConfirm={handleDeleteButtonClick}
        handleCancel={handleCloseDeleteConfirmation}
      />
      <Box>
        <p>{section.name}</p>
      </Box>
      {isEdit ? (
        <UButton
          text="DELETE"
          color="secondary"
          onClick={handleOpenDeleteConfirmation}
        ></UButton>
      ) : null}
    </Box>
  )
}

export default CourseSectionElement
