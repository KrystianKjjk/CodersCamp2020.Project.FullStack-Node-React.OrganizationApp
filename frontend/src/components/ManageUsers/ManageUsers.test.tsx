import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ManageUsers from './ManageUsers';

describe('ManageUsers', () => {
   it('renders without error', () => {
      render(
         <Provider store={store}>
            <ManageUsers name='ManageUsers'/>
         </Provider>
      );
   });
});