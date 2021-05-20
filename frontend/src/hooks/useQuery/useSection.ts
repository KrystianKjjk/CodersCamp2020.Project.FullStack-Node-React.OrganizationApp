import { useGenericQuery } from './useGenericQuery'
import * as api from '../../api/Section.api'
import useMutationWithConfirm from '../useMutationWithConfirm'
import { NewSectionData } from '../../models'

const queryKey = 'team'

const useTeam = (id: string) => useGenericQuery([queryKey, id], api.getSection(id))
export default useTeam

export const usePatchSection = () =>
  useMutationWithConfirm((vars: [string, NewSectionData]) => api.patchSection(...vars), {
    invalidate: queryKey,
  })

export const useDeleteSection = () =>
  useMutationWithConfirm(api.deleteSection, {
    invalidate: queryKey,
  })

export const useCreateSection = () =>
  useMutationWithConfirm(api.addSection, {
    invalidate: queryKey,
  })
