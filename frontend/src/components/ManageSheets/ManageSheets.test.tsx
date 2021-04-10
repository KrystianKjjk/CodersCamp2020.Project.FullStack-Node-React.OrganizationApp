import React from 'react';
import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ManageSheets from './ManageSheets';
import { sortData, filterData, searchData } from '../ReusableTable/ReusableTableSlice';
import SheetService from '../../api/Sheet.service';

const sheetsDatabase = [
   {id: '1', mentorName: 'Krystian', mentorSurname: 'Kijak', projectName: 'FitNotFat'},
   {id: '2', mentorName: 'MentorName', mentorSurname: 'MentorSurname', projectName: 'Pokemon Quiz'},
   {id: '3', mentorName: 'TorName', mentorSurname: 'OrSurname', projectName: 'StarWars Quiz'},
];
const sheetsCount = sheetsDatabase.length;
const tableName = 'Sheets';

jest.mock('../../api/Sheet.service.ts', () => jest.fn());
      
describe('ManageSheets', () => {
   jest.setTimeout(20000);
   it('renders without error, filters and sorts data', async () => {
      const getSheetsMock = jest.fn( () => Promise.resolve(sheetsDatabase) );
      const createSheetMock = jest.fn( async () => {
         sheetsDatabase.push({id: '7', mentorName: 'Piotr', mentorSurname: 'Bocian', projectName: 'Chess'})
      } );
      const deleteSheetMock = jest.fn( async (id: string) => {
         sheetsDatabase.filter(sheet => sheet.id !== id)
      } );
      const SheetServiceMock = {
         getSheets: getSheetsMock,
         createSheet: createSheetMock,
         deleteSheet: deleteSheetMock,
      };
      // @ts-ignore
      SheetService.mockImplementation(() => SheetServiceMock);
      
      render(
         <Provider store={store}>
            <ManageSheets />
         </Provider>
      );
      
      await screen.findByLabelText('Table - ' + tableName);
      expect(getSheetsMock).toBeCalledTimes(1);
      expect(store.getState().tables[tableName].rows).toHaveLength(sheetsCount);
      const addBtn = screen.getByLabelText('Add sheet');
      userEvent.click(addBtn);
      expect(createSheetMock).toBeCalledTimes(1);
      await wait(() => expect(getSheetsMock).toBeCalledTimes(2));
      await wait(() => expect(store.getState().tables[tableName].rows).toHaveLength(sheetsCount + 1));

      store.dispatch(filterData({
         table: tableName,
         filters: [ {column: 'mentorSurname', values: ['Bocian']} ]
      }));
      expect(store.getState().tables[tableName].displayedRows).toHaveLength(1);

      store.dispatch(searchData({table: tableName, column: 'mentorName', search: ''}));
      expect(store.getState().tables[tableName].displayedRows).toHaveLength(sheetsCount + 1);

      store.dispatch(sortData({table: tableName, column: 'mentorName'}));
      expect(store.getState().tables[tableName].displayedRows[0].mentorName).toBe('Krystian');

      await screen.findByLabelText('Table - ' + tableName);
      const sheetCheckboxes = screen.getAllByLabelText('Select Row checkbox');
      if(sheetCheckboxes.length) userEvent.click(sheetCheckboxes[0]);
      
      const deleteSheetBtn = screen.getByText('Delete');
      deleteSheetBtn.click();
      await wait(() => expect(deleteSheetMock).toBeCalledTimes(1));
   });

});