import * as api from '../../api/TeamProjects.api'
import { useQuery } from 'react-query'

const useTeamProjects = () => {
  return useQuery('teamProjects', () => api.getTeamProjects(), {
    retryOnMount: false,
    // notifyOnChangeProps: ['data', 'error', 'isFetching', 'isLoading'],
  })
}

export { useTeamProjects }
