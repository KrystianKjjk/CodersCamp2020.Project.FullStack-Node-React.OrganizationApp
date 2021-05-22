import { genericSearch, genericSort, useGenericQuery } from './useGenericQuery'
import * as api from '../../api/Section.api'
import { ManageSection } from '../../models'

const queryKey = 'sections'

const useSections = () => useGenericQuery(queryKey, () => api.getSections())
export default useSections

export const searchSection = genericSearch<ManageSection>(queryKey)
export const sortSections = genericSort<ManageSection>(queryKey)
