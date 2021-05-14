import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import Button, { ButtonProps } from '@material-ui/core/Button'
import { addBtnTheme } from '../../theme/customMaterialTheme'
import { ThemeProvider } from '@material-ui/styles'

export type AddButtonProps = {
  text: string
} & ButtonProps

const AddButton: React.FC<AddButtonProps> = ({ text, ...restOfProps }) => {
  return (
    <ThemeProvider theme={addBtnTheme}>
      <Button variant="contained" color="primary" {...restOfProps}>
        <AddIcon /> <span>{text}</span>
      </Button>
    </ThemeProvider>
  )
}

export default AddButton
