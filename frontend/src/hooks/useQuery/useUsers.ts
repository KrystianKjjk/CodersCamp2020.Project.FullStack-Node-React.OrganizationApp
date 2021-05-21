import * as api from '../../api/User.api'
import queryClient from '../../QueryClient'
import { User, UserFilters, userStatusDict, userTypeDict } from '../../models'
import { genericSearch, genericSort } from './useGenericQuery'
import { useQuery } from 'react-query'

const useUsers = () => useQuery('users', api.getUsers)

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
