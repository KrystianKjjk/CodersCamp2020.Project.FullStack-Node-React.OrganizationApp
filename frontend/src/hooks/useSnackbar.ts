// import { useDispatch } from 'react-redux'
import { showSnackbar } from '../components/Snackbar'
import { useAppDispatch } from './hooks'
import { Color } from '@material-ui/lab'

const useSnackbar = () => {
  const dispatch = useAppDispatch()
  const show = (severity: Color) => (message: string) =>
    dispatch(showSnackbar({ message, severity }))

  const showSuccess = show('success')
  const showError = show('error')

  const showInfo = show('info')

  const showWarning = show('warning')

  return { showSuccess, showError, showInfo, showWarning }
}
export default useSnackbar
