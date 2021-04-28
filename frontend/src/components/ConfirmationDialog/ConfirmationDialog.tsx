import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

type EventType = React.MouseEvent<HTMLButtonElement, MouseEvent>
export interface ConfirmationDialogProps {
  title?: string
  content?: string
  isOpen: boolean
  onClose: (event?: EventType) => void
  handleCancel: (event?: EventType) => void
  handleConfirm: (event?: EventType) => void
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (props) => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={() => props.onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Transition}
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCancel} color="primary">
          CANCEL
        </Button>
        <Button onClick={props.handleConfirm} color="primary" autoFocus>
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
