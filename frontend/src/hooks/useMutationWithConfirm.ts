import { useMutation, useQueryClient } from 'react-query'
import useSnackbar from './useSnackbar'

interface Options {
  successMessage?: string
  onSuccess?: () => void
  errorMessage?: string
  onError?: () => void
  invalidate?: string | string[]
}
const useMutationWithConfirm = <T>(
  request: (data: T) => Promise<any>,
  { successMessage, errorMessage, invalidate, onSuccess, onError }: Options,
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
    },
  })
  return mutation
}

export default useMutationWithConfirm