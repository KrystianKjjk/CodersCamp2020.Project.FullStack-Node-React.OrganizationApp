import React from 'react'
import { Snackbar as MaterialSnackbar } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { hideSnackbar, selectSnackbarInfo } from './SnackbarSlice'
import { useDispatch, useSelector } from 'react-redux'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export interface SnackbarProps {}

const Snackbar: React.FC<SnackbarProps> = () => {
  const dispatch = useDispatch()
  const { isOpen, message, severity } = useSelector(selectSnackbarInfo)

  const close = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return

    dispatch(hideSnackbar())
  }
  return (
    <MaterialSnackbar open={isOpen} autoHideDuration={2800} onClose={close}>
      <Alert onClose={close} severity={severity}>
        {message}
      </Alert>
    </MaterialSnackbar>
  )
}

export default Snackbar
