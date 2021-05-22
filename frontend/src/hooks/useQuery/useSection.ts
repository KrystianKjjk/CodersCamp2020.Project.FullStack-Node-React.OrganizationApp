import { useGenericQuery } from './useGenericQuery'
import * as api from '../../api/Section.api'
import useMutationWithConfirm from '../useMutationWithConfirm'
import { NewSectionData } from '../../models'

const queryKey = 'section'

const useSection = (id: string) =>
  useGenericQuery([queryKey, id], () => api.getOneSection(id))
export default useSection

export const useProjectForSection = (id: string) =>
  useGenericQuery([queryKey, id], () => api.getProjectForSection(id))

export const usePatchSection = () =>
  useMutationWithConfirm(
    (vars: [string, NewSectionData]) => api.patchSection(...vars),
    {
      invalidate: queryKey,
    },
  )

export const useDeleteSection = () =>
  useMutationWithConfirm(api.deleteSection, {
    invalidate: queryKey+'s',
  })

export const useCreateSection = () =>
  useMutationWithConfirm(api.addSection, {
    invalidate: queryKey+'s',
  })
