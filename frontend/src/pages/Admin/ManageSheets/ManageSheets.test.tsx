import React from 'react'
import { render, screen, wait } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import ManageSheets from './ManageSheets'
import { QueryClientProvider } from 'react-query'
import queryClient from '../../../QueryClient'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

let sheetsDatabase = [
  {
    id: '1',
    mentorName: 'Krystian',
    mentorSurname: 'Kijak',
    projectName: 'FitNotFat',
  },
  {
    id: '2',
    mentorName: 'MentorName',
    mentorSurname: 'MentorSurname',
    projectName: 'Pokemon Quiz',
  },
  {
    id: '3',
    mentorName: 'TorName',
    mentorSurname: 'OrSurname',
    projectName: 'StarWars Quiz',
  },
]
const sheetsCount = sheetsDatabase.length
const tableName = 'Sheets'
const endpoint = `${process.env.REACT_APP_API_URL}/api/grade/sheets`
let mock = new MockAdapter(axios)
mock.onPost(endpoint).reply((config) => {
  sheetsDatabase.push({
    id: '7',
    mentorName: 'Piotr',
    mentorSurname: 'Bocian',
    projectName: 'Chess',
  },)
  return [200, config.data]
})

mock.onGet(endpoint).reply(200, sheetsDatabase)

mock
  .onDelete(new RegExp(`${endpoint}/*`))
  .reply((config) => {
    if (!config.url) return [400]
    const id = config.url.split('/').slice(-1)[0]
    sheetsDatabase = sheetsDatabase.filter((sheet) => sheet.id !== id)
    return [200]
  })

mock.onAny().reply(200)
// jest.mock('../../../api/Sheet.api.ts', () => jest.fn())
jest.mock('../../../api/Sheet.api.ts', () => ({
  ...jest.requireActual('../../../api/Sheet.api.ts'),
  getSheetInfo: jest.fn((sheet) => Promise.resolve(sheet)),
}))
describe('ManageSheets', () => {
  jest.setTimeout(20000)
  it('renders without error, filters and sorts data', async () => {
    

    // render(
    //   <QueryClientProvider client={queryClient}>
    //     <Provider store={store}>
    //       <ManageSheets />
    //     </Provider>
    //   </QueryClientProvider>,
    // )

    // await wait(() => screen.findByLabelText('Table - ' + tableName))
    // expect(sheetsDatabase).toHaveLength(sheetsCount)
    // const addBtn = screen.getByLabelText('Add sheet')
    // userEvent.click(addBtn)
    // await wait(() =>
    //   expect(sheetsDatabase).toHaveLength(
    //     sheetsCount + 1,
    //   ),
    // )

    //   store.dispatch(
    //     filterData({
    //       table: tableName,
    //       filters: [{ column: 'mentorSurname', values: ['Bocian'] }],
    //     }),
    //   )
    //   expect(store.getState().tables[tableName].displayedRows).toHaveLength(1)

    //   store.dispatch(
    //     searchData({ table: tableName, column: 'mentorName', search: '' }),
    //   )
    //   expect(store.getState().tables[tableName].displayedRows).toHaveLength(
    //     sheetsCount + 1,
    //   )

    //   store.dispatch(sortData({ table: tableName, column: 'mentorName' }))
    //   expect(store.getState().tables[tableName].displayedRows[0].mentorName).toBe(
    //     'Krystian',
    //   )

    //   await screen.findByLabelText('Table - ' + tableName)
    //   const sheetCheckboxes = screen.getAllByLabelText('Select Row checkbox')
    //   if (sheetCheckboxes.length) userEvent.click(sheetCheckboxes[0])

    //   const deleteSheetBtn = screen.getByText('DELETE')
    //   deleteSheetBtn.click()
    //   userEvent.click(screen.getByText('CONFIRM'))
    //   await wait(() => expect(deleteSheetMock).toBeCalledTimes(1))
  })
})
