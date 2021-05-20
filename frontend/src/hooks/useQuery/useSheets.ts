import { genericSearch, genericSort, useGenericQuery } from './useGenericQuery'
import * as api from '../../api/Sheet.api'
import { GradeSheet } from '../../models'

const queryKey = 'sheets'

const useSheets = () => useGenericQuery(queryKey, api.getSheets())
export default useSheets

export const searchSheet = genericSearch<GradeSheet>(queryKey)
export const sortSheets = genericSort<GradeSheet>(queryKey)
