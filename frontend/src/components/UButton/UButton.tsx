import React from 'react';
import {ThemeProvider} from "@material-ui/styles";
import { UButtonTheme } from "../../theme/customMaterialTheme";
import Button from "@material-ui/core/Button";


export interface UButtonProps {
  text: string;
  color: 'primary' | 'secondary';
  onClick: any
}

const UButton: React.FC< UButtonProps > = props => {
  return (
      <ThemeProvider theme={UButtonTheme}>
          <div style={{margin: ".5rem"}}>
              <Button variant="contained" color={props.color} onClick={props.onClick}>
                  <span>{props.text}</span>
              </Button>
          </div>
      </ThemeProvider>
  );
};

export default UButton;
