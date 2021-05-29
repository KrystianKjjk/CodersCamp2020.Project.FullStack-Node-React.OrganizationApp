import { MutationFunction, useMutation, useQueryClient } from 'react-query'
import useSnackbar from './useSnackbar'

export interface Options<T, R> {
  successMessage?: string
  onSuccess?: () => void
  errorMessage?: string
  onError?: () => void
  onSettled?: () => void
  invalidate: string | string[]
  newData?: (reqParam: R, previousData: T) => T
}
const useMutationWithConfirm = <T, R, D>(
  request: MutationFunction<T, R>,
  {
    successMessage = 'Success!',
    errorMessage = 'Something wents wrong :(',
    invalidate,
    onSuccess,
    onError,
    onSettled,
    newData,
  }: Options<D, R>,
) => {
  const { showError, showSuccess } = useSnackbar()
  const queryClient = useQueryClient()
  const mutation = useMutation(request, {
    // When mutate is called:
    onMutate: async (reqParam: R) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(invalidate)

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<D>(invalidate)
      // Optimistically update to the new value
      if (previousData && newData) {
        const nextData = newData(reqParam, previousData)
        queryClient.setQueryData<D>(invalidate, nextData)
      }

      return { previousData }
    },
    onSuccess: () => {
      invalidate && queryClient.invalidateQueries(invalidate)
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
