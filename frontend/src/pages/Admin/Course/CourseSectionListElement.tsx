import { Box } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import DeleteButton from '../../../components/DeleteButton'
import { SectionListElement } from '../../../models'
import { deleteSection } from './CourseDetailsSlice'

interface CourseSectionElementProps {
  section: SectionListElement
  isEdit: boolean
}

const CourseSectionElement = ({
  section,
  isEdit,
}: CourseSectionElementProps) => {
  const dispatch = useDispatch()
  const handleDeleteButtonClick = () => {
    dispatch(deleteSection(section._id))
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="350px"
    >
      <Box>
        <p>{section.name}</p>
      </Box>
      {isEdit && (
        <DeleteButton
          confirmTitle="Are you sure you want to delete this section?"
          onConfirm={handleDeleteButtonClick}
        />
      )}
    </Box>
  )
}

export default CourseSectionElement
