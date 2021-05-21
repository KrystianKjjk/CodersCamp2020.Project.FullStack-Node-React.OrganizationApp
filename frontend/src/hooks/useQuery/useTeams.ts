import { genericSearch, genericSort, useGenericQuery } from './useGenericQuery'
import * as api from '../../api/Team.api'
import { Team } from '../../models'

const queryKey = 'teams'

const useTeams = (courseId?: string) => useGenericQuery(queryKey, api.getTeams(courseId))
export default useTeams

export const searchTeam = genericSearch<Team>(queryKey)
export const sortTeams = genericSort<Team>(queryKey)
