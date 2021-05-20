import { genericSearch, genericSort, useGenericQuery } from './useGenericQuery'
import * as api from '../../api/Team.api'
import { Team } from '../../models'

const queryKey = 'teams'

const useTeams = () => useGenericQuery(queryKey, api.getTeams())
export default useTeams

export const searchTeam = genericSearch<Team>(queryKey)
export const sortTeams = genericSort<Team>(queryKey)
