import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ManageTeams from './ManageTeams';
import { sortData, filterData } from '../ReusableTable/ReusableTableSlice';
import TeamService from '../../api/Team.service';

const teamsDatabase = [
   {id: 1, name: 'Naame', surname: 'Suurname', courseName: 'CodersCamp 1. edition'},
   {id: 2, name: 'Naaame', surname: 'Suuuurname', courseName: 'CodersCamp 1. edition'},
   {id: 3, name: 'Naaaame', surname: 'Suuurname', courseName: 'CodersCamp 1. edition'},
   {id: 4, name: 'Naaaaaame', surname: 'Suuuuurname', courseName: 'CodersCamp 1. edition'},
   {id: 5, name: 'CName', surname: 'CSurname', courseName: 'CodersCamp 1. edition'},
];

jest.mock('../../api/Team.service.ts', () => jest.fn());
      
describe('ManageTeams', () => {
   it('renders without error, filters and sorts data', async () => {
      const getTeamsMock = jest.fn( () => Promise.resolve(teamsDatabase) );
      const TeamServiceMock = {
         getTeams: getTeamsMock,
      };
      // @ts-ignore
      TeamService.mockImplementation(() => TeamServiceMock);
      const onClickAdd = jest.fn();
      render(
         <Provider store={store}>
            <ManageTeams onClickAdd={onClickAdd} />
         </Provider>
      );
      expect(getTeamsMock).toBeCalledTimes(1);
      const addBtn = screen.getByLabelText('Add team');
      userEvent.click(addBtn);
      expect(onClickAdd).toBeCalledTimes(1);
      const tableComp = await screen.findByLabelText('Table - Teams');
      const table = store.getState().tables['Teams'];
      expect(table.rows).toHaveLength(teamsDatabase.length);

      store.dispatch(filterData({
         table: 'Teams',
         filters: [ {column: 'surname', values: ['CSurname']} ]
      }));
      expect(store.getState().tables['Teams'].displayedRows).toHaveLength(1);

      store.dispatch(sortData({table: 'Teams', column: 'name'}));
      expect(store.getState().tables['Teams'].displayedRows[0].name).toBe('CName');
   });

});