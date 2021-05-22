import { useGenericQuery } from './useGenericQuery'
import * as api from '../../api/Team.api'
import useMutationWithConfirm from '../useMutationWithConfirm'

const queryKey = 'team'

const useTeam = (id: string) => useGenericQuery([queryKey, id], api.getTeam(id))
export default useTeam

export const useSetMentor = () =>
  useMutationWithConfirm((vars: [string, string]) => api.setMentor(...vars), {
    invalidate: queryKey,
  })

export const useAddUserToTeam = () =>
  useMutationWithConfirm((vars: [string, string]) => api.addUserToTeam(...vars), {
    invalidate: queryKey,
  })

export const useDeleteUserFromTeam = () =>
  useMutationWithConfirm((vars: [string, string]) => api.deleteUserFromTeam(...vars), {
    invalidate: queryKey,
  })

export const useDeleteTeam = () =>
  useMutationWithConfirm(api.deleteTeam, {
    invalidate: queryKey + 's',
  })

export const useCreateTeam = () =>
  useMutationWithConfirm(api.createTeam, {
    invalidate: queryKey + 's',
  })
