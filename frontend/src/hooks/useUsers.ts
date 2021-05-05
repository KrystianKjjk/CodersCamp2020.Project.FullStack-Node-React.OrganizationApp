import BaseService from '../app/baseService'
import {
  userStatusDict,
  userTypeDict,
  User,
  UserData,
} from '../models/User.model'
import { calcAvgGrade } from '../api/gradesProcessing'
import { useQuery } from 'react-query'

const getUsers = async (): Promise<User[]> => {
  const api = new BaseService()
  const response = await api.get('/users')
  return response.data.map((user: UserData) => ({
    ...user,
    id: user._id,
    type: userTypeDict[user.type],
    status: userStatusDict[user.status],
    averageGrade: user.grades.length
      ? user.grades.map(calcAvgGrade).reduce((a, b) => a + b, 0) /
        user.grades.length
      : 0,
  }))
}
const useUsers = () => {
  const { isLoading, error, data, isFetching } = useQuery('users', () =>
    getUsers(),
  )
  return { isLoading, error, data, isFetching }
}

export default useUsers
