import { UserService } from '../api'
import { useQuery } from 'react-query'

const useUsers = () => {
  const api = new UserService()
  const { isLoading, error, data, isFetching } = useQuery('users', () =>
    api.getUsers(),
  )
  return { isLoading, error, data, isFetching }
}

export default useUsers
