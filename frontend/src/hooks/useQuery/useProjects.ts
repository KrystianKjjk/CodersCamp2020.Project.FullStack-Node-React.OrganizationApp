import { useGenericQuery } from './useGenericQuery'
import * as api from '../../api/ReferenceProject.api'

const useProjects = () => useGenericQuery('projects', api.getRefProjects())
export default useProjects
