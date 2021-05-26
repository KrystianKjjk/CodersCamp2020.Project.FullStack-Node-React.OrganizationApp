import { genericSearch, genericSort } from './useGenericQuery'
import * as api from '../../api/Section.api'
import { ManageSection } from '../../models'
import { useQuery, UseQueryOptions } from 'react-query'

const queryKey = 'sections'

const useSections = (options?: Partial<UseQueryOptions<ManageSection[]>>) =>
  useQuery(queryKey, () => api.getSections(), options)
export default useSections

export const searchSection = genericSearch<ManageSection>(queryKey)
export const sortSections = genericSort<ManageSection>(queryKey)
