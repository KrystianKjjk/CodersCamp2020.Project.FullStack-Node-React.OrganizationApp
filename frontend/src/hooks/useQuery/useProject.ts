import * as api from '../../api/ReferenceProject.api'
import useMutationWithConfirm from '../useMutationWithConfirm'
import {
  createRefProject,
  deleteRefProject,
  updateRefProject,
} from '../../api/ReferenceProject.api'
import { useQuery, UseQueryOptions } from 'react-query'
import queryClient from '../../QueryClient'

const queryKey = 'project'

export const useProject = (
  id: string,
  options?: Partial<UseQueryOptions<api.ProjectDto, unknown, api.ProjectDto>>,
) => useQuery([queryKey, id], () => api.getRefProject(id), options)
export default useProject

export const useUpdateProject = () =>
  useMutationWithConfirm(updateRefProject, {
    invalidate: queryKey,
    onSuccess: ({ data: { _id, sectionId, projectName } }) => {
      queryClient.setQueryData(queryKey + 's', (cachedData) => {
        if (!cachedData || !Array.isArray(cachedData)) return cachedData

        return cachedData.map((project) => {
          if (project.id !== _id) return project

          return {
            id: _id,
            sectionName: sectionId.name,
            sectionId: sectionId._id,
            projectName,
            startDate: new Date(sectionId.startDate).toLocaleDateString(),
            endDate: new Date(sectionId.endDate).toLocaleDateString(),
          }
        })
      })
    },
  })

export const useDeleteProject = () =>
  useMutationWithConfirm(deleteRefProject, {
    invalidate: queryKey + 's',
  })

export const useCreateProject = () =>
  useMutationWithConfirm(createRefProject, {
    invalidate: queryKey + 's',
  })
