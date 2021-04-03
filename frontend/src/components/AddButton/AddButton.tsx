import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { addBtnTheme } from '../../theme/customMaterialTheme';
import { ThemeProvider } from '@material-ui/styles';

export interface AddButtonProps {
  text: string;
}

const AddButton: React.FC< AddButtonProps > = ({ text }) => {
  return (
    <ThemeProvider theme={addBtnTheme}>
      <Button variant="contained" color="primary">
        <AddIcon /> <span>{text}</span>
      </Button>
    </ThemeProvider>
  );
};

export default AddButton;