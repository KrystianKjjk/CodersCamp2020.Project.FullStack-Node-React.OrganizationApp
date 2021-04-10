import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ManageUsers from './ManageUsers';
import { sortData, filterData } from '../ReusableTable/ReusableTableSlice';
import UserService from '../../api/User.service';

export const usersDatabase = [
   {id: 1, name: 'Naame', surname: 'Suurname', type: 'Mentor', status: 'Active'},
   {id: 2, name: 'Naaame', surname: 'Suuuurname', type: 'Participant', status: 'Archived'},
   {id: 3, name: 'Naaaame', surname: 'Suuurname', type: 'Participant', status: 'Resigned'},
   {id: 4, name: 'Naaaaaame', surname: 'Suuuuurname', type: 'Admin', status: 'Active'},
   {id: 5, name: 'CName', surname: 'CSurname', type: 'Candidate', status: 'Active'},
]

jest.mock('../../api/User.service.ts', () => jest.fn());

describe('ManageUsers', () => {
   it('renders without error, search input works, sort list works and filters work', async () => {
      const getUsersMock = jest.fn( () => Promise.resolve(usersDatabase) );
      const UserServiceMock = {
         getUsers: getUsersMock,
      };
      // @ts-ignore
      UserService.mockImplementation(() => UserServiceMock);

      render(
         <Provider store={store}>
            <ManageUsers />
         </Provider>
      );
      expect(getUsersMock).toBeCalledTimes(1);
      await screen.findByLabelText('Table - Users');
      expect(store.getState().tables['Users'].rows).toHaveLength(usersDatabase.length);
      
      await screen.findByLabelText('Table - Users');
      store.dispatch(filterData({
         table: 'Users',
         filters: [ {column: 'surname', values: ['CSurname']} ]
      }));
      expect(store.getState().tables['Users'].displayedRows).toHaveLength(1);
      
      await screen.findByLabelText('Table - Users');
      store.dispatch(sortData({table: 'Users', column: 'name'}));
      expect(store.getState().tables['Users'].displayedRows[0].name).toBe('CName');
      
      await screen.findByLabelText('Table - Users');
      const adminCheckbox = screen.getByLabelText('Admin');
      const resignedCheckbox = screen.getByLabelText('Resigned');
      userEvent.click(adminCheckbox);
      expect(store.getState().tables['Users'].displayedRows).toHaveLength(1);
      userEvent.click(resignedCheckbox);
      expect(store.getState().tables['Users'].displayedRows).toHaveLength(0);
   });

});