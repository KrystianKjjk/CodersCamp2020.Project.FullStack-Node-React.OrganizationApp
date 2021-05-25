import * as api from '../../api/User.api'
import useMutationWithConfirm, { Options } from '../useMutationWithConfirm'
import { IUser, User } from '../../models'
import { useQuery } from 'react-query'

const queryKey = 'user'

const useUser = (id: string) => useQuery([queryKey, id], () => api.getUser(id))
export default useUser

export const useUpdateUser = (
  options?: Partial<Options<User, [string, IUser]>>,
) =>
  useMutationWithConfirm(([id, user]: [string, IUser]) => api.updateUser(id, user), {
    invalidate: queryKey,
    ...options,
  })

export const useDeleteUser = (options?: Partial<Options<User[], string>>) =>
  useMutationWithConfirm(api.deleteUser, {
    invalidate: queryKey + 's',
    ...options,
  })
