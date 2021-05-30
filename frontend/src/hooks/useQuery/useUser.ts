import * as api from '../../api/User.api'
import useMutationWithConfirm, { Options } from '../useMutationWithConfirm'
import { IUser, User } from '../../models'
import { useQuery, UseQueryOptions } from 'react-query'

const queryKey = 'user'

const useUser = (id: string) => useQuery([queryKey, id], () => api.getUser(id))
export default useUser

export const useUserMe = (options?: Partial<UseQueryOptions<any>>) =>
  useQuery([queryKey, 'me'], () => api.fetchUserMe(), options)

export const useUserProfile = (options?: Partial<UseQueryOptions<IUser>>) =>
  useQuery([queryKey, 'myProfile'], () => api.fetchUserProfile(), options)

export const useUpdateUser = (
  options?: Partial<Options<User, [string, IUser]>>,
) =>
  useMutationWithConfirm(
    ([id, user]: [string, IUser]) => api.updateUser(id, user),
    {
      invalidate: queryKey,
      ...options,
    },
  )

export const useDeleteUser = (options?: Partial<Options<User[], string>>) =>
  useMutationWithConfirm(api.deleteUser, {
    invalidate: queryKey + 's',
    ...options,
  })

export const useParticipantsNotInTeam = (
  options?: Partial<UseQueryOptions<User[]>>,
) => useQuery('participantsNotInTeam', api.getParticipantsNotInTeam, options)

export const useUsersOfType = (
  type: string,
  options?: Partial<UseQueryOptions<User[]>>,
) => useQuery(type + 's', () => api.getUsersOfType(type), options)
