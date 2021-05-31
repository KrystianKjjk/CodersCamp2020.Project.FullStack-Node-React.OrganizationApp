import * as api from '../../api/TeamProjects.api'
import { useQuery, UseQueryOptions } from 'react-query'
import useMutationWithConfirm from '../useMutationWithConfirm'

const TEAM_PROJECTS = 'teamProjects'
const useTeamProjects = (options?: Partial<UseQueryOptions<api.TeamProjectDto[]>>) => {
  return useQuery(TEAM_PROJECTS, () => api.getTeamProjects(), options)
}
const useTeamProject = (id: string) => {
  return useQuery([TEAM_PROJECTS, id], () => api.getTeamProject(id))
}
const useDeleteTeamProject = (onSuccess?: () => void, onError?: () => void) => {
  const mutation = useMutationWithConfirm(api.deleteTeamProject, {
    successMessage: 'Project for the team has been deleted.',
    errorMessage: 'Something went wrong when trying to delete team project.',
    invalidate: TEAM_PROJECTS,
    onError,
    onSuccess,
  })
  return mutation.mutate
}

const useCreateTeamProject = (onSuccess?: () => void, onError?: () => void) => {
  const mutation = useMutationWithConfirm(api.createTeamProject, {
    successMessage: 'New project for the team has been successfully added.',
    errorMessage:
      'Something went wrong when trying to add new project for the team.',
    invalidate: TEAM_PROJECTS,
    onError,
    onSuccess,
  })
  return mutation.mutate
}

const useUpdateTeamProject = (onSuccess?: () => void, onError?: () => void) => {
  const mutation = useMutationWithConfirm(api.updateTeamProject, {
    successMessage: 'Selected project has been successfully updated.',
    errorMessage: 'Something went wrong when trying to update project.',
    invalidate: TEAM_PROJECTS,
    onError,
    onSuccess,
  })
  return mutation.mutate
}
export {
  useTeamProjects,
  useTeamProject,
  useDeleteTeamProject,
  useCreateTeamProject,
  useUpdateTeamProject,
}
