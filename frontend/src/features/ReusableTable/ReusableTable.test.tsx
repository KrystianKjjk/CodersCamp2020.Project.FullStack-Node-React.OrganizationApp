import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ReusableTable from './ReusableTable';

describe('ReusableTable', () => {
   it('renders without error', () => {
      render(
         <Provider store={store}>
            <ReusableTable />
         </Provider>
      );
   });
});