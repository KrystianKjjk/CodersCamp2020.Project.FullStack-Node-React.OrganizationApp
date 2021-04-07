import React from 'react';
import { getByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import DeleteButton from './DeleteButton';

describe('DeleteButton', () => {
   it('renders without error', () => {
      render(
         <Provider store={store}>
            <DeleteButton text='Delete'/>
         </Provider>
      );
   });
});