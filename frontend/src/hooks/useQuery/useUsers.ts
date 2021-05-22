import * as api from '../../api/User.api'
import queryClient from '../../QueryClient'
import { User, UserFilters, userStatusDict, userTypeDict } from '../../models'
import {
  genericSearch,
  genericSort,
  QueryKey,
  useGenericQuery,
} from './useGenericQuery'
import { UseQueryOptions } from 'react-query'

const useUsers = () => useGenericQuery('users', api.getUsers())
export const useParticipantsNotInTeam = (
  options?: UseQueryOptions<User[], unknown, User[], QueryKey>,
) =>
  useGenericQuery(
    'participantsNotInTeam',
    api.getParticipantsNotInTeam(),
    options,
  )

export const useUsersOfType = (
  type: string,
  options?: UseQueryOptions<User[], unknown, User[], QueryKey>,
) => useGenericQuery(`${type}s`, api.getUsersOfType(type), options)

export default useUsers
export const searchUser = genericSearch<User>('users')
export const sortUsers = genericSort<User>('users')

export const filterUsers = async (filters: UserFilters) => {
  await queryClient.refetchQueries(['users'], { active: true })
  queryClient.setQueryData('users', (users) => {
    if (!users) return users

    return (users as User[]).filter(
      (user) =>
        (filters.type.length === 0 ||
          filters.type.some((type) => user.type === userTypeDict[type])) &&
        (filters.status.length === 0 ||
          filters.status.some(
            (status) => user.status === userStatusDict[status],
          )),
    )
  })
}
