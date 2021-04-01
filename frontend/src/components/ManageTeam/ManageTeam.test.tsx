import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ManageTeam from './ManageTeam';
import { sortData, filterData } from '../ReusableTable/ReusableTableSlice';

const teamsDatabase = [
   {id: 1, name: 'Naame', surname: 'Suurname', courseName: 'CodersCamp 1. edition'},
   {id: 2, name: 'Naaame', surname: 'Suuuurname', courseName: 'CodersCamp 1. edition'},
   {id: 3, name: 'Naaaame', surname: 'Suuurname', courseName: 'CodersCamp 1. edition'},
   {id: 4, name: 'Naaaaaame', surname: 'Suuuuurname', courseName: 'CodersCamp 1. edition'},
   {id: 5, name: 'CName', surname: 'CSurname', courseName: 'CodersCamp 1. edition'},
 ]
const getFakeTeams = () => {
   return Promise.resolve(teamsDatabase);
}

describe('ManageTeam', () => {
   it('renders without error', async () => {
      const getTeams = jest.fn( getFakeTeams );
      const onClickAdd = jest.fn();
      render(
         <Provider store={store}>
            <ManageTeam onClickAdd={onClickAdd} getTeamMembers={getFakeTeams}/>
         </Provider>
      );
      expect(getTeams).toBeCalledTimes(1);
      const addBtn = screen.getByLabelText('Add team');
      userEvent.click(addBtn);
      expect(onClickAdd).toBeCalledTimes(1);
      const tableComp = await screen.findByLabelText('Table - Teams');
      const table = store.getState().tables['Teams'];
      expect(table.rows).toHaveLength(teamsDatabase.length);
   });

   it('search input works', async () => {
      const getTeams = jest.fn( getFakeTeams );
      const onClickAdd = jest.fn();
      render(
         <Provider store={store}>
            <ManageTeam onClickAdd={onClickAdd} getTeamMembers={getFakeTeams}/>
         </Provider>
      );

      const tableComp = await screen.findByLabelText('Table - Teams');
      store.dispatch(filterData({
         table: 'Teams',
         filters: [ {column: 'surname', values: ['CSurname']} ]
      }));
      const table = store.getState().tables['Teams'];
      expect(table.displayedRows).toHaveLength(1);
   });

   it('sort list works', async () => {
      const getTeams = jest.fn( getFakeTeams );
      const onClickAdd = jest.fn();
      render(
         <Provider store={store}>
            <ManageTeam onClickAdd={onClickAdd} getTeamMembers={getFakeTeams}/>
         </Provider>
      );
      const tableComp = await screen.findByLabelText('Table - Teams');
      store.dispatch(sortData({table: 'Teams', column: 'name'}));
      const table = store.getState().tables['Teams'];
      expect(table.displayedRows[0].name).toBe('CName');
   });

});