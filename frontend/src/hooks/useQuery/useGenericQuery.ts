import queryClient from '../../QueryClient'

export type QueryKey = string[] | string

export const genericSearch = <T>(queryKey: QueryKey) => (
  column: keyof T,
  search: string,
) => {
  if (search === '')
    return queryClient.refetchQueries([queryKey], { active: true })

  queryClient.setQueryData(queryKey, (items) => {
    if (!items) return items

    return (items as T[]).filter((item) => `${item[column]}`.match(search))
  })
}

export const genericSort = <T>(queryKey: QueryKey) => (column: keyof T) => {
  queryClient.setQueryData(queryKey, (items) => {
    if (!items || !(items as T[]).length) return items

    const itemsArr = [...(items as T[])]
    if (typeof itemsArr[0][column] === 'number')
      // @ts-ignore
      return itemsArr.sort((a, b) => a[column] - b[column])

    return itemsArr.sort((a, b) => `${a[column]}`.localeCompare(`${b[column]}`))
  })
}
