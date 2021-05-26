import * as api from '../../api/ReferenceProject.api'
import useMutationWithConfirm from '../useMutationWithConfirm'
import {
  createRefProject,
  deleteRefProject,
  updateRefProject,
} from '../../api/ReferenceProject.api'
import { useQuery } from 'react-query'

const queryKey = 'project'

const useProject = (id: string) =>
  useQuery([queryKey, id], () => api.getRefProject(id))
export default useProject

export const useUpdateProject = () =>
  useMutationWithConfirm(updateRefProject, {
    invalidate: queryKey,
  })

export const useDeleteProject = () =>
  useMutationWithConfirm(deleteRefProject, {
    invalidate: queryKey,
  })

export const useCreateProject = () =>
  useMutationWithConfirm(createRefProject, {
    invalidate: queryKey,
  })
