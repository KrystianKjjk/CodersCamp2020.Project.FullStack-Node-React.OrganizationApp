import * as api from '../../api/ReferenceProject.api'
import { useQuery } from 'react-query'

const useProjects = () => useQuery('projects', api.getRefProjects)
export default useProjects
