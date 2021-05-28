import { genericSearch, genericSort } from './useGenericQuery'
import * as api from '../../api/Sheet.api'
import { GradeSheet } from '../../models'
import { useQuery } from 'react-query'

const queryKey = 'sheets'

const useSheets = () => useQuery(queryKey, () => api.getSheets())
export default useSheets

export const searchSheet = genericSearch<GradeSheet>(queryKey)
export const sortSheets = genericSort<GradeSheet>(queryKey)
