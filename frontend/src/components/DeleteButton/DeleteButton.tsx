import React from 'react';
import Button from '@material-ui/core/Button';
import { deleteBtnTheme } from '../../theme/customMaterialTheme';
import { ThemeProvider } from '@material-ui/styles';

export interface DeleteButtonProps {
  text: string;
}

const DeleteButton: React.FC< DeleteButtonProps > = ({ text }) => {
  return (
    <ThemeProvider theme={ deleteBtnTheme }>
      <Button variant="contained" color="primary">
        <span>{text}</span>
      </Button>
    </ThemeProvider>
  );
};

export default DeleteButton;