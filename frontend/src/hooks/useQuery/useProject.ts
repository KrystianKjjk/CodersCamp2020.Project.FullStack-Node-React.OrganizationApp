import * as api from '../../api/ReferenceProject.api'
import useMutationWithConfirm from '../useMutationWithConfirm'
import {
  createRefProject,
  deleteRefProject,
  updateRefProject,
} from '../../api/ReferenceProject.api'
import { useQuery, UseQueryOptions } from 'react-query'

const queryKey = 'project'

const useProject = (
  id: string,
  options?: Partial<UseQueryOptions<api.Project, unknown, [string, api.Project]>>,
) => useQuery([queryKey, id], () => api.getRefProject(id), options)
export default useProject

export const useUpdateProject = () =>
  useMutationWithConfirm(updateRefProject, {
    invalidate: queryKey,
  })

export const useDeleteProject = () =>
  useMutationWithConfirm(deleteRefProject, {
    invalidate: queryKey + 's',
  })

export const useCreateProject = () =>
  useMutationWithConfirm(createRefProject, {
    invalidate: queryKey + 's',
  })
