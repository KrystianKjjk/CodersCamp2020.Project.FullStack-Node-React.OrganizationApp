import React from 'react';
import { render, screen, wait } from '@testing-library/react';
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
const teamsCount = teamsDatabase.length;

jest.mock('../../api/Team.service.ts', () => jest.fn());
      
describe('ManageTeams', () => {
   it('renders without error, filters and sorts data', async () => {
      const getTeamsMock = jest.fn( () => Promise.resolve(teamsDatabase) );
      const createTeamMock = jest.fn( async () => {
         teamsDatabase.push({id: 7, name: '---', surname: '---', courseName: 'Course from local storage'})
      } );
      const TeamServiceMock = {
         getTeams: getTeamsMock,
         createTeam: createTeamMock,
      };
      // @ts-ignore
      TeamService.mockImplementation(() => TeamServiceMock);
      
      render(
         <Provider store={store}>
            <ManageTeams />
         </Provider>
      );
      
      await screen.findByLabelText('Table - Teams');
      expect(getTeamsMock).toBeCalledTimes(1);
      expect(store.getState().tables['Teams'].rows).toHaveLength(teamsCount);
      const addBtn = screen.getByLabelText('Add team');
      userEvent.click(addBtn);
      expect(createTeamMock).toBeCalledTimes(1);
      expect(getTeamsMock).toBeCalledTimes(1);
      wait(() => expect(store.getState().tables['Teams'].rows).toHaveLength(teamsCount + 1));

      store.dispatch(filterData({
         table: 'Teams',
         filters: [ {column: 'surname', values: ['CSurname']} ]
      }));
      expect(store.getState().tables['Teams'].displayedRows).toHaveLength(1);

      store.dispatch(sortData({table: 'Teams', column: 'name'}));
      expect(store.getState().tables['Teams'].displayedRows[0].name).toBe('CName');
   });

});