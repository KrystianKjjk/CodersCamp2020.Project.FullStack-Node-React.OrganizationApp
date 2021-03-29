import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ManageUsers from './ManageUsers';
import { sortData, filterData } from '../ReusableTable/ReusableTableSlice';

const usersDatabase = [
   {id: 1, name: 'Naame', surname: 'Suurname', type: 'Mentor', status: 'Active'},
   {id: 2, name: 'Naaame', surname: 'Suuuurname', type: 'Participant', status: 'Archived'},
   {id: 3, name: 'Naaaame', surname: 'Suuurname', type: 'Participant', status: 'Resigned'},
   {id: 4, name: 'Naaaaaame', surname: 'Suuuuurname', type: 'Admin', status: 'Active'},
   {id: 5, name: 'CName', surname: 'CSurname', type: 'Candidate', status: 'Active'},
 ]
const getFakeUsers = () => {
   return Promise.resolve(usersDatabase);
}

describe('ManageUsers', () => {
   it('renders without error', async () => {
      const getUsers = jest.fn( getFakeUsers );
      const onClickAdd = jest.fn();
      render(
         <Provider store={store}>
            <ManageUsers onClickAdd={onClickAdd} getUsers={getUsers}/>
         </Provider>
      );
      expect(getUsers).toBeCalledTimes(1);
      const addBtn = screen.getByLabelText('Add user');
      userEvent.click(addBtn);
      expect(onClickAdd).toBeCalledTimes(1);
      const tableComp = await screen.findByLabelText('Table - Users');
      const table = store.getState().tables['Users'];
      expect(table.rows).toHaveLength(usersDatabase.length);
   });

   it('search input works', async () => {
      const getUsers = jest.fn( getFakeUsers );
      const onClickAdd = jest.fn();
      render(
         <Provider store={store}>
            <ManageUsers onClickAdd={onClickAdd} getUsers={getUsers}/>
         </Provider>
      );

      const tableComp = await screen.findByLabelText('Table - Users');
      store.dispatch(filterData({
         table: 'Users',
         filters: [ {column: 'surname', values: ['CSurname']} ]
      }));
      const table = store.getState().tables['Users'];
      expect(table.displayedRows).toHaveLength(1);
   });

   it('sort list works', async () => {
      const getUsers = jest.fn( getFakeUsers );
      const onClickAdd = jest.fn();
      render(
         <Provider store={store}>
            <ManageUsers onClickAdd={onClickAdd} getUsers={getUsers}/>
         </Provider>
      );
      const tableComp = await screen.findByLabelText('Table - Users');
      store.dispatch(sortData({table: 'Users', column: 'name'}));
      const table = store.getState().tables['Users'];
      expect(table.displayedRows[0].name).toBe('CName');
   });

   it('filters work', async () => {
      const getUsers = jest.fn( getFakeUsers );
      const onClickAdd = jest.fn();
      render(
         <Provider store={store}>
            <ManageUsers onClickAdd={onClickAdd} getUsers={getUsers}/>
         </Provider>
      );

      const tableComp = await screen.findByLabelText('Table - Users');
      const table = store.getState().tables['Users'];
      const adminCheckbox = screen.getByLabelText('Admin');
      const resignedCheckbox = screen.getByLabelText('Resigned');
      userEvent.click(adminCheckbox);
      expect(store.getState().tables['Users'].displayedRows).toHaveLength(1);
      userEvent.click(resignedCheckbox);
      expect(store.getState().tables['Users'].displayedRows).toHaveLength(0);
   });

});