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
    onSuccess: ({ data }) => {
      queryClient.setQueryData(queryKey + 's', (cachedData) => {
        if (cachedData && Array.isArray(cachedData)) {
          return cachedData.map((project) => {
            if (project.id === data._id) {
              return {
                ...data,
                id: project.id,
                sectionName: data.sectionId.name,
                sectionId: data.sectionId._id,
                startDate: new Date(
                  data.sectionId.startDate,
                ).toLocaleDateString(),
                endDate: new Date(data.sectionId.endDate).toLocaleDateString(),
              }
            }
            return project
          })
        }
        return cachedData
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
