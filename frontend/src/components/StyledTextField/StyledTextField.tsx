import React from 'react';

import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField';
import useStyles from './StyledTextField.style'

export interface StyledTextFieldProps extends Partial<BaseTextFieldProps> {
  variant?: "filled" | "outlined" | "standard", 
}

const StyledTextField: React.FC< StyledTextFieldProps > = props => {
  const classes = useStyles();

  return (
    <TextField
      variant={'outlined' as any}
      required
      fullWidth
      InputLabelProps={{
        classes: {
          root: classes.cssLabel,
          focused: classes.cssLabel
        },
      }}
      InputProps={{
        classes: {
          root: classes.outlinedInput,
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutline
        },
      }}
      {...props}
    />
  );
};

export default StyledTextField;