import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

export interface ConfirmationDialogProps {
  title?: string,
  content?: string,
  isOpen: boolean,
  onClose: any,
  handleAgree: any,
  handleDisagree: any
}

const ConfirmationDialog: React.FC< ConfirmationDialogProps > = props => {
  return (
      <Dialog
          open={props.isOpen}
          onClose={props.onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleDisagree} color="primary">
            Disagree
          </Button>
          <Button onClick={props.handleAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default ConfirmationDialog;
