import { UserService } from '../api'
import { useQuery } from 'react-query'
import queryClient from '../QueryClient'
import { User, UserFilters } from '../models'

const useUsers = () => {
  const api = new UserService()
  const { isLoading, error, data, isFetching } = useQuery('users', () =>
    api.getUsers(),
  )
  return { isLoading, error, data, isFetching }
}

export default useUsers

// TODO: this function may be transformed into generic function
export const searchUser = (column: keyof User, search: string) => {
  if (search === '')
    return queryClient.refetchQueries(['users'], { active: true })

  queryClient.setQueryData('users', (users) => {
    if (!users) return users

    return (users as User[]).filter((user) => `${user[column]}`.match(search))
  })
}

// TODO: this function may be transformed into generic function
export const sortUsers = (column: keyof User) => {
  queryClient.setQueryData('users', (users) => {
    if (!users || !(users as User[]).length) return users

    const usersArr = [...(users as User[])]

    if (typeof usersArr[0][column] === 'number')
      // @ts-ignore
      return usersArr.sort((a, b) => a[column] - b[column])

    return usersArr.sort((a, b) => `${a[column]}`.localeCompare(`${b[column]}`))
  })
}

export const filterUsers = async (filters: UserFilters) => {
  const api = new UserService()
  const data = await queryClient.fetchQuery(['users', filters], () => {
    return api.filterUsers(filters)
  })
  queryClient.setQueryData('users', () => data)
}
