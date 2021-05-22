import { QueryKey, useGenericQuery } from './useGenericQuery'
import * as api from '../../api/ReferenceProject.api'
import useMutationWithConfirm from '../useMutationWithConfirm'
import {
  createRefProject,
  deleteRefProject,
  updateRefProject,
} from '../../api/ReferenceProject.api'
import { UseQueryOptions } from 'react-query'

const queryKey = 'project'

const useProject = (id: string, options?: UseQueryOptions<any, unknown, any, QueryKey>,) =>
  useGenericQuery([queryKey, id], () => api.getRefProjectByID(id), options)
export default useProject

export const useUpdateProject = () =>
  useMutationWithConfirm(updateRefProject, {
    invalidate: queryKey,
  })

export const useDeleteProject = () =>
  useMutationWithConfirm(deleteRefProject, {
    invalidate: queryKey+'s',
  })

export const useCreateProject = () =>
  useMutationWithConfirm(createRefProject, {
    invalidate: queryKey+'s',
  })
