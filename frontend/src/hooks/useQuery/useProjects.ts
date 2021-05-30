import * as api from '../../api/ReferenceProject.api'
import { useQuery, UseQueryOptions } from 'react-query'

const useProjects = (options?: Partial<UseQueryOptions<api.ProjectDto[]>>) =>
  useQuery('projects', api.getRefProjects, options)
export default useProjects
