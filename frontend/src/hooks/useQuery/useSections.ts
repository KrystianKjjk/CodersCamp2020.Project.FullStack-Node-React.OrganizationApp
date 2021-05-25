import { genericSearch, genericSort } from './useGenericQuery'
import * as api from '../../api/Section.api'
import { ManageSection } from '../../models'
import { useQuery } from 'react-query'

const queryKey = 'sections'

const useSections = () => useQuery(queryKey, () => api.getSections())
export default useSections

export const searchSection = genericSearch<ManageSection>(queryKey)
export const sortSections = genericSort<ManageSection>(queryKey)
