import * as api from '../../api/TeamProjects.api'
import { useQuery } from 'react-query'

const useTeamProjects = () => {
  return useQuery('teamProjects', () => api.getTeamProjects())
}
const useTeamProject = (id: string) => {
  return useQuery(['teamProjects', id], () => api.getTeamProject(id), {
    retryOnMount: false,
    // notifyOnChangeProps: ['data', 'error', 'isFetching', 'isLoading'],
  })
}

export { useTeamProjects, useTeamProject }
