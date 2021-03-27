import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ManageUsers from './ManageUsers';

describe('ManageUsers', () => {
   it('renders without error', () => {
      const getUsers = jest.fn( () => Promise.resolve([]) );
      const onClickAdd = jest.fn();
      render(
         <Provider store={store}>
            <ManageUsers onClickAdd={onClickAdd} getUsers={getUsers}/>
         </Provider>
      );
   });
});