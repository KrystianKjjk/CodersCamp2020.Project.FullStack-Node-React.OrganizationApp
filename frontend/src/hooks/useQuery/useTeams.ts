import {
  genericSearch,
  genericSort,
  QueryKey,
} from './useGenericQuery'
import * as api from '../../api/Team.api'
import { Team } from '../../models'
import { useQuery, UseQueryOptions } from 'react-query'

const queryKey = 'teams'

const useTeams = (
  courseId?: string,
  options?: UseQueryOptions<Team[], unknown, Team[], QueryKey>,
) => useQuery(queryKey, () => api.getTeams(courseId), options)
export default useTeams

export const searchTeam = genericSearch<Team>(queryKey)
export const sortTeams = genericSort<Team>(queryKey)
