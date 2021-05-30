import * as api from '../../api/Grade.api'
import { useQuery } from 'react-query'
import { IGrade } from '../../models/User.model'
import useMutationWithConfirm from '../useMutationWithConfirm'

const queryKey = 'grades'

const useGrades = (userID: string) =>
  useQuery(queryKey, () => api.getGrades(userID), {
    enabled: !!userID,
  })
export default useGrades

export const useUpdateGrade = () =>
  useMutationWithConfirm(
    ([gradeID, grade]: [string, IGrade]) => api.updateGrade(gradeID, grade),
    {
      invalidate: queryKey,
      successMessage: 'Update finished successfully',
      errorMessage: 'Action failed',
    },
  )

export const useDeleteGrade = () =>
  useMutationWithConfirm(api.deleteGrade, {
    invalidate: queryKey,
    successMessage: 'Action finished successfully',
    errorMessage: 'Action failed',
  })

export const useCreateGrade = (userID: string) =>
  useMutationWithConfirm((grade: IGrade) => api.createGrade(userID, grade), {
    invalidate: queryKey,
    successMessage: 'Grade added successfully',
    errorMessage: 'Action failed',
  })
