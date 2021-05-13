import React from 'react'

import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import useStyles from './StyledTextField.style'

export interface StyledTextFieldOwnProps {
  variant?: 'filled' | 'outlined' | 'standard'
}

export type StyledTextFieldProps = TextFieldProps & StyledTextFieldOwnProps

const StyledTextField: React.FC<StyledTextFieldProps> = (props) => {
  const classes = useStyles()

  return (
    <TextField
      variant={'outlined' as any}
      required
      fullWidth
      InputLabelProps={{
        classes: {
          root: classes.cssLabel,
          focused: classes.cssLabel,
        },
      }}
      InputProps={{
        classes: {
          root: classes.outlinedInput,
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutline,
        },
      }}
      {...props}
    />
  )
}

export default StyledTextField
