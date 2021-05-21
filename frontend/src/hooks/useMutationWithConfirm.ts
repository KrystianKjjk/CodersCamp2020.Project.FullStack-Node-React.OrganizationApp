import { MutationFunction, useMutation, useQueryClient } from 'react-query'
import useSnackbar from './useSnackbar'

interface Options {
  successMessage?: string
  onSuccess?: () => void
  errorMessage?: string
  onError?: () => void
  onSettled?: () => void
  invalidate?: string | string[]
}
const useMutationWithConfirm = <T, R>(
  request: MutationFunction<T, R>,
  {
    successMessage = 'Success!',
    errorMessage = 'Something wents wrong :(',
    invalidate,
    onSuccess,
    onError,
    onSettled,
  }: Options,
) => {
  const { showError, showSuccess } = useSnackbar()
  const queryClient = useQueryClient()
  const mutation = useMutation(request, {
    onSuccess: () => {
      successMessage && showSuccess(successMessage)
      onSuccess && onSuccess()
    },
    onError: () => {
      errorMessage && showError(errorMessage)
      onError && onError()
    },
    // Always refetch after error or success:
    onSettled: () => {
      invalidate && queryClient.invalidateQueries(invalidate)
      onSettled && onSettled()
    },
  })
  return mutation
}

export default useMutationWithConfirm
